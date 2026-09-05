# SMK Telkom Jakarta

Website resmi dan portal akademik terpadu SMK Telkom Jakarta dibangun menggunakan Next.js 16 (App Router), React 19, Tailwind CSS v4, dan shadcn/ui.

---

## Akun Pengujian Login (Demo Credentials)

Portal login terletak di rute `/login`. Sistem menggunakan logika pencarian OR otomatis (`NIS / NIP / Email`):

| Peran (Role) | Identitas Login (NIS / NIP / Email) | Kata Sandi | Keterangan |
| :--- | :--- | :--- | :--- |
| **Siswa & Wali Murid** (Terpadu) | NIS: `10214055` <br>atau `siswa@smktelkom-jkt.sch.id` | `password123` | Portal terpadu siswa & pemantauan ortu (PPDB, rapor, presensi, invoice SPP & biodata ortu) |
| **Guru** | NIP: `198504122010011002` <br>atau `guru@smktelkom-jkt.sch.id` | `password123` | Manajemen rombel kelas, input nilai rapor, absensi harian, & kuis jurusan |
| **Staff Admin** | Email: `staff@smktelkom-jkt.sch.id` | `password123` | Administrasi sekolah, verifikasi PPDB, konfirmasi SPP, pesan konsultasi & akun user |

---

## Panduan Instalasi & Import Database MySQL

File struktur tabel dan seed data resmi tersedia di [`schema.sql`](file:///home/fbi/website/telkomschools/schema.sql).

### Langkah 1: Buat Database di MySQL
Masuk ke MySQL terminal:
```bash
sudo mysql -u root -p
```
Jalankan perintah SQL berikut:
```sql
CREATE DATABASE IF NOT EXISTS smk_telkom_jkt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Langkah 2: Import Skema & Data Awal (`schema.sql`)
Jalankan command ini langsung di terminal bash proyek:
```bash
sudo mysql -u root -p smk_telkom_jkt < schema.sql
```
> Masukkan password root MySQL Anda saat diminta. Command ini akan otomatis membuat tabel-tabel (`users`, `ppdb_registrations`, `academic_classes`, `academic_grades`, `academic_attendance`, `academic_bills`, `contact_messages`, `quiz_submissions`, `newsletters`) serta mengisi data seed awal.

### Langkah 3: Konfigurasi Environment (`.env.local`)
Sesuaikan file `.env.local`:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password_mysql_anda
DB_NAME=smk_telkom_jkt
```

---

## Panduan Development

Jalankan server development lokal:

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

---

## Konfigurasi MCP (Model Context Protocol)

File konfigurasi [`opencode.json`](file:///home/fbi/website/telkomschools/opencode.json) telah dikonfigurasi untuk mendukung:
- **shadcn**: Menambahkan dan mengelola komponen UI resmi.
- **context7**: Mengambil dokumentasi resmi library secara real-time.
- **playwright**: Menjalankan pengujian fungsional browser dan inspeksi visual.

---

## Deployment VPS

### 1. Menggunakan Script Deploy
```bash
chmod +x deploy/deploy.sh
./deploy/deploy.sh
```

### 2. Manual dengan Docker Compose
```bash
docker compose up -d --build
```

### 3. Manual dengan PM2
```bash
npm run build
pm2 start ecosystem.config.js
pm2 save
```
