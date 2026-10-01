# Antigravity Agent Guidelines — Proyek Pemrograman Web 1

## 1. Konteks Proyek & Akademik
- **Mata Kuliah:** Pemrograman Web 1 (S-1 Teknik Informatika, Universitas Pamulang).
- **Proyek Saat Ini:** Website Katalog Film "SINEMA" (Katalog multi-halaman interaktif).
- **Struktur File Saat Ini:**
  - `index.html`: Beranda, hero trailer slider (CSS scroll-snap), trending carousel, dan paket langganan.
  - `film.html`: Detail katalog film lengkap (video trailer, poster, spesifikasi, tabel rekomendasi serupa).
  - `profil.html`: Informasi proyek dan identitas pembuat.
  - `kontak.html`: Detail kontak pembuat dan alur formulir berlangganan.
  - `style.css`: Stylesheet global (tema dark mode, palet warna sinematik Netflix-style).
  - Folder aset lokal: `poster/` (gambar poster) dan `video/` (trailer MP4).

## 2. Standar Teknis & Kurikulum Modul Kuliah
Setiap modifikasi atau penambahan fitur baru WAJIB merujuk pada standar modul perkuliahan:
1. **HTML & Tata Letak (Pertemuan 1 - 10):**
   - Gunakan kombinasi struktur `<table>` dan tag semantik HTML5 (`<article>`, `<section>`, `<video>`, `<audio>`) sesuai kaidah materi tata letak tabel dan multimedia.
   - Pertahankan konsistensi atribut aksesibilitas (`alt`, `aria-label`, `title`).
   - Hyperlink (`<a>`) harus selalu valid, baik relatif lokal (`#id`, file `.html` lain) maupun absolut (`target="_blank" rel="noopener"`).
2. **CSS & Styling (Pertemuan 11 - 13):**
   - Tetap terpusat di `style.css` (metode *linking* via `<link rel="stylesheet">`). Hindari inline-style berlebihan kecuali nilai dinamis CSS variables.
   - Pertahankan variabel warna dasar di `:root` (`--bg`, `--card`, `--red`, `--text`, dll.).
   - Responsif: pastikan setiap perubahan tampilan tetap rapi di breakpoint mobile (`@media (max-width: 700px)`).
3. **JavaScript (Pertemuan 14 - 19) [Jika Ditambahkan]:**
   - Jika diminta menambahkan interaktivitas, gunakan JavaScript murni (Vanilla JS) tanpa library/framework pihak ketiga (jangan gunakan React, Vue, jQuery).
   - Fokus pada manipulasi DOM standar, Event Listener (`onclick`, `onchange`), Dialog Box (`alert`, `prompt`, `confirm`), Validasi Form, dan Array/Object data JSON.

## 3. Workflow & Operational Rules untuk Antigravity
1. **Plan First:**
   - Sebelum mengubah atau membuat file HTML/CSS baru, berikan ringkasan rencana perubahan dan jelaskan tag/logika apa yang akan diterapkan.
2. **Autonomous Validation:**
   - Setelah mengedit HTML, pastikan semua penutup tag (`</table>`, `</div>`, `</form>`) berpasangan dengan benar (valid DOM hierarchy).
   - Pastikan path berkas lokal (seperti `poster/...` dan `video/...`) tetap relatif dan konsisten.
   - Jangan pernah menghapus navigasi menu (`.menu`) atau footer (`.foot`) yang sudah seragam di semua halaman.
3. **Minimal Diff & Clean Code:**
   - Modifikasi hanya elemen yang diminta tanpa merusak layout responsif tabel/grid yang sudah ada.
   - Gunakan komentar penjelas yang rapi dalam Bahasa Indonesia untuk menandai bagian tugas/materi pertemuan tertentu.

## 4. Guardrails (Strict Do's & Don'ts)
- **DILARANG:** Memasukkan framework CSS eksternal (seperti Tailwind CSS, Bootstrap) atau framework JS (React, Angular). Semua tugas harus berupa HTML, CSS murni, dan Vanilla JS sesuai kurikulum UNPAM.
- **DILARANG:** Mengubah identitas pembuat (Fasha Fahlapi / Universitas Pamulang) pada footer dan halaman profil kecuali diinstruksikan.
- **WAJIB:** Menjaga format tautan navigasi antar-halaman (`index.html`, `film.html`, `profil.html`, `kontak.html`) tetap sinkron di seluruh file.