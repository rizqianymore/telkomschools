// lib/ppdb-data.ts
// Skema data dan manajemen master pendaftaran PPDB SMK Telkom Jakarta

export type JalurPendaftaran = "prestasi" | "reguler_1" | "reguler_2" | "kemitraan"
export type StatusPendaftaran = "menunggu_verifikasi" | "terverifikasi" | "lulus_seleksi" | "tidak_lulus"
export type PilihanJurusan = "RPL" | "TKJ" | "DKV" | "TJA"

export interface PendaftarPPDB {
  id: string
  no_pendaftaran: string // Format: PPDB-2026-XXXX
  nisn: string
  nama_lengkap: string
  jenis_kelamin: "L" | "P"
  asal_sekolah: string
  email: string
  no_whatsapp: string
  jalur: JalurPendaftaran
  jurusan_pilihan_1: PilihanJurusan
  jurusan_pilihan_2?: PilihanJurusan
  nilai_rata_rapor: number
  status: StatusPendaftaran
  catatan_petugas?: string
  created_at: string
}

// Data inisial pendaftar untuk simulasi PPDB aktif
export const PPDB_REGISTRATIONS: PendaftarPPDB[] = [
  {
    id: "reg_01",
    no_pendaftaran: "PPDB-2026-0001",
    nisn: "0078129031",
    nama_lengkap: "Rayhan Pratama",
    jenis_kelamin: "L",
    asal_sekolah: "SMP Negeri 111 Jakarta",
    email: "rayhan.p@gmail.com",
    no_whatsapp: "081299887711",
    jalur: "prestasi",
    jurusan_pilihan_1: "RPL",
    jurusan_pilihan_2: "DKV",
    nilai_rata_rapor: 89.5,
    status: "terverifikasi",
    catatan_petugas: "Berkas rapor dan sertifikat olimpiade matematika lengkap.",
    created_at: "2026-09-01T08:30:00Z",
  },
  {
    id: "reg_02",
    no_pendaftaran: "PPDB-2026-0002",
    nisn: "0081234567",
    nama_lengkap: "Alya Putri Salsabila",
    jenis_kelamin: "P",
    asal_sekolah: "SMP Telkom Purwokerto",
    email: "alya.salsa@gmail.com",
    no_whatsapp: "085712345678",
    jalur: "reguler_1",
    jurusan_pilihan_1: "DKV",
    jurusan_pilihan_2: "RPL",
    nilai_rata_rapor: 86.2,
    status: "menunggu_verifikasi",
    created_at: "2026-09-02T10:15:00Z",
  },
  {
    id: "reg_03",
    no_pendaftaran: "PPDB-2026-0003",
    nisn: "0075678901",
    nama_lengkap: "Dimas Aditya Wardhana",
    jenis_kelamin: "L",
    asal_sekolah: "SMP Negeri 45 Jakarta",
    email: "dimas.wardhana@yahoo.com",
    no_whatsapp: "081388776655",
    jalur: "reguler_1",
    jurusan_pilihan_1: "TKJ",
    jurusan_pilihan_2: "TJA",
    nilai_rata_rapor: 84.8,
    status: "lulus_seleksi",
    catatan_petugas: "Lulus seleksi wawancara dan tes kompetensi dasar.",
    created_at: "2026-09-03T14:20:00Z",
  },
]

/**
 * Generate nomor pendaftaran unik: PPDB-2026-XXXX
 */
function generateNoPendaftaran(): string {
  const count = PPDB_REGISTRATIONS.length + 1
  const numStr = count.toString().padStart(4, "0")
  return `PPDB-2026-${numStr}`
}

/**
 * Helper CRUD & Query PPDB
 */
export function getAllPendaftar(): PendaftarPPDB[] {
  return [...PPDB_REGISTRATIONS].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export function findPendaftarByNoOrNisn(query: string): PendaftarPPDB | null {
  const clean = query.trim().toUpperCase()
  return (
    PPDB_REGISTRATIONS.find(
      (p) =>
        p.no_pendaftaran.toUpperCase() === clean ||
        p.nisn === clean ||
        p.email.toUpperCase() === clean
    ) || null
  )
}

export function createPendaftaran(data: {
  nisn: string
  nama_lengkap: string
  jenis_kelamin: "L" | "P"
  asal_sekolah: string
  email: string
  no_whatsapp: string
  jalur: JalurPendaftaran
  jurusan_pilihan_1: PilihanJurusan
  jurusan_pilihan_2?: PilihanJurusan
  nilai_rata_rapor: number
}): PendaftarPPDB {
  const newRecord: PendaftarPPDB = {
    id: `reg_${Date.now()}`,
    no_pendaftaran: generateNoPendaftaran(),
    ...data,
    status: "menunggu_verifikasi",
    created_at: new Date().toISOString(),
  }

  PPDB_REGISTRATIONS.unshift(newRecord)
  return newRecord
}

export function updateStatusPendaftar(
  no_pendaftaran: string,
  status: StatusPendaftaran,
  catatan?: string
): PendaftarPPDB | null {
  const idx = PPDB_REGISTRATIONS.findIndex((p) => p.no_pendaftaran === no_pendaftaran)
  if (idx === -1) return null

  PPDB_REGISTRATIONS[idx].status = status
  if (catatan !== undefined) {
    PPDB_REGISTRATIONS[idx].catatan_petugas = catatan
  }

  return PPDB_REGISTRATIONS[idx]
}
