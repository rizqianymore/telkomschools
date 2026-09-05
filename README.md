# SMK Telkom Jakarta — Portal Akademik & PPDB

Website resmi dan sistem informasi manajemen sekolah terpadu SMK Telkom Jakarta berbasis **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, dan **MySQL**.

---

## 🔑 Akun Demo (Login)

Halaman login: [`/login`](file:///home/fbi/website/telkomschools/app/login/page.tsx) (Bisa login pakai Email, NIS, atau NIP).

| Peran | Login (NIS / NIP / Email) | Password | Akses |
| :--- | :--- | :--- | :--- |
| **Siswa & Wali Murid** | `10214055` / `siswa@smktelkom-jkt.sch.id` | `password123` | Portal Siswa (Nilai, Presensi, SPP, Status PPDB) |
| **Guru** | `198504122010011002` / `guru@smktelkom-jkt.sch.id` | `password123` | Dashboard Guru (Input Nilai, Presensi, Rombel Kelas) |
| **Staff Admin** | `staff@smktelkom-jkt.sch.id` | `password123` | Dashboard Staff (Verifikasi PPDB, Konfirmasi SPP, Inbox) |

---

## 🚀 Cara Menjalankan

### 1. Install Dependensi
```bash
npm install
```

### 2. Environment (`.env.local`)
Buat file `.env.local` di root:
```env
# Database MySQL
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password_anda
DB_NAME=smk_telkom_jkt

# Keamanan Sesi
SESSION_SECRET=telkom_secret_key_2026

# SMTP Notifikasi Email (Opsional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=email_anda@gmail.com
SMTP_PASS=app_password_anda
```

### 3. Setup Database MySQL
Import schema dari file [`schema.sql`](file:///home/fbi/website/telkomschools/schema.sql):
```bash
# Buat database & import schema
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS smk_telkom_jkt;"
mysql -u root -p smk_telkom_jkt < schema.sql
```

### 4. Jalankan Server
```bash
npm run dev
```
Buka di browser: [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Tabel Database (`smk_telkom_jkt`)

Sesuai dengan [`schema.sql`](file:///home/fbi/website/telkomschools/schema.sql):

1. **`users`** — Akun pengguna (3 role: `siswa`, `guru`, `staff`), NIS, NIP, hash password, dan kontak wali.
2. **`ppdb_registrations`** — Data pendaftaran calon siswa, jalur masuk, jurusan (RPL, TKJ, DKV, TJA), data orang tua, dan status seleksi.
3. **`academic_classes`** — Master rombongan belajar / kelas, wali kelas, dan kuota.
4. **`academic_grades`** — Penilaian siswa (tugas, UTS, UAS, nilai akhir, predikat rapor).
5. **`academic_attendance`** — Presensi & rekapitulasi kehadiran (hadir, izin, sakit, alpa).
6. **`academic_bills`** — Tagihan SPP & keuangan (lunas, belum bayar, menunggu konfirmasi).
7. **`quiz_questions`** & **`quiz_submissions`** — Soal dan rekap hasil kuis minat kejuruan.
8. **`contact_messages`** — Pesan konsultasi dari formulir kontak.
9. **`newsletter_subscribers`** — Data langganan info sekolah.

---

## 🛠️ Perintah Lainnya

```bash
# Cek linting
npm run lint

# Cek tipe TypeScript
npx tsc --noEmit

# Build production
npm run build
```
