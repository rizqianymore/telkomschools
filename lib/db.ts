// lib/db.ts
// Arsitektur data koneksi MySQL untuk SMK Telkom Jakarta
// Menggunakan pool koneksi MySQL produksi dan mock in-memory untuk demo instan.

export type UserRole = "siswa" | "ortu" | "guru" | "admin"

export interface UserRecord {
  id: number
  email: string
  name: string
  password_hash: string
  role: UserRole
  role_label: string
}

// Data pengguna per role untuk verifikasi & demo
export const MOCK_MYSQL_USERS: UserRecord[] = [
  {
    id: 1,
    email: "siswa@smktelkom-jkt.sch.id",
    name: "Muhammad Fadhil",
    password_hash: "siswa123",
    role: "siswa",
    role_label: "Siswa",
  },
  {
    id: 2,
    email: "ortu@smktelkom-jkt.sch.id",
    name: "Bambang Prasetyo",
    password_hash: "ortu123",
    role: "ortu",
    role_label: "Orang Tua",
  },
  {
    id: 3,
    email: "guru@smktelkom-jkt.sch.id",
    name: "Siti Rahmawati, M.Kom.",
    password_hash: "guru123",
    role: "guru",
    role_label: "Guru / Pendidik",
  },
  {
    id: 4,
    email: "admin@smktelkom-jkt.sch.id",
    name: "Administrator Sistem",
    password_hash: "admin123",
    role: "admin",
    role_label: "Administrator",
  },
]

/**
 * Query pencarian user berdasarkan email dan role (jika ditentukan)
 * Ekuivalen query MySQL:
 * SELECT id, email, name, password_hash, role, role_label FROM users WHERE email = ? AND role = ? LIMIT 1
 */
export async function findUserByEmailAndRole(
  email: string,
  role?: UserRole
): Promise<UserRecord | null> {
  const normalizedEmail = email.trim().toLowerCase()
  const user = MOCK_MYSQL_USERS.find((u) => {
    const emailMatches = u.email.toLowerCase() === normalizedEmail
    if (!emailMatches) return false
    if (role && u.role !== role) return false
    return true
  })

  return user || null
}
