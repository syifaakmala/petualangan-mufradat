# Petualangan Mufradat

Website permainan edukasi kosakata bahasa Arab untuk anak-anak Indonesia. Proyek dibuat menggunakan **React + Vite** dan disiapkan agar dapat dijalankan secara lokal, diunggah ke GitHub, lalu di-deploy ke Vercel.

## Fitur yang tersedia

- Halaman pembuka bernuansa biru cerah dengan dua maskot anak Muslim.
- Pilihan level Mudah, Sedang, dan Sulit (semua level terbuka).
- Empat permainan: Memory Game, Word Search, Arrange The Letter, dan Catch Character.
- Sembilan tema: Buah-buahan, Hewan, Keluarga & Rumah, Sekolah & Kelas, Makanan & Minuman, Waktu & Hari, Angka 1–50, Profesi, dan Tempat Umum.
- Halaman pengenalan kosakata dengan gambar/ilustrasi, arti Indonesia, tulisan Arab berharakat, dan tombol audio.
- Word Search memakai timer per kosakata pada level sulit: 60 detik, petunjuk dan tambahan 30 detik, lalu tetap boleh mencoba tanpa tekanan waktu.
- Arrange The Letter menambahkan 0, 2, atau 4 huruf pengecoh sesuai level.
- Catch Character meminta pemain menangkap tiga gambar target pada setiap babak.
- Skor maksimal 10 poin per kosakata; penggunaan petunjuk pada Word Search memberi 7 poin. Kecepatan tidak mengurangi skor.
- Halaman hasil dengan skor 0–100, bintang, dan pilihan bermain lagi.
- Tata letak responsif untuk desktop dan ponsel.

## Menjalankan di komputer

Pastikan Node.js versi 18 atau lebih baru sudah terpasang.

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite (biasanya `http://localhost:5173`).

Untuk membuat build produksi:

```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist/`.

## Mengunggah ke GitHub

1. Ekstrak ZIP ini.
2. Buka folder `petualangan-mufradat` di terminal.
3. Buat repository baru yang kosong di GitHub dengan nama `petualangan-mufradat`.
4. Jalankan perintah berikut (ganti URL dengan URL repository milikmu):

```bash
git init
git add .
git commit -m "Initial Petualangan Mufradat website"
git branch -M main
git remote add origin https://github.com/USERNAME/petualangan-mufradat.git
git push -u origin main
```

## Deploy ke Vercel

1. Masuk ke https://vercel.com dan pilih **Add New → Project**.
2. Hubungkan akun GitHub jika belum terhubung.
3. Pilih repository `petualangan-mufradat`.
4. Pastikan pengaturan build berikut:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Tekan **Deploy**. Setelah selesai, Vercel memberikan URL website yang dapat dibagikan.

File `vercel.json` sudah disertakan untuk mendukung navigasi aplikasi satu halaman.

## Catatan penting untuk audio dan materi bahasa Arab

Versi ZIP ini menggunakan **Web Speech API** sebagai audio sementara. Suara Arab yang tersedia, kejernihan, dan ketepatan pelafalan bergantung pada browser serta perangkat pengguna. Audio ini belum dapat dianggap sebagai rekaman pengajar/penutur fasih.

Sebelum dipakai sebagai media pembelajaran final, mohon:

1. Periksa kembali seluruh padanan kosakata, harakat, dan konteksnya bersama dosen/guru bahasa Arab.
2. Rekam atau siapkan audio dari penutur/guru yang fasih agar makhraj dan pelafalan jelas untuk anak-anak.
3. Letakkan file MP3 di `public/audio/vocabulary/<topic-id>/<item-id>.mp3` dan efek suara di `public/audio/feedback/`.
4. Jika rekaman sudah siap, integrasikan file MP3 tersebut pada fungsi audio di `src/App.jsx` (fungsi `speak` / `AudioButton`) agar rekaman menjadi sumber utama, bukan suara otomatis browser.

## Catatan materi

Daftar bahasa Indonesia dan padanan Arab dalam proyek ini adalah **draf awal untuk prototipe**. Beberapa kata serapan, istilah profesi, ungkapan waktu, dan frasa yang terdiri dari beberapa kata perlu ditinjau ulang sebelum penilaian akademik atau publikasi. Data kosakata terpusat di `src/data.js`, sehingga koreksi cukup dilakukan di satu tempat dan otomatis digunakan oleh empat game.

## Struktur proyek

```text
petualangan-mufradat/
├── public/
│   ├── audio/
│   └── mascots/duo.svg
├── src/
│   ├── App.jsx
│   ├── data.js
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```
