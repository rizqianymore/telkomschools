# SMK Telkom Jakarta — Portal Akademik & Layanan Informasi Terpadu

Website resmi dan sistem informasi manajemen sekolah terpadu SMK Telkom Jakarta. Dibangun dengan standar industri modern memanfaatkan **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, dan **shadcn/ui Sidebar Component System**.

---

## 🚀 Fitur Utama & Arsitektur Terpadu 1:1

Aplikasi ini mengintegrasikan seluruh proses operasional sekolah dalam alur tersinkronisasi (*end-to-end*):

1. **Sistem Autentikasi Fleksibel & Keamanan Berlapis (OWASP Standard)**:
   - Login otomatis dengan logika pencarian OR: `Email`, `NIS`, atau `NIP` tanpa perlu memilih peran manual.
   - Hashing sandi menggunakan algoritma **Scrypt + Cryptographic Salt**.
   - Proteksi sesi berbasis HTTP-only cookies, proteksi IDOR pada seluruh endpoint data privat, dan Rate Limiting terdistribusi.

2. **Penerimaan Peserta Didik Baru (PPDB) Terpadu**:
   - Pendaftaran online multi-step (data calon siswa, asal sekolah, dan prioritas peminatan kejuruan: RPL, TKJ, DKV, TJA).
   - Registrasi otomatis menghasilkan nomor resmi `PPDB-2026-XXXX`, membuat akun portal siswa, serta menerbitkan berkas dossier akademik awal.
   - Verifikasi berkas oleh Staff Admin: kelulusan seleksi (`lulus_seleksi`) otomatis menempatkan siswa ke rombel kelas aktif ([lib/academic-data.ts](file:///home/fbi/website/telkomschools/lib/academic-data.ts)) dan menerbitkan tagihan daftar ulang.

3. **Portal Siswa & Wali Murid (Terpadu ala shadcn/ui Sidebar)**:
   - Sidebar navigasi SPA cepat berbasis shadcn/ui tanpa full-page reload.
   - **Ringkasan Akademik**: Banner sambutan personal, metrik kehadiran, rata-rata nilai, dan status tagihan aktif.
   - **Lembar Nilai & Rapor**: Transkrip tugas, UTS, UAS, KKM, dan predikat perolehan (A/B/C/D).
   - **Presensi & Kehadiran**: Rekapitulasi kehadiran harian dan log absensi kelas terperinci.
   - **Keuangan & Tagihan SPP**: Riwayat invoice, pembayaran Virtual Account / Kasir, dan status verifikasi real-time.
   - **Data Orang Tua / Wali**: Sinkronisasi biodata ayah, ibu, dan kontak darurat pemantauan.

4. **Portal Guru (Pendidik & Pembimbing)**:
   - Pengambilan daftar siswa aktif secara dinamis (`/api/academic/students`).
   - Input nilai mata pelajaran dan pencatatan presensi siswa harian secara langsung.
   - Manajemen bank soal kuis minat kejuruan dan rekap hasil pengerjaan kuis siswa.
   - Pembentukan dan administrasi rombel kelas kejuruan baru.

5. **Portal Staff Administrator**:
   - Verifikasi pendaftaran PPDB dan pembaruan status seleksi berfasilitas notifikasi email otomatis.
   - Verifikasi keuangan, konfirmasi pelunasan SPP/daftar ulang, dan penerbitan bukti kwitansi sah.
   - Manajemen pesan masuk dari formulir konsultasi publik.
   - Pengelolaan akun pengguna dan pembuatan akun pendidik/staff baru.

6. **Quiz Minat & Bakat Kejuruan**:
   - Algoritma rekomendasi peminatan 4 jurusan (RPL, TKJ, DKV, TJA) berbasis bobot jawaban psikometri.
   - Tersambung otomatis dengan sesi login siswa dan dapat dipantau oleh guru pembimbing.

7. **Asisten Virtual CS Berbasis AI**:
   - Widget layanan informasi interaktif yang siap menjawab pertanyaan seputar PPDB, kurikulum, dan fasilitas sekolah 24/7.

---

## 🔑 Akun Demo Pengujian (Demo Credentials)

Gunakan akun berikut untuk menguji seluruh hak akses peran di halaman [`/login`](file:///home/fbi/website/telkomschools/app/login/page.tsx):

| Peran (Role) | Identitas Login (NIS / NIP / Email) | Kata Sandi | Deskripsi Akses |
| :--- | :--- | :--- | :--- |
| **Siswa & Wali Murid** | `10214055` <br>atau `siswa@smktelkom-jkt.sch.id` | `password123` | Akses Portal Siswa: Nilai, Presensi, Tagihan SPP, Status PPDB, & Profil Wali |
| **Guru Pengampu** | `198504122010011002` <br>atau `guru@smktelkom-jkt.sch.id` | `password123` | Akses Dashboard Guru: Input Nilai, Absensi Siswa, Rekap Kuis, & Master Kelas |
| **Staff Administrator** | `staff@smktelkom-jkt.sch.id` | `password123` | Akses Dashboard Staff: Verifikasi PPDB, Konfirmasi SPP, Inbox Pesan, & User |

---

## 🛠️ Panduan Instalasi & Menjalankan Lokal

### 1. Kebutuhan Sistem
- **Node.js**: Versi `18.18.0` atau yang lebih baru (disarankan Node.js 20+ LTS).
- **npm**, **pnpm**, atau **yarn**.
- **MySQL / MariaDB** (opsional, sistem telah memiliki in-memory fallback otomatis untuk demo instan).

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment (`.env.local`)
Salin atau buat file `.env.local` di root proyek:
```env
# Database MySQL (Opsional untuk integrasi MySQL langsung)
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password_mysql_anda
DB_NAME=smk_telkom_jkt

# Keamanan Sesi & Klien AI
SESSION_SECRET=telkom_super_secret_jwt_key_production_2026
NEXT_PUBLIC_AI_CLIENT_SIGNATURE=telkomschools-ai-v1-production

# Layanan Pengiriman Email SMTP (Opsional / Gmail App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=notifikasi.smktelkom@gmail.com
SMTP_PASS=app_password_smtp_anda
```

### 4. Menjalankan Server Development
```bash
npm run dev
```
Akses aplikasi melalui peramban di [http://localhost:3000](http://localhost:3000).

---

## 🗄️ Struktur Database MySQL (`schema.sql`)

Struktur skema relasional produksi beserta data awalan tersedia lengkap pada file [`schema.sql`](file:///home/fbi/website/telkomschools/schema.sql).

Untuk mengimpor skema ke database MySQL lokal:
```bash
# 1. Buat database
sudo mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS smk_telkom_jkt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Impor struktur tabel dan data seed
sudo mysql -u root -p smk_telkom_jkt < schema.sql
```

Tabel-tabel utama yang terbuat:
- `users`: Data kredensial pengguna, role, profil ortu, dan penempatan kelas.
- `ppdb_registrations`: Data formulir PPDB, pilihan jurusan, dan status seleksi.
- `academic_classes`: Data master rombel kelas dan guru wali kelas.
- `academic_grades`: Catatan nilai tugas, UTS, UAS, dan predikat akhir rapor.
- `academic_attendance`: Catatan presensi dan log kehadiran harian.
- `academic_bills`: Invoice keuangan, SPP, dan status verifikasi kasir.
- `contact_messages`: Pesan konsultasi dan pertanyaan pengunjung website.
- `quiz_submissions`: Log hasil kalkulasi tes minat kejuruan.
- `newsletters`: Berlangganan info warta berkala sekolah.

---

## 🧪 Pengujian & Verifikasi Kualitas Kode

Proyek ini menerapkan standar mutu tinggi dengan zero-warning linting dan strict type checking:

```bash
# Pemeriksaan Linting (ESLint + Next.js core-web-vitals)
npm run lint

# Verifikasi Tipe Data TypeScript
npx tsc --noEmit

# Validasi Kompilasi Produksi
npm run build
```

---

## 🚢 Panduan Deployment

### 1. PM2 (Virtual Private Server / Ubuntu)
```bash
npm run build
pm2 start npm --name "telkomschools" -- start
pm2 save
```

### 2. Docker Compose
```bash
docker compose up -d --build
```

---

© 2026 SMK Telkom Jakarta. Dikembangkan dengan cinta untuk kemajuan pendidikan kejuruan teknologi informasi Indonesia.

