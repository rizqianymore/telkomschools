// lib/db.ts
// Arsitektur data koneksi MySQL untuk SMK Telkom Jakarta
// Menggunakan pool koneksi MySQL produksi dan mock in-memory untuk demo instan.

export type UserRole = "siswa" | "ortu" | "guru" | "admin"

export interface UserRecord {
  id: number
  identifier: string // email / NIS / NIP
  email: string
  nis?: string
  nip?: string
  name: string
  password_hash: string
  role: UserRole
  role_label: string
}

// Data pengguna per role untuk verifikasi & demo
export const MOCK_MYSQL_USERS: UserRecord[] = [
  {
    id: 1,
    identifier: "siswa@smktelkom-jkt.sch.id",
    email: "siswa@smktelkom-jkt.sch.id",
    nis: "10214055",
    name: "Muhammad Fadhil",
    password_hash: "siswa123",
    role: "siswa",
    role_label: "Siswa",
  },
  {
    id: 2,
    identifier: "ortu@smktelkom-jkt.sch.id",
    email: "ortu@smktelkom-jkt.sch.id",
    name: "Bambang Prasetyo",
    password_hash: "ortu123",
    role: "ortu",
    role_label: "Orang Tua",
  },
  {
    id: 3,
    identifier: "guru@smktelkom-jkt.sch.id",
    email: "guru@smktelkom-jkt.sch.id",
    nip: "198504122010011002",
    name: "Siti Rahmawati, M.Kom.",
    password_hash: "guru123",
    role: "guru",
    role_label: "Guru / Pendidik",
  },
  {
    id: 4,
    identifier: "admin@smktelkom-jkt.sch.id",
    email: "admin@smktelkom-jkt.sch.id",
    name: "Administrator Sistem",
    password_hash: "admin123",
    role: "admin",
    role_label: "Administrator",
  },
]

/**
 * Otomatis mendeteksi role atau mencari user berdasarkan identifier:
 * - Siswa: NIS atau Email
 * - Guru: NIP atau Email
 * - Orang Tua: Email
 * - Admin: Email
 *
 * Query MySQL ekuivalen:
 * SELECT * FROM users
 * WHERE (email = ? OR nis = ? OR nip = ?)
 * LIMIT 1;
 */
export async function findUserByIdentifier(
  identifier: string,
  explicitRole?: UserRole
): Promise<UserRecord | null> {
  const cleanId = identifier.trim().toLowerCase()

  const user = MOCK_MYSQL_USERS.find((u) => {
    // Cek kecocokan identifier
    const emailMatches = u.email.toLowerCase() === cleanId
    const nisMatches = u.nis && u.nis.toLowerCase() === cleanId
    const nipMatches = u.nip && u.nip.toLowerCase() === cleanId

    const matched = emailMatches || nisMatches || nipMatches
    if (!matched) return false

    // Jika user memilih tab role secara manual, pastikan role sesuai
    if (explicitRole && u.role !== explicitRole) return false

    return true
  })

  return user || null
}
