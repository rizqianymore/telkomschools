# SMK Telkom Jakarta

Website resmi dan portal akademik terpadu SMK Telkom Jakarta dibangun menggunakan Next.js 16 (App Router), React 19, Tailwind CSS v4, dan shadcn/ui.

---

## Akun Pengujian Login (Demo Credentials)

Portal login terletak di rute `/login`. Sistem telah dilengkapi dengan pemisahan peran (*role-based authentication*) dan pendeteksian otomatis identifier:

| Peran (Role) | Identitas Login (NIS / NIP / Email) | Kata Sandi | Keterangan |
| :--- | :--- | :--- | :--- |
| **Siswa** | NIS: `10214055` <br>atau Email: `siswa@smktelkom-jkt.sch.id` | `siswa123` | Akses nilai, presensi, & tugas digital siswa |
| **Orang Tua** | Email: `ortu@smktelkom-jkt.sch.id` | `ortu123` | Monitoring kehadiran & perkembangan belajar anak |
| **Guru** | NIP: `198504122010011002` <br>atau Email: `guru@smktelkom-jkt.sch.id` | `guru123` | Manajemen kelas, input nilai, & modul pelajaran |
| **Admin** | Email: `admin@smktelkom-jkt.sch.id` | `admin123` | Pengelolaan data master & administrasi PPDB |

> **Fitur Deteksi Otomatis:**
> Jika Anda mengetikkan nomor NIS (angka 8 digit) atau NIP (angka 18 digit), sistem formulir akan secara otomatis beralih ke tab peran **Siswa** atau **Guru**.

---

## Arsitektur Database (MySQL Logic)

Logika database dirancang di [`lib/db.ts`](file:///home/fbi/website/telkomschools/lib/db.ts) dan dihubungkan ke API Route [`app/api/auth/login/route.ts`](file:///home/fbi/website/telkomschools/app/api/auth/login/route.ts):

- **Query Pattern**:
  ```sql
  SELECT id, email, nis, nip, name, password_hash, role, role_label
  FROM users
  WHERE (email = ? OR nis = ? OR nip = ?)
  LIMIT 1;
  ```
- **Koneksi Produksi (Opsional)**:
  Bila menghubungkan ke server MySQL sungguhan, pasang dependensi `mysql2`:
  ```bash
  npm install mysql2
  ```
  Dan konfigurasikan variabel environment di file `.env`:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=password_anda
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
