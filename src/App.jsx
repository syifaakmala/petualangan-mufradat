import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Clock3, Home,
  Lightbulb, Play, RotateCcw, Sparkles, Star, Trophy, Volume2, XCircle
} from 'lucide-react';
import { games, getGameWords, getLearnWords, levelInfo, sample, shuffle, stripArabic, topics } from './data.js';

function speak(text, lang = 'ar-SA', rate = 0.78) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1.02;
  window.speechSynthesis.speak(utterance);
  return true;
}

function sayFeedback(text) {
  speak(text, 'id-ID', 0.96);
}

function sayFeedbackThenArabic(feedback, arabic) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const first = new SpeechSynthesisUtterance(feedback);
  first.lang = 'id-ID';
  first.rate = 0.96;
  first.onend = () => {
    const second = new SpeechSynthesisUtterance(arabic);
    second.lang = 'ar-SA';
    second.rate = 0.78;
    second.pitch = 1.02;
    window.speechSynthesis.speak(second);
  };
  window.speechSynthesis.speak(first);
}

function AudioButton({ text, label = 'Dengarkan', compact = false }) {
  return (
    <button className={`audio-button ${compact ? 'audio-button-small' : ''}`} onClick={() => speak(text)} type="button" aria-label={label} title={label}>
      <Volume2 size={compact ? 16 : 18} />
      {!compact && <span>{label}</span>}
    </button>
  );
}

function Mascots({ className = '' }) {
  return <img className={`mascots ${className}`} src="/mascots/duo.svg" alt="Dua maskot anak Muslim yang tersenyum" />;
}

function BackButton({ onClick, children = 'Kembali' }) {
  return <button className="back-button" type="button" onClick={onClick}><ArrowLeft size={17} />{children}</button>;
}

function Header({ title, subtitle, onBack, right }) {
  return (
    <header className="page-header">
      <div className="header-left">
        {onBack && <BackButton onClick={onBack} />}
        <div>
          <p className="eyebrow">PETUALANGAN MUFRADAT</p>
          <h1>{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      {right}
    </header>
  );
}

function ProgressBar({ value, total }) {
  const percent = total ? Math.min(100, (value / total) * 100) : 0;
  return <div className="progress-wrap"><div className="progress-track"><div className="progress-fill" style={{ width: `${percent}%` }} /></div><span>{value}/{total}</span></div>;
}

function makeCatchObjects(target, words) {
  const distractors = sample(words.filter((w) => w.id !== target.id), Math.min(11, Math.max(5, words.length - 1)));
  const pool = [
    { id: `${target.id}-target-1`, item: target, isTarget: true },
    { id: `${target.id}-target-2`, item: target, isTarget: true },
    { id: `${target.id}-target-3`, item: target, isTarget: true },
    ...distractors.map((w, i) => ({ id: `${target.id}-d-${i}-${w.id}`, item: w, isTarget: false })),
  ];
  return shuffle(pool).map((obj, i) => ({
    ...obj,
    left: 4 + Math.random() * 84,
    top: 8 + Math.random() * 74,
    duration: 3.8 + Math.random() * 3.8,
    delay: Math.random() * -5,
    drift: `${Math.round(Math.random() * 38 - 19)}px`,
    z: i,
  }));
}

const ARABIC_FILL = Array.from('ابتثجحخدذرزسشصضطظعغفقكلمنهويءأإ');

function createWordPuzzle(word, level) {
  const letters = Array.from(stripArabic(word.arabic));
  const size = Math.min(24, Math.max(12, letters.length + 3));
  const directions = level === 'easy' ? [[-1, 0]] : level === 'medium' ? [[-1, 0], [0, 1]] : [[-1, 0], [0, 1], [-1, 1]];
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  let path = null;
  for (let attempt = 0; attempt < 800 && !path; attempt++) {
    const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
    const startX = dx === -1 ? letters.length - 1 + Math.floor(Math.random() * (size - letters.length + 1)) : Math.floor(Math.random() * size);
    const startY = dy === 1 ? Math.floor(Math.random() * (size - letters.length + 1)) : Math.floor(Math.random() * size);
    const cells = letters.map((_, i) => ({ r: startY + dy * i, c: startX + dx * i }));
    if (cells.some((p) => p.r < 0 || p.r >= size || p.c < 0 || p.c >= size)) continue;
    path = cells;
  }
  if (!path) path = letters.map((_, i) => ({ r: 0, c: size - 1 - i }));
  path.forEach((p, i) => { grid[p.r][p.c] = letters[i]; });
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = ARABIC_FILL[Math.floor(Math.random() * ARABIC_FILL.length)];
    }
  }
  return { grid, path, size, answer: letters.join('') };
}

function lineCells(start, end) {
  const dr = end.r - start.r;
  const dc = end.c - start.c;
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  if (steps === 0) return [start];
  const sr = Math.sign(dr);
  const sc = Math.sign(dc);
  return Array.from({ length: steps + 1 }, (_, i) => ({ r: start.r + sr * i, c: start.c + sc * i }));
}

function HomePage({ onStart }) {
  return (
    <main className="home-page">
      <div className="home-sky-decor decor-one" /><div className="home-sky-decor decor-two" />
      <div className="home-topline"><span className="brand-pill"><Sparkles size={15} /> MEDIA BELAJAR BAHASA ARAB</span><span className="arabic-brand" dir="rtl">مُغَامَرَةُ الْمُفْرَدَاتِ</span></div>
      <section className="hero-card">
        <div className="hero-copy">
          <div className="hero-tag"><span>✨</span> Belajar jadi petualangan!</div>
          <h1>Petualangan <span>Mufradat</span></h1>
          <p className="hero-arabic" dir="rtl">مُغَامَرَةُ الْمُفْرَدَاتِ</p>
          <p className="hero-description">Ayo bermain dan belajar bahasa Arab! Temukan kosakata baru lewat empat permainan seru bersama teman-teman kecilmu.</p>
          <button className="primary-button hero-button" onClick={onStart}><Play size={21} fill="currentColor" /> Mulai Belajar <ChevronRight size={20} /></button>
          <div className="hero-mini-points"><span>⭐ 9 tema seru</span><span>🎮 4 permainan</span><span>💙 3 level pilihan</span></div>
        </div>
        <div className="hero-art"><div className="hero-art-cloud cloud-a"/><div className="hero-art-cloud cloud-b"/><div className="hero-star star-a">✦</div><div className="hero-star star-b">✧</div><Mascots /></div>
      </section>
      <section className="home-bottom"><div><span className="bottom-icon">📚</span><div><strong>Belajar kosakata</strong><small>Lihat gambar, baca, dan dengarkan.</small></div></div><div><span className="bottom-icon">🎯</span><div><strong>Main sambil belajar</strong><small>Empat game untuk mengasah ingatan.</small></div></div><div><span className="bottom-icon">🏆</span><div><strong>Kumpulkan bintang</strong><small>Rayakan setiap kemajuanmu.</small></div></div></section>
      <p className="home-footer">Dibuat untuk belajar dengan gembira <span>💙</span></p>
    </main>
  );
}

function LevelPage({ onBack, onChoose }) {
  const levels = [
    { id: 'easy', name: 'Mudah', stars: '⭐', color: 'level-easy', icon: '🌱', detail: 'Ayo mulai mengenal mufradat!' },
    { id: 'medium', name: 'Sedang', stars: '⭐⭐', color: 'level-medium', icon: '🚀', detail: 'Saatnya tambah kosakata baru.' },
    { id: 'hard', name: 'Sulit', stars: '⭐⭐⭐', color: 'level-hard', icon: '🏆', detail: 'Tantangan seru menantimu!' },
  ];
  return <div className="app-page"><Header title="Pilih Levelmu!" subtitle="Semua level terbuka. Pilih yang kamu suka!" onBack={onBack} /><div className="mascot-greeting"><Mascots /><div className="speech-bubble">Yuk, pilih petualanganmu hari ini! <span>💙</span></div></div><div className="level-grid">{levels.map((l) => <button className={`level-card ${l.color}`} key={l.id} onClick={() => onChoose(l.id)}><span className="level-emoji">{l.icon}</span><span className="level-stars">{l.stars}</span><strong>{l.name}</strong><small>{l.detail}</small><span className="card-action">Pilih level <ChevronRight size={16}/></span></button>)}</div></div>;
}

function GamePage({ onBack, onChoose }) {
  return <div className="app-page"><Header title="Pilih Permainan" subtitle="Ada empat permainan seru untukmu!" onBack={onBack} /><div className="game-grid">{games.map((g, i) => <button className={`game-card game-${g.accent}`} key={g.id} onClick={() => onChoose(g.id)}><span className="game-number">0{i + 1}</span><span className="game-emoji">{g.icon}</span><strong>{g.title}</strong><p>{g.description}</p><span className="card-action">Pilih permainan <ChevronRight size={16}/></span></button>)}</div><div className="friendly-note"><span>💡</span> Pilih game yang ingin kamu mainkan. Semua game bisa dicoba kapan saja!</div></div>;
}

function TopicPage({ onBack, onChoose }) {
  return <div className="app-page"><Header title="Pilih Tema" subtitle="Dunia mana yang ingin kamu jelajahi?" onBack={onBack} /><div className="topic-grid">{topics.map((topic) => <button className={`topic-card topic-${topic.color}`} key={topic.id} onClick={() => onChoose(topic.id)}><span className="topic-visual">{topic.icon}</span><span className="topic-copy"><strong>{topic.title}</strong><span className="topic-arabic" dir="rtl">{topic.arabicTitle}</span></span><ChevronRight className="topic-arrow" size={19}/></button>)}</div><div className="friendly-note"><span>🌈</span> Pilih satu tema, lalu kenali kosakata Arabnya sebelum bermain.</div></div>;
}

function LearnPage({ topic, level, onBack, onStart }) {
  const words = getLearnWords(topic, level);
  return <div className="app-page learn-page"><Header title={`Belajar: ${topic.title}`} subtitle="Kenali gambar, arti, dan cara mengucapkannya." onBack={onBack} right={<span className="level-chip">{levelInfo[level].icon} {levelInfo[level].label}</span>} />
    <div className="learn-intro"><div className="learn-topic-icon">{topic.icon}</div><div><strong>Kenalan dulu, yuk!</strong><p>Tekan tombol speaker untuk mendengarkan pengucapan bahasa Arab. Kamu boleh mengulanginya berkali-kali.</p></div></div>
    {topic.id === 'numbers' && <div className="special-note"><span>🔢</span> Semua angka 1–50 tersedia di sini. Saat bermain, sistem memilih soal secara acak sesuai level.</div>}
    {topic.id === 'time-days' && <div className="special-note"><span>🕒</span> Pelajari jam digital bulat, nama hari, serta kosakata pagi, siang, sore, dan malam.</div>}
    <div className="learn-count">{words.length} kosakata untuk dipelajari</div>
    <div className="learn-grid">{words.map((w) => <article className="learn-card" key={w.id}><div className="learn-visual">{w.kind === 'clock' || w.display?.includes('.') ? <span className="digital-clock">{w.display}</span> : <span>{w.visual}</span>}</div><div className="learn-label">{w.label}</div><div className="arabic-word" dir="rtl">{w.arabic}</div><AudioButton text={w.arabic} label="Dengarkan pengucapan" /></article>)}</div>
    <div className="learn-actions"><button className="secondary-button" onClick={() => onStart(true)}><ArrowRight size={18}/> Langsung Bermain</button><button className="primary-button" onClick={() => onStart(false)}>Aku Siap Bermain! <Sparkles size={18}/></button></div>
    <p className="audio-disclaimer">Catatan: suara pada versi awal mengikuti ketersediaan suara Arab di perangkat. Untuk versi final tugas, gunakan rekaman guru/penutur fasih dan verifikasi harakat.</p>
  </div>;
}

function MemoryGame({ words, onFinish }) {
  const [cards] = useState(() => shuffle(words.flatMap((w) => [
    { id: `${w.id}-image`, item: w, kind: 'image' },
    { id: `${w.id}-word`, item: w, kind: 'word' },
  ])));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [locked, setLocked] = useState(false);
  const [points, setPoints] = useState(0);
  const [moves, setMoves] = useState(0);
  const [feedback, setFeedback] = useState('Buka dua kartu dan temukan pasangannya!');

  const clickCard = (index) => {
    if (locked || flipped.includes(index) || matched.includes(cards[index].item.id)) return;
    const next = [...flipped, index];
    setFlipped(next);
    if (next.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const a = cards[next[0]];
      const b = cards[next[1]];
      const isMatch = a.item.id === b.item.id && a.kind !== b.kind;
      if (isMatch) {
        window.setTimeout(() => {
          const nextMatched = [...matched, a.item.id];
          const nextPoints = points + 10;
          setMatched(nextMatched);
          setFlipped([]);
          setLocked(false);
          setPoints(nextPoints);
          setFeedback('Hebat! Kamu menemukan pasangan yang tepat!');
          sayFeedbackThenArabic('Hebat!', a.item.arabic);
          if (nextMatched.length === words.length) window.setTimeout(() => onFinish({ points: nextPoints, total: words.length, correct: words.length }), 1050);
        }, 380);
      } else {
        setFeedback('Belum cocok. Coba pasangan yang lain, ya!');
        window.setTimeout(() => { setFlipped([]); setLocked(false); }, 950);
      }
    }
  };

  return <div className="game-stage">
    <div className="game-status-row"><span className="status-pill">🃏 {matched.length} / {words.length} pasangan</span><span className="status-pill">Langkah: {moves}</span><span className="status-pill">⭐ {points} poin</span></div>
    <div className="game-instruction">{feedback}</div>
    <div className="memory-grid">{cards.map((card, index) => {
      const open = flipped.includes(index) || matched.includes(card.item.id);
      return <button type="button" key={card.id} className={`memory-card ${open ? 'is-open' : ''} ${matched.includes(card.item.id) ? 'is-matched' : ''}`} onClick={() => clickCard(index)} aria-label="Kartu memori">
        {open ? card.kind === 'image' ? <span className="memory-visual">{card.item.visual}</span> : <span className="memory-arabic" dir="rtl">{card.item.arabic}</span> : <span className="card-question">؟</span>}
      </button>;
    })}</div>
    <div className="game-tip">💡 Ingat, satu pasangan terdiri dari satu kartu gambar dan satu kartu tulisan Arab.</div>
  </div>;
}

function WordSearchGame({ words, level, onFinish }) {
  const [index, setIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [found, setFound] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [seconds, setSeconds] = useState(level === 'hard' ? 60 : null);
  const [tapStart, setTapStart] = useState(null);
  const [selection, setSelection] = useState([]);
  const dragStart = useRef(null);
  const [feedback, setFeedback] = useState('Cari kata Arab yang cocok dengan gambar dan petunjuk Indonesia.');
  const current = words[index];
  const puzzle = useMemo(() => createWordPuzzle(current, level), [current.id, level]);
  const solutionKeys = new Set(puzzle.path.map((p) => `${p.r}-${p.c}`));

  useEffect(() => {
    setFound(false); setHintUsed(false); setShowHint(false); setTapStart(null); setSelection([]); dragStart.current = null;
    setSeconds(level === 'hard' ? 60 : null);
    setFeedback('Cari kata Arab yang cocok dengan gambar dan petunjuk Indonesia.');
  }, [index, level]);

  useEffect(() => {
    if (level !== 'hard' || found || seconds === null) return undefined;
    if (seconds <= 0) {
      if (!hintUsed) {
        setHintUsed(true); setShowHint(true); setSeconds(30);
        setFeedback('Waktu awal habis. Huruf pertama diberi petunjuk dan kamu mendapat 30 detik tambahan!');
      } else {
        setSeconds(null); setShowHint(true);
        setFeedback('Waktu tambahan selesai. Tenang, kamu tetap boleh mencoba tanpa batas waktu.');
      }
      return undefined;
    }
    const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, level, found, hintUsed]);

  const completeWord = (assisted) => {
    if (found) return;
    setFound(true);
    const earned = assisted ? 7 : 10;
    const nextPoints = points + earned;
    setPoints(nextPoints);
    setFeedback('Hebat! Kata berhasil ditemukan!');
    sayFeedbackThenArabic(assisted ? 'Bagus sekali!' : 'Hebat!', current.arabic);
    setSelection([]); setTapStart(null);
    // Store the score in local state and finish only when the learner presses Next.
    setPoints(nextPoints);
  };

  const checkPath = (path) => {
    if (!path || path.length < 2 || found) return false;
    const seq = path.map((p) => puzzle.grid[p.r][p.c]).join('');
    const reverse = Array.from(seq).reverse().join('');
    if (seq === puzzle.answer || reverse === puzzle.answer) {
      completeWord(hintUsed);
      return true;
    }
    setFeedback('Belum tepat. Coba cari lagi, ya!');
    sayFeedback('Coba lagi!');
    setSelection([]); setTapStart(null);
    return false;
  };

  const pointerDown = (r, c) => {
    if (found) return;
    dragStart.current = { r, c };
    setSelection([{ r, c }]);
  };
  const pointerEnter = (r, c) => {
    if (!dragStart.current || found) return;
    const line = lineCells(dragStart.current, { r, c });
    if (line) setSelection(line);
  };
  const pointerUp = (r, c) => {
    if (found) return;
    const end = { r, c };
    if (dragStart.current) {
      const line = lineCells(dragStart.current, end);
      dragStart.current = null;
      if (line && line.length > 1) { checkPath(line); return; }
    }
    if (tapStart) {
      const line = lineCells(tapStart, end);
      if (line && line.length > 1) checkPath(line);
      else { setTapStart(end); setSelection([end]); }
    } else {
      setTapStart(end); setSelection([end]);
    }
  };

  const nextWord = () => {
    if (index + 1 >= words.length) onFinish({ points, total: words.length, correct: words.length });
    else setIndex((i) => i + 1);
  };

  return <div className="game-stage">
    <div className="game-status-row"><span className="status-pill">🔎 Kata {index + 1} / {words.length}</span><span className="status-pill">⭐ {points} poin</span>{level === 'hard' && seconds !== null && <span className="status-pill timer-pill"><Clock3 size={15}/> {seconds} detik</span>}</div>
    <ProgressBar value={index + (found ? 1 : 0)} total={words.length}/>
    <div className="wordsearch-prompt"><div className="prompt-visual">{current.visual}</div><div><span className="prompt-kicker">TEMUKAN KATA INI</span><strong>{current.label}</strong>{found && <div className="arabic-reveal" dir="rtl">{current.arabic}</div>}</div><div className="prompt-actions">{found ? <AudioButton text={current.arabic} compact label="Putar ulang pengucapan"/> : <span className="prompt-lock">Arab disembunyikan</span>}</div></div>
    {level === 'hard' && showHint && !found && <div className="hint-banner"><Lightbulb size={17}/> Petunjuk: huruf pertama kata ditandai di kotak.</div>}
    <div className="word-grid-scroll"><div className="word-grid" style={{ '--grid-size': puzzle.size }}>
      {puzzle.grid.map((row, r) => row.map((letter, c) => {
        const key = `${r}-${c}`;
        const selected = selection.some((p) => p.r === r && p.c === c);
        const hinted = showHint && solutionKeys.has(key) && puzzle.path[0].r === r && puzzle.path[0].c === c;
        return <button type="button" key={key} className={`letter-cell ${selected ? 'selected-cell' : ''} ${hinted ? 'hint-cell' : ''}`} onPointerDown={() => pointerDown(r,c)} onPointerEnter={() => pointerEnter(r,c)} onPointerUp={() => pointerUp(r,c)} aria-label={`Huruf ${letter}`}>
          <span dir="rtl">{letter}</span>
        </button>;
      }))}
    </div></div>
    <div className="game-tip">☝️ Geser jari/mouse dari huruf awal ke huruf akhir. Di layar sentuh, kamu juga bisa sentuh huruf awal lalu huruf akhir.</div>
    {found && <div className="success-panel"><div className="success-icon">🎉</div><div><strong>Hebat! Kamu menemukannya!</strong><p className="arabic-word" dir="rtl">{current.arabic}</p><span>{current.label} dalam bahasa Arab.</span></div><button className="primary-button" onClick={nextWord}>{index + 1 === words.length ? 'Lihat Hasil' : 'Kata Berikutnya'} <ArrowRight size={17}/></button></div>}
  </div>;
}

function ArrangeGame({ words, level, onFinish }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState('Susun huruf-huruf acak menjadi kata bahasa Arab yang benar.');
  const current = words[index];
  const answer = useMemo(() => Array.from(stripArabic(current.arabic)), [current.id]);
  const tokens = useMemo(() => {
    const extraCount = level === 'easy' ? 0 : level === 'medium' ? 2 : 4;
    const extras = sample(ARABIC_FILL.filter((ch) => !answer.includes(ch)), extraCount);
    return shuffle([...answer, ...extras].map((letter, i) => ({ id: `${current.id}-${i}-${letter}`, letter })));
  }, [current.id, level]);

  useEffect(() => { setSelected([]); setCorrect(false); setFeedback('Susun huruf-huruf acak menjadi kata bahasa Arab yang benar.'); }, [index]);

  const addToken = (token) => {
    if (correct || selected.some((s) => s.id === token.id) || selected.length >= answer.length) return;
    setSelected((prev) => [...prev, token]);
  };
  const removeToken = (tokenId) => {
    if (correct) return;
    setSelected((prev) => prev.filter((s) => s.id !== tokenId));
  };
  const checkAnswer = () => {
    const response = selected.map((s) => s.letter).join('');
    if (response === answer.join('')) {
      const nextPoints = points + 10;
      setPoints(nextPoints); setCorrect(true); setFeedback('Masyaallah! Susunan hurufmu benar!');
      sayFeedbackThenArabic('Hebat!', current.arabic);
    } else {
      setFeedback('Belum tepat. Coba susun lagi, ya!'); sayFeedback('Coba lagi!');
    }
  };
  const nextWord = () => {
    if (index + 1 >= words.length) onFinish({ points, total: words.length, correct: words.length });
    else setIndex((i) => i + 1);
  };

  return <div className="game-stage">
    <div className="game-status-row"><span className="status-pill">🔤 Kata {index + 1} / {words.length}</span><span className="status-pill">⭐ {points} poin</span><span className="status-pill">Pengecoh: {level === 'easy' ? '0' : level === 'medium' ? '2' : '4'} huruf</span></div>
    <ProgressBar value={index + (correct ? 1 : 0)} total={words.length}/>
    <div className="arrange-prompt"><span className="arrange-visual">{current.visual}</span><div><span className="prompt-kicker">SUSUN KATA INI</span><strong>{current.label}</strong><small>Susun huruf dari kanan ke kiri.</small></div></div>
    <div className="answer-slots" dir="rtl">{Array.from({ length: answer.length }, (_, i) => <button type="button" key={i} className={`answer-slot ${selected[i] ? 'slot-filled' : ''}`} onClick={() => selected[i] && removeToken(selected[i].id)}>{selected[i]?.letter || ''}</button>)}</div>
    <div className="letter-bank" dir="rtl">{tokens.map((token) => <button type="button" key={token.id} disabled={selected.some((s) => s.id === token.id) || correct} className="letter-token" onClick={() => addToken(token)}>{token.letter}</button>)}</div>
    <p className="game-instruction">{feedback}</p>
    {!correct ? <div className="game-controls"><button className="secondary-button" onClick={() => setSelected([])}><RotateCcw size={17}/> Hapus susunan</button><button className="primary-button" disabled={selected.length !== answer.length} onClick={checkAnswer}>Periksa Jawaban <CheckCircle2 size={18}/></button></div> : <div className="success-panel"><div className="success-icon">🎉</div><div><strong>Jawaban benar!</strong><p className="arabic-word" dir="rtl">{current.arabic}</p><span>{current.label} dalam bahasa Arab.</span><div className="inline-audio"><AudioButton text={current.arabic} compact label="Putar ulang pengucapan"/></div></div><button className="primary-button" onClick={nextWord}>{index + 1 === words.length ? 'Lihat Hasil' : 'Berikutnya'} <ArrowRight size={17}/></button></div>}
  </div>;
}

function CatchGame({ words, onFinish }) {
  const [index, setIndex] = useState(0);
  const [caught, setCaught] = useState([]);
  const [solved, setSolved] = useState(false);
  const [points, setPoints] = useState(0);
  const [feedback, setFeedback] = useState('Dengarkan petunjuk, lalu tangkap semua gambar yang sesuai!');
  const current = words[index];
  const objects = useMemo(() => makeCatchObjects(current, words), [current.id, index]);
  const targetIds = objects.filter((o) => o.isTarget).map((o) => o.id);
  useEffect(() => {
    setCaught([]); setSolved(false); setFeedback('Dengarkan petunjuk, lalu tangkap semua gambar yang sesuai!');
    const timer = window.setTimeout(() => speak(current.arabic), 650);
    return () => window.clearTimeout(timer);
  }, [index]);

  const catchObject = (obj) => {
    if (solved || caught.includes(obj.id)) return;
    if (!obj.isTarget) {
      setFeedback('Ups, bukan itu. Coba lagi, ya!'); sayFeedback('Coba lagi!'); return;
    }
    const nextCaught = [...caught, obj.id];
    setCaught(nextCaught);
    setFeedback(`Bagus! ${nextCaught.length} dari 3 gambar ditemukan.`);
    if (nextCaught.length === targetIds.length) {
      const nextPoints = points + 10;
      setPoints(nextPoints); setSolved(true); setFeedback('Hebat! Semua gambar yang diminta berhasil ditangkap!');
      sayFeedbackThenArabic('Hebat!', current.arabic);
    } else {
      sayFeedback('Bagus!');
    }
  };
  const nextWord = () => {
    if (index + 1 >= words.length) onFinish({ points, total: words.length, correct: words.length });
    else setIndex((i) => i + 1);
  };

  return <div className="game-stage">
    <div className="game-status-row"><span className="status-pill">🎯 Babak {index + 1} / {words.length}</span><span className="status-pill">⭐ {points} poin</span><span className="status-pill">Tertangkap: {caught.length}/3</span></div>
    <ProgressBar value={index + (solved ? 1 : 0)} total={words.length}/>
    <div className="catch-prompt"><div><span className="prompt-kicker">TANGKAP SEMUA GAMBAR</span><strong>{current.label}!</strong><small>{solved ? 'Kosakata Arab:' : 'Dengarkan petunjuk bahasa Arab, lalu cari gambarnya.'}</small>{solved && <span className="arabic-word" dir="rtl">{current.arabic}</span>}</div><AudioButton text={current.arabic} label="Dengarkan petunjuk Arab" /></div>
    <div className="catch-field"><div className="catch-cloud cloud-one"/><div className="catch-cloud cloud-two"/>{objects.map((obj) => <button type="button" key={obj.id} disabled={caught.includes(obj.id) || solved} onClick={() => catchObject(obj)} className={`catch-object ${obj.isTarget ? 'catch-target' : ''} ${caught.includes(obj.id) ? 'caught-object' : ''}`} style={{ left: `${obj.left}%`, top: `${obj.top}%`, animationDuration: `${obj.duration}s`, animationDelay: `${obj.delay}s`, '--drift': obj.drift, zIndex: obj.z + 1 }} aria-label={obj.item.label}>{caught.includes(obj.id) ? '✨' : obj.item.visual}</button>)}</div>
    <p className="game-instruction">{feedback}</p>
    {solved && <div className="success-panel"><div className="success-icon">🎉</div><div><strong>Hebat! Semua {current.label.toLowerCase()} tertangkap!</strong><p className="arabic-word" dir="rtl">{current.arabic}</p><span>Dengarkan lagi agar makin ingat.</span><div className="inline-audio"><AudioButton text={current.arabic} compact label="Putar ulang pengucapan"/></div></div><button className="primary-button" onClick={nextWord}>{index + 1 === words.length ? 'Lihat Hasil' : 'Lanjut'} <ArrowRight size={17}/></button></div>}
  </div>;
}

function GameRunner({ game, words, level, onFinish }) {
  if (game === 'memory') return <MemoryGame words={words} onFinish={onFinish}/>;
  if (game === 'wordsearch') return <WordSearchGame words={words} level={level} onFinish={onFinish}/>;
  if (game === 'arrange') return <ArrangeGame words={words} level={level} onFinish={onFinish}/>;
  return <CatchGame words={words} onFinish={onFinish}/>;
}

function ResultPage({ result, topic, game, level, onReplay, onGames, onThemes }) {
  const percent = Math.round((result.points / (result.total * 10)) * 100) || 0;
  const stars = percent >= 90 ? 3 : percent >= 70 ? 2 : 1;
  const message = percent >= 90 ? 'Luar biasa! Kamu hebat sekali!' : percent >= 70 ? 'Bagus! Terus berlatih, ya!' : 'Semangat! Coba lagi, kamu pasti bisa!';
  return <div className="app-page result-page"><div className="result-card"><div className="confetti confetti-a">✦</div><div className="confetti confetti-b">✧</div><Mascots className="result-mascots"/><span className="result-kicker"><Trophy size={16}/> PETUALANGAN SELESAI</span><h1>{message}</h1><p className="result-subtitle">Kamu sudah menyelesaikan {game.title} tema {topic.title}!</p><div className="result-stars">{Array.from({length:3},(_,i)=><Star key={i} size={38} fill={i<stars?'#ffc83d':'#e8edf5'} color={i<stars?'#efa900':'#d9e0ea'}/>)}</div><div className="score-circle"><strong>{percent}</strong><span>SKOR</span></div><div className="result-stats"><div><strong>{result.correct}/{result.total}</strong><span>Kosakata selesai</span></div><div><strong>{result.points}</strong><span>Poin terkumpul</span></div><div><strong>{levelInfo[level].label}</strong><span>Level dimainkan</span></div></div><p className="result-encouragement">Masyaallah! Setiap latihan membuatmu semakin mengenal mufradat. 💙</p><div className="result-actions"><button className="primary-button" onClick={onReplay}><RotateCcw size={18}/> Main Lagi</button><button className="secondary-button" onClick={onGames}>Pilih Game Lain</button><button className="text-button" onClick={onThemes}>Kembali ke Tema</button></div></div></div>;
}

export default function App() {
  const [page, setPage] = useState('home');
  const [level, setLevel] = useState('easy');
  const [gameId, setGameId] = useState('memory');
  const [topicId, setTopicId] = useState('fruits');
  const [sessionWords, setSessionWords] = useState([]);
  const [sessionKey, setSessionKey] = useState(0);
  const [result, setResult] = useState({ points: 0, total: 0, correct: 0 });
  const topic = topics.find((t) => t.id === topicId) || topics[0];
  const game = games.find((g) => g.id === gameId) || games[0];

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);
  useEffect(() => () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }, []);

  const startSession = () => {
    const words = getGameWords(topic, level);
    setSessionWords(words);
    setSessionKey((k) => k + 1);
    setPage('play');
  };
  const finishSession = (data) => { setResult(data); setPage('result'); };
  const replay = () => startSession();

  return <div className="site-shell">
    {page === 'home' && <HomePage onStart={() => setPage('level')}/>}
    {page === 'level' && <LevelPage onBack={() => setPage('home')} onChoose={(v) => { setLevel(v); setPage('game'); }}/>}
    {page === 'game' && <GamePage onBack={() => setPage('level')} onChoose={(v) => { setGameId(v); setPage('theme'); }}/>}
    {page === 'theme' && <TopicPage onBack={() => setPage('game')} onChoose={(v) => { setTopicId(v); setPage('learn'); }}/>}
    {page === 'learn' && <LearnPage topic={topic} level={level} onBack={() => setPage('theme')} onStart={() => startSession()}/>}
    {page === 'play' && <div className="app-page play-page"><Header title={game.title} subtitle={`${topic.title} • Level ${levelInfo[level].label}`} onBack={() => setPage('learn')} right={<span className="level-chip">{levelInfo[level].icon} {levelInfo[level].label}</span>}/><GameRunner key={sessionKey} game={gameId} words={sessionWords} level={level} onFinish={finishSession}/></div>}
    {page === 'result' && <ResultPage result={result} topic={topic} game={game} level={level} onReplay={replay} onGames={() => setPage('game')} onThemes={() => setPage('theme')}/>}
    <footer className="site-footer"><span>💙 Petualangan Mufradat</span><span>Belajar • Bermain • Bertumbuh</span></footer>
  </div>;
}
