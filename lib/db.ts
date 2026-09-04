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

// Data pengguna untuk verifikasi & demo
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
    role_label: "Guru",
  },
  {
    id: 4,
    identifier: "admin@smktelkom-jkt.sch.id",
    email: "admin@smktelkom-jkt.sch.id",
    name: "Administrator Sistem",
    password_hash: "admin123",
    role: "admin",
    role_label: "Admin",
  },
]

/**
 * Mencari user di database MySQL secara fleksibel:
 * Logic OR: email = ? OR nis = ? OR nip = ?
 * Otomatis mendeteksi role tanpa perlu memilih peran secara manual.
 *
 * Query MySQL ekuivalen:
 * SELECT id, email, nis, nip, name, password_hash, role, role_label
 * FROM users
 * WHERE (email = ? OR nis = ? OR nip = ?)
 * LIMIT 1;
 */
export async function findUserByAnyIdentifier(
  identifier: string
): Promise<UserRecord | null> {
  const cleanId = identifier.trim().toLowerCase()

  const user = MOCK_MYSQL_USERS.find((u) => {
    const emailMatches = u.email.toLowerCase() === cleanId
    const nisMatches = u.nis ? u.nis.toLowerCase() === cleanId : false
    const nipMatches = u.nip ? u.nip.toLowerCase() === cleanId : false

    return emailMatches || nisMatches || nipMatches
  })

  return user || null
}
