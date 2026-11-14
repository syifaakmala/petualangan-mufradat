const item = (id, label, arabic, visual, extra = {}) => ({ id, label, arabic, visual, ...extra });

const fruits = [
  item('apple', 'Apel', 'تُفَّاحٌ', '🍎'),
  item('banana', 'Pisang', 'مَوْزٌ', '🍌'),
  item('orange', 'Jeruk', 'بُرْتُقَالٌ', '🍊'),
  item('grapes', 'Anggur', 'عِنَبٌ', '🍇'),
  item('watermelon', 'Semangka', 'بِطِّيخٌ', '🍉'),
  item('strawberry', 'Stroberi', 'فَرَاوِلَةٌ', '🍓'),
  item('pineapple', 'Nanas', 'أَنَانَاسٌ', '🍍'),
  item('mango', 'Mangga', 'مَانْجُو', '🥭'),
  item('melon', 'Melon', 'شَمَّامٌ', '🍈'),
  item('lemon', 'Lemon', 'لَيْمُونٌ', '🍋'),
  item('dates', 'Kurma', 'تَمْرٌ', '🫘'),
  item('pear', 'Pir', 'كُمَّثْرَى', '🍐'),
  item('papaya', 'Pepaya', 'بَابَايَا', '🧡'),
  item('rambutan', 'Rambutan', 'رَامْبُوتَانٌ', '🔴'),
  item('guava', 'Jambu biji', 'جَوَافَةٌ', '🍈'),
  item('starfruit', 'Belimbing', 'كَرَامْبُولَا', '⭐'),
  item('salak', 'Salak', 'سَالَاكٌ', '🤎'),
  item('coconut', 'Kelapa', 'جَوْزُ الْهِنْدِ', '🥥'),
  item('pomegranate', 'Delima', 'رُمَّانٌ', '❤️'),
  item('blueberry', 'Blueberry', 'تُوتٌ أَزْرَقُ', '🫐'),
];

const animals = [
  item('cat', 'Kucing', 'قِطَّةٌ', '🐱'),
  item('chicken', 'Ayam', 'دَجَاجَةٌ', '🐔'),
  item('cow', 'Sapi', 'بَقَرَةٌ', '🐮'),
  item('goat', 'Kambing', 'مَاعِزٌ', '🐐'),
  item('rabbit', 'Kelinci', 'أَرْنَبٌ', '🐰'),
  item('elephant', 'Gajah', 'فِيلٌ', '🐘'),
  item('lion', 'Singa', 'أَسَدٌ', '🦁'),
  item('horse', 'Kuda', 'حِصَانٌ', '🐴'),
  item('bird', 'Burung', 'طَائِرٌ', '🐦'),
  item('tiger', 'Harimau', 'نَمِرٌ', '🐯'),
  item('giraffe', 'Jerapah', 'زَرَافَةٌ', '🦒'),
  item('zebra', 'Zebra', 'حِمَارٌ وَحْشِيٌّ', '🦓'),
  item('crocodile', 'Buaya', 'تِمْسَاحٌ', '🐊'),
  item('snake', 'Ular', 'ثُعْبَانٌ', '🐍'),
  item('monkey', 'Monyet', 'قِرْدٌ', '🐒'),
  item('bear', 'Beruang', 'دُبٌّ', '🐻'),
  item('turtle', 'Kura-kura', 'سُلَحْفَاةٌ', '🐢'),
  item('ant', 'Semut', 'نَمْلَةٌ', '🐜'),
  item('butterfly', 'Kupu-kupu', 'فَرَاشَةٌ', '🦋'),
  item('bee', 'Lebah', 'نَحْلَةٌ', '🐝'),
];

const familyHome = [
  item('father', 'Ayah', 'أَبٌ', '👨🏻'),
  item('mother', 'Ibu', 'أُمٌّ', '👩🏻'),
  item('brother', 'Saudara laki-laki', 'أَخٌ', '👦🏻'),
  item('sister', 'Saudara perempuan', 'أُخْتٌ', '👧🏻'),
  item('house', 'Rumah', 'بَيْتٌ', '🏠'),
  item('grandfather', 'Kakek', 'جَدٌّ', '👴🏻'),
  item('grandmother', 'Nenek', 'جَدَّةٌ', '👵🏻'),
  item('door', 'Pintu', 'بَابٌ', '🚪'),
  item('window', 'Jendela', 'نَافِذَةٌ', '🪟'),
  item('room', 'Kamar', 'غُرْفَةٌ', '🛏️'),
  item('table', 'Meja', 'طَاوِلَةٌ', '🪑'),
  item('chair', 'Kursi', 'كُرْسِيٌّ', '🪑'),
  item('bed', 'Tempat tidur', 'سَرِيرٌ', '🛏️'),
  item('cupboard', 'Lemari', 'خِزَانَةٌ', '🚪'),
  item('lamp', 'Lampu', 'مِصْبَاحٌ', '💡'),
  item('pillow', 'Bantal', 'وِسَادَةٌ', '🛌'),
  item('blanket', 'Selimut', 'بَطَّانِيَّةٌ', '🧣'),
  item('sofa', 'Sofa', 'أَرِيكَةٌ', '🛋️'),
  item('mirror', 'Cermin', 'مِرْآةٌ', '🪞'),
  item('wallclock', 'Jam dinding', 'سَاعَةُ الْحَائِطِ', '🕰️'),
];

const school = [
  item('school', 'Sekolah', 'مَدْرَسَةٌ', '🏫'),
  item('teacher', 'Guru', 'مُعَلِّمٌ', '🧑🏻‍🏫'),
  item('book', 'Buku', 'كِتَابٌ', '📘'),
  item('pencil', 'Pensil', 'قَلَمُ رَصَاصٍ', '✏️'),
  item('bag', 'Tas', 'حَقِيبَةٌ', '🎒'),
  item('classroom', 'Kelas', 'فَصْلٌ', '🏫'),
  item('blackboard', 'Papan tulis', 'سَبُّورَةٌ', '🟩'),
  item('eraser', 'Penghapus', 'مِمْحَاةٌ', '🧽'),
  item('ruler', 'Penggaris', 'مِسْطَرَةٌ', '📏'),
  item('notebook', 'Buku tulis', 'دَفْتَرٌ', '📓'),
  item('pencilcase', 'Tempat pensil', 'مِقْلَمَةٌ', '🖍️'),
  item('sharpener', 'Rautan', 'مِبْرَاةٌ', '🔺'),
  item('paper', 'Kertas', 'وَرَقَةٌ', '📄'),
  item('scissors', 'Gunting', 'مِقَصٌّ', '✂️'),
  item('computer', 'Komputer', 'حَاسُوبٌ', '💻'),
  item('map', 'Peta', 'خَرِيطَةٌ', '🗺️'),
  item('student', 'Murid', 'طَالِبٌ', '🧑🏻‍🎓'),
  item('uniform', 'Seragam sekolah', 'زِيٌّ مَدْرَسِيٌّ', '🎽'),
  item('marker', 'Spidol', 'قَلَمُ تَخْطِيطٍ', '🖊️'),
  item('bell', 'Bel sekolah', 'جَرَسٌ مَدْرَسِيٌّ', '🔔'),
];

const food = [
  item('rice', 'Nasi', 'أَرُزٌّ', '🍚'),
  item('bread', 'Roti', 'خُبْزٌ', '🍞'),
  item('water', 'Air', 'مَاءٌ', '💧'),
  item('milk', 'Susu', 'حَلِيبٌ', '🥛'),
  item('egg', 'Telur', 'بَيْضَةٌ', '🥚'),
  item('cheese', 'Keju', 'جُبْنٌ', '🧀'),
  item('meat', 'Daging', 'لَحْمٌ', '🍖'),
  item('juice', 'Jus', 'عَصِيرٌ', '🧃'),
  item('tea', 'Teh', 'شَايٌ', '🍵'),
  item('soup', 'Sup', 'حَسَاءٌ', '🍲'),
  item('salt', 'Garam', 'مِلْحٌ', '🧂'),
  item('sugar', 'Gula', 'سُكَّرٌ', '🍬'),
  item('oil', 'Minyak', 'زَيْتٌ', '🫗'),
  item('butter', 'Mentega', 'زُبْدَةٌ', '🧈'),
  item('honey', 'Madu', 'عَسَلٌ', '🍯'),
  item('coffee', 'Kopi', 'قَهْوَةٌ', '☕'),
  item('salad', 'Salad', 'سَلَطَةٌ', '🥗'),
  item('pasta', 'Pasta', 'مَعْكَرُونَةٌ', '🍝'),
  item('pie', 'Pai', 'فَطِيرَةٌ', '🥧'),
  item('candy', 'Permen', 'حَلْوَى', '🍭'),
];

const professions = [
  item('doctor', 'Dokter', 'طَبِيبٌ', '🧑🏻‍⚕️'),
  item('nurse', 'Perawat', 'مُمَرِّضَةٌ', '👩🏻‍⚕️'),
  item('police', 'Polisi', 'شُرْطِيٌّ', '👮🏻'),
  item('farmer', 'Petani', 'فَلَّاحٌ', '🧑🏻‍🌾'),
  item('cook', 'Koki', 'طَبَّاخٌ', '👨🏻‍🍳'),
  item('driver', 'Sopir', 'سَائِقٌ', '🚕'),
  item('merchant', 'Pedagang', 'تَاجِرٌ', '🧑🏻‍💼'),
  item('tailor', 'Penjahit', 'خَيَّاطٌ', '🧵'),
  item('barber', 'Tukang cukur', 'حَلَّاقٌ', '💈'),
  item('pilot', 'Pilot', 'طَيَّارٌ', '👨🏻‍✈️'),
  item('firefighter', 'Pemadam kebakaran', 'رَجُلُ إِطْفَاءٍ', '🧑🏻‍🚒'),
  item('engineer', 'Insinyur', 'مُهَنْدِسٌ', '👷🏻'),
  item('architect', 'Arsitek', 'مُهَنْدِسٌ مِعْمَارِيٌّ', '📐'),
  item('carpenter', 'Tukang kayu', 'نَجَّارٌ', '🪚'),
  item('mechanic', 'Montir', 'مِيكَانِيكِيٌّ', '🔧'),
  item('journalist', 'Wartawan', 'صَحَفِيٌّ', '📰'),
  item('photographer', 'Fotografer', 'مُصَوِّرٌ', '📷'),
  item('pharmacist', 'Apoteker', 'صَيْدَلِيٌّ', '💊'),
  item('lawyer', 'Pengacara', 'مُحَامٍ', '⚖️'),
  item('dentist', 'Dokter gigi', 'طَبِيبُ أَسْنَانٍ', '🦷'),
];

const places = [
  item('mosque', 'Masjid', 'مَسْجِدٌ', '🕌'),
  item('market', 'Pasar', 'سُوقٌ', '🛍️'),
  item('hospital', 'Rumah sakit', 'مُسْتَشْفًى', '🏥'),
  item('park', 'Taman', 'حَدِيقَةٌ', '🌳'),
  item('library', 'Perpustakaan', 'مَكْتَبَةٌ', '📚'),
  item('airport', 'Bandara', 'مَطَارٌ', '✈️'),
  item('station', 'Stasiun', 'مَحَطَّةٌ', '🚉'),
  item('restaurant', 'Restoran', 'مَطْعَمٌ', '🍽️'),
  item('hotel', 'Hotel', 'فُنْدُقٌ', '🏨'),
  item('museum', 'Museum', 'مَتْحَفٌ', '🏛️'),
  item('bus-terminal', 'Terminal bus', 'مَحَطَّةُ الْحَافِلَاتِ', '🚌'),
  item('post-office', 'Kantor pos', 'مَكْتَبُ الْبَرِيدِ', '📮'),
  item('police-station', 'Kantor polisi', 'مَرْكَزُ الشُّرْطَةِ', '🚓'),
  item('bank', 'Bank', 'بَنْكٌ', '🏦'),
  item('zoo', 'Kebun binatang', 'حَدِيقَةُ الْحَيَوَانَاتِ', '🦒'),
  item('pool', 'Kolam renang', 'مَسْبَحٌ', '🏊'),
  item('stadium', 'Stadion', 'مَلْعَبٌ', '🏟️'),
  item('pharmacy', 'Apotek', 'صَيْدَلِيَّةٌ', '💊'),
  item('mall', 'Pusat perbelanjaan', 'مَرْكَزٌ تِجَارِيٌّ', '🏬'),
  item('cinema', 'Bioskop', 'سِينَمَا', '🎬'),
];

const ones = [
  'وَاحِدٌ','اِثْنَانِ','ثَلَاثَةٌ','أَرْبَعَةٌ','خَمْسَةٌ','سِتَّةٌ','سَبْعَةٌ','ثَمَانِيَةٌ','تِسْعَةٌ'
];
const teens = [
  'أَحَدَ عَشَرَ','اِثْنَا عَشَرَ','ثَلَاثَةَ عَشَرَ','أَرْبَعَةَ عَشَرَ','خَمْسَةَ عَشَرَ',
  'سِتَّةَ عَشَرَ','سَبْعَةَ عَشَرَ','ثَمَانِيَةَ عَشَرَ','تِسْعَةَ عَشَرَ'
];
const tens = {20:'عِشْرُونَ',30:'ثَلَاثُونَ',40:'أَرْبَعُونَ',50:'خَمْسُونَ'};
const numberArabic = (n) => {
  if (n <= 9) return ones[n - 1];
  if (n === 10) return 'عَشَرَةٌ';
  if (n <= 19) return teens[n - 11];
  const ten = Math.floor(n / 10) * 10;
  const unit = n % 10;
  if (!unit) return tens[ten];
  return `${ones[unit - 1]} وَ${tens[ten]}`;
};
const toArabicDigits = (n) => String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);
const numberOnesId = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
const numberTensId = { 20: 'Dua puluh', 30: 'Tiga puluh', 40: 'Empat puluh', 50: 'Lima puluh' };
const numberLabel = (n) => {
  if (n <= 19) {
    const teenNames = ['', '', '', '', '', '', '', '', '', '', 'Sepuluh', 'Sebelas', 'Dua belas', 'Tiga belas', 'Empat belas', 'Lima belas', 'Enam belas', 'Tujuh belas', 'Delapan belas', 'Sembilan belas'];
    return n <= 9 ? numberOnesId[n] : teenNames[n];
  }
  const ten = Math.floor(n / 10) * 10;
  const unit = n % 10;
  return unit ? `${numberTensId[ten]} ${numberOnesId[unit].toLowerCase()}` : numberTensId[ten];
};
const numberItems = Array.from({length:50}, (_,i) => {
  const n = i + 1;
  return item(`number-${n}`, numberLabel(n), numberArabic(n), toArabicDigits(n), { display: String(n), numeric: n });
});

const ordinalHours = {
  1:'الْوَاحِدَةُ',2:'الثَّانِيَةُ',3:'الثَّالِثَةُ',4:'الرَّابِعَةُ',5:'الْخَامِسَةُ',6:'السَّادِسَةُ',
  7:'السَّابِعَةُ',8:'الثَّامِنَةُ',9:'التَّاسِعَةُ',10:'الْعَاشِرَةُ',11:'الْحَادِيَةَ عَشْرَةَ',12:'الثَّانِيَةَ عَشْرَةَ'
};
const hourPhrase = (h) => {
  if (h === 0) return 'مُنْتَصَفُ اللَّيْلِ';
  if (h === 12) return 'السَّاعَةُ الثَّانِيَةَ عَشْرَةَ ظُهْرًا';
  const displayHour = h > 12 ? h - 12 : h;
  const ordinal = ordinalHours[displayHour];
  let suffix = 'صَبَاحًا';
  if (h >= 13 && h <= 15) suffix = 'بَعْدَ الظُّهْرِ';
  if (h >= 16) suffix = 'مَسَاءً';
  if (h === 1) suffix = 'صَبَاحًا';
  if (h === 2) suffix = 'صَبَاحًا';
  return `السَّاعَةُ ${ordinal} ${suffix}`;
};
const hourItems = Array.from({length:24}, (_,h) => {
  const clock = `${String(h).padStart(2,'0')}.00`;
  const period = h === 0 ? 'tengah malam' : h < 12 ? 'pagi' : h === 12 ? 'siang' : h < 16 ? 'siang' : 'malam';
  const displayHour = h % 12 || 12;
  const label = h === 0 ? 'Pukul 00.00 (tengah malam)' : `Pukul ${clock} (${displayHour} ${period})`;
  return item(`hour-${h}`, label, hourPhrase(h), '🕒', { display: clock, kind: 'clock' });
});
const dayItems = [
  item('day-sunday','Minggu','يَوْمُ الْأَحَدِ','📅'),
  item('day-monday','Senin','يَوْمُ الْإِثْنَيْنِ','📅'),
  item('day-tuesday','Selasa','يَوْمُ الثُّلَاثَاءِ','📅'),
  item('day-wednesday','Rabu','يَوْمُ الْأَرْبِعَاءِ','📅'),
  item('day-thursday','Kamis','يَوْمُ الْخَمِيسِ','📅'),
  item('day-friday','Jumat','يَوْمُ الْجُمُعَةِ','📅'),
  item('day-saturday','Sabtu','يَوْمُ السَّبْتِ','📅'),
];
const periodItems = [
  item('morning','Pagi','صَبَاحًا','🌅'),
  item('noon','Siang','ظُهْرًا','☀️'),
  item('afternoon','Sore','عَصْرًا','🌇'),
  item('night','Malam','لَيْلًا','🌙'),
];
const timeItems = [...hourItems, ...dayItems, ...periodItems];

export const topics = [
  { id:'fruits', title:'Buah-buahan', arabicTitle:'الْفَوَاكِهُ', icon:'🍉', color:'coral', mode:'cumulative', items:fruits },
  { id:'animals', title:'Hewan', arabicTitle:'الْحَيَوَانَاتُ', icon:'🦁', color:'mint', mode:'cumulative', items:animals },
  { id:'family-home', title:'Keluarga & Rumah', arabicTitle:'الْأُسْرَةُ وَالْبَيْتُ', icon:'🏡', color:'peach', mode:'cumulative', items:familyHome },
  { id:'school', title:'Sekolah & Kelas', arabicTitle:'الْمَدْرَسَةُ وَالْفَصْلُ', icon:'🎒', color:'lavender', mode:'cumulative', items:school },
  { id:'food', title:'Makanan & Minuman', arabicTitle:'الطَّعَامُ وَالشَّرَابُ', icon:'🥛', color:'yellow', mode:'cumulative', items:food },
  { id:'time-days', title:'Waktu & Hari', arabicTitle:'الْوَقْتُ وَالْأَيَّامُ', icon:'🕒', color:'blue', mode:'segmented', items:timeItems, levels:{easy:hourItems.slice(1,6), medium:hourItems.slice(6,16), hard:[...hourItems.slice(16),hourItems[0],...dayItems,...periodItems]} },
  { id:'numbers', title:'Angka 1–50', arabicTitle:'الْأَرْقَامُ', icon:'🔢', color:'sky', mode:'random', items:numberItems },
  { id:'professions', title:'Profesi', arabicTitle:'الْمِهَنُ', icon:'🧑‍⚕️', color:'orange', mode:'cumulative', items:professions },
  { id:'places', title:'Tempat Umum', arabicTitle:'الْأَمَاكِنُ الْعَامَّةُ', icon:'🏙️', color:'purple', mode:'cumulative', items:places },
];

export const levelInfo = {
  easy: { label:'Mudah', count:5, icon:'⭐', description:'Mulai dari kosakata dasar' },
  medium: { label:'Sedang', count:10, icon:'⭐⭐', description:'Tambah tantangan dan ingatan' },
  hard: { label:'Sulit', count:20, icon:'⭐⭐⭐', description:'Tantangan lebih seru!' },
};

export const games = [
  { id:'memory', title:'Memory Game', description:'Buka kartu dan temukan pasangan gambar dengan kata Arab.', icon:'🃏', accent:'pink' },
  { id:'wordsearch', title:'Word Search', description:'Temukan huruf Arab berdasarkan gambar dan kata Indonesia.', icon:'🔎', accent:'green' },
  { id:'arrange', title:'Arrange The Letter', description:'Susun huruf Arab acak menjadi kosakata yang benar.', icon:'🔤', accent:'purple' },
  { id:'catch', title:'Catch Character', description:'Tangkap semua gambar yang sesuai dengan petunjuk audio.', icon:'🎯', accent:'orange' },
];

export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
export const sample = (arr, count) => shuffle(arr).slice(0, Math.min(count, arr.length));

export function getGameWords(topic, level) {
  const count = levelInfo[level].count;
  if (topic.mode === 'random') return sample(topic.items, count);
  if (topic.mode === 'segmented') return shuffle(topic.levels[level]);
  return shuffle(topic.items.slice(0, count));
}

export function getLearnWords(topic, level) {
  if (topic.mode === 'random' || topic.mode === 'segmented') return topic.items;
  return topic.items.slice(0, levelInfo[level].count);
}

export function stripArabic(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[\sـ]/g, '')
    .normalize('NFC');
}
