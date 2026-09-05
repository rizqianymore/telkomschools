-- ==============================================================================
-- SKEMA DATABASE RESMI: SMK TELKOM JAKARTA (smk_telkom_jkt)
-- 3 ROLE RESMI: SISWA & WALI (siswa), GURU (guru), STAFF ADMIN (staff)
-- Karakter: utf8mb4_unicode_ci | Engine: InnoDB
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `smk_telkom_jkt` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `smk_telkom_jkt`;

-- 1. Tabel Master Pengguna & Autentikasi (Siswa & Ortu menjadi satu kesatuan akun terpadu)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `identifier` VARCHAR(150) NOT NULL UNIQUE,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `nis` VARCHAR(30) NULL UNIQUE,
  `nip` VARCHAR(30) NULL UNIQUE,
  `name` VARCHAR(120) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('siswa', 'guru', 'staff') NOT NULL DEFAULT 'siswa',
  `role_label` VARCHAR(50) NOT NULL DEFAULT 'Siswa & Wali',
  -- Data Terpadu Orang Tua / Wali Pemantau
  `parent_name` VARCHAR(120) NULL,
  `parent_phone` VARCHAR(30) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB;

-- 2. Tabel Pendaftar Calon Siswa Baru (PPDB Online) Lengkap dengan Biodata Orang Tua
CREATE TABLE IF NOT EXISTS `ppdb_registrations` (
  `id` VARCHAR(50) PRIMARY KEY,
  `no_pendaftaran` VARCHAR(30) NOT NULL UNIQUE,
  `nisn` VARCHAR(15) NOT NULL UNIQUE,
  `nama_lengkap` VARCHAR(120) NOT NULL,
  `jenis_kelamin` ENUM('L', 'P') NOT NULL,
  `asal_sekolah` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `no_whatsapp` VARCHAR(30) NOT NULL,
  `jalur` ENUM('prestasi', 'reguler_1', 'reguler_2', 'kemitraan') NOT NULL DEFAULT 'reguler_1',
  `jurusan_pilihan_1` ENUM('RPL', 'TKJ', 'DKV', 'TJA') NOT NULL,
  `jurusan_pilihan_2` ENUM('RPL', 'TKJ', 'DKV', 'TJA') NULL,
  `nilai_rata_rapor` DECIMAL(5,2) NOT NULL DEFAULT 80.00,
  -- Data Lengkap Orang Tua / Wali Siswa
  `nama_ayah` VARCHAR(120) NULL,
  `pekerjaan_ayah` VARCHAR(100) NULL,
  `nama_ibu` VARCHAR(120) NULL,
  `pekerjaan_ibu` VARCHAR(100) NULL,
  `nama_wali` VARCHAR(120) NULL,
  `no_hp_ortu` VARCHAR(30) NULL,
  `alamat_ortu` TEXT NULL,
  `status` ENUM('menunggu_verifikasi', 'terverifikasi', 'lulus_seleksi', 'tidak_lulus') NOT NULL DEFAULT 'menunggu_verifikasi',
  `catatan_petugas` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Tabel Rombongan Belajar (Kelas)
CREATE TABLE IF NOT EXISTS `academic_classes` (
  `id` VARCHAR(50) PRIMARY KEY,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(100) NOT NULL,
  `major` ENUM('RPL', 'TKJ', 'DKV', 'TJA') NOT NULL,
  `wali_kelas_id` INT NULL,
  `wali_kelas_name` VARCHAR(120) NOT NULL,
  `room` VARCHAR(50) NOT NULL,
  `total_students` INT NOT NULL DEFAULT 36,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Tabel Penilaian & Nilai Rapor Siswa
CREATE TABLE IF NOT EXISTS `academic_grades` (
  `id` VARCHAR(50) PRIMARY KEY,
  `student_id` INT NOT NULL,
  `nis` VARCHAR(30) NOT NULL,
  `subject_code` VARCHAR(30) NOT NULL,
  `subject_name` VARCHAR(100) NOT NULL,
  `kkm` INT NOT NULL DEFAULT 75,
  `nilai_tugas` INT NOT NULL DEFAULT 0,
  `nilai_uts` INT NOT NULL DEFAULT 0,
  `nilai_uas` INT NOT NULL DEFAULT 0,
  `nilai_akhir` INT NOT NULL DEFAULT 0,
  `grade` ENUM('A', 'B', 'C', 'D') NOT NULL DEFAULT 'B',
  `semester` VARCHAR(50) NOT NULL DEFAULT 'Ganjil 2026/2027',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_grades_student` (`student_id`),
  FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Tabel Presensi & Kehadiran Siswa
CREATE TABLE IF NOT EXISTS `academic_attendance` (
  `id` VARCHAR(50) PRIMARY KEY,
  `student_id` INT NOT NULL,
  `nis` VARCHAR(30) NOT NULL,
  `date` DATE NOT NULL,
  `status` ENUM('hadir', 'izin', 'sakit', 'alpa') NOT NULL DEFAULT 'hadir',
  `keterangan` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_attendance_student` (`student_id`),
  FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Tabel Tagihan SPP & Keuangan Sekolah
CREATE TABLE IF NOT EXISTS `academic_bills` (
  `id` VARCHAR(50) PRIMARY KEY,
  `student_id` INT NOT NULL,
  `nis` VARCHAR(30) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `amount` DECIMAL(12,2) NOT NULL,
  `due_date` DATE NOT NULL,
  `status` ENUM('lunas', 'belum_bayar', 'menunggu_konfirmasi') NOT NULL DEFAULT 'belum_bayar',
  `paid_at` DATETIME NULL,
  `payment_method` VARCHAR(100) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_bills_student` (`student_id`),
  FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. Tabel Pertanyaan Kuis Penjurusan
CREATE TABLE IF NOT EXISTS `quiz_questions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `question` TEXT NOT NULL,
  `options_json` JSON NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 8. Tabel Log Hasil Pengerjaan Kuis
CREATE TABLE IF NOT EXISTS `quiz_submissions` (
  `id` VARCHAR(50) PRIMARY KEY,
  `student_name` VARCHAR(120) NOT NULL,
  `primary_major` ENUM('RPL', 'TKJ', 'DKV', 'TJA') NOT NULL,
  `score` INT NOT NULL,
  `percentage` INT NOT NULL,
  `all_scores_json` JSON NOT NULL,
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 9. Tabel Tiket Pesan Layanan Kontak & Konsultasi
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(120) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `major_interest` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('unread', 'read', 'replied') NOT NULL DEFAULT 'unread',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 10. Tabel Langganan Buletin Berita (Newsletter)
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` VARCHAR(50) PRIMARY KEY,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `status` ENUM('active', 'unsubscribed') NOT NULL DEFAULT 'active',
  `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==============================================================================
-- DATA AWAL PENGGUNA (3 ROLE: SISWA & WALI, GURU, STAFF)
-- Password Hash Menggunakan Standar Scrypt OWASP
-- ==============================================================================

INSERT INTO `users` (`id`, `identifier`, `email`, `nis`, `nip`, `name`, `password_hash`, `role`, `role_label`, `parent_name`, `parent_phone`) VALUES
(1, 'siswa@smktelkom-jkt.sch.id', 'siswa@smktelkom-jkt.sch.id', '10214055', NULL, 'Muhammad Fadhil', '765b5154f2f5826d476706314a6641ad:10cab641d7b697817a11022ea96ce8bebb690f73498203a0939c1385c80aea831f8c800e808829a49e21fa9d025a405bbf7fe9fc08532b46cecdf718bd3319fe', 'siswa', 'Siswa & Wali Murid', 'Bambang Prasetyo', '081288990011'),
(2, 'guru@smktelkom-jkt.sch.id', 'guru@smktelkom-jkt.sch.id', NULL, '198504122010011002', 'Siti Rahmawati, M.Kom.', 'f3c6380ead0f513f541bbdf59bf80e56:340d6fed528ea176a8b3bee48c6374c7ec6d3f21a39376523b0513d0ac07d72c88a56d137ba9ac9cb7684b1dba47e3b8a8787ff1f1ba8a87ffd76861d2543bef', 'guru', 'Guru', NULL, NULL),
(3, 'staff@smktelkom-jkt.sch.id', 'staff@smktelkom-jkt.sch.id', NULL, NULL, 'Staff Administrasi & IT', '3e514c3b590c0a452e30c4b8e4e7d2fb:058c4602fe7f7eb09e7316757efa5b1a4813548daf5c85db63c899893c37d7954b730ce24a14010636e9f28dca333733823f2ec3940beaddb12eb11c03c50238', 'staff', 'Staff Administrator', NULL, NULL)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
