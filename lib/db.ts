// lib/db.ts
// Arsitektur data koneksi MySQL untuk SMK Telkom Jakarta
// Menggunakan pool koneksi MySQL produksi dan mock in-memory untuk demo instan.

export type UserRole = "siswa" | "guru" | "staff"

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
  parentName?: string
  parentPhone?: string
  ppdbNo?: string
  classCode?: string
  major?: string
}

// Data pengguna untuk verifikasi & demo dengan hash scrypt standar OWASP (3 Role Resmi)
export const MOCK_MYSQL_USERS: UserRecord[] = [
  {
    id: 1,
    identifier: "siswa@smktelkom-jkt.sch.id",
    email: "siswa@smktelkom-jkt.sch.id",
    nis: "10214055",
    name: "Muhammad Fadhil",
    // Salt:Key scrypt hash for "siswa123"
    password_hash: "765b5154f2f5826d476706314a6641ad:10cab641d7b697817a11022ea96ce8bebb690f73498203a0939c1385c80aea831f8c800e808829a49e21fa9d025a405bbf7fe9fc08532b46cecdf718bd3319fe",
    role: "siswa",
    role_label: "Siswa & Wali Murid",
    parentName: "Bambang Prasetyo",
    parentPhone: "081288990011",
    ppdbNo: "PPDB-2026-0001",
    classCode: "X-RPL-1",
    major: "RPL",
  },
  {
    id: 2,
    identifier: "guru@smktelkom-jkt.sch.id",
    email: "guru@smktelkom-jkt.sch.id",
    nip: "198504122010011002",
    name: "Siti Rahmawati, M.Kom.",
    // Salt:Key scrypt hash for "guru123"
    password_hash: "f3c6380ead0f513f541bbdf59bf80e56:340d6fed528ea176a8b3bee48c6374c7ec6d3f21a39376523b0513d0ac07d72c88a56d137ba9ac9cb7684b1dba47e3b8a8787ff1f1ba8a87ffd76861d2543bef",
    role: "guru",
    role_label: "Guru",
  },
  {
    id: 3,
    identifier: "staff@smktelkom-jkt.sch.id",
    email: "staff@smktelkom-jkt.sch.id",
    name: "Staff Administrasi & IT",
    // Salt:Key scrypt hash for "staff123"
    password_hash: "3e514c3b590c0a452e30c4b8e4e7d2fb:058c4602fe7f7eb09e7316757efa5b1a4813548daf5c85db63c899893c37d7954b730ce24a14010636e9f28dca333733823f2ec3940beaddb12eb11c03c50238",
    role: "staff",
    role_label: "Staff Administrator",
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

/**
 * Memperbarui password user setelah reset berhasil
 */
export async function updateUserPassword(email: string, newPasswordHash: string): Promise<boolean> {
  const cleanEmail = email.trim().toLowerCase()
  const user = MOCK_MYSQL_USERS.find((u) => u.email.toLowerCase() === cleanEmail)
  if (!user) return false
  user.password_hash = newPasswordHash
  return true
}

/**
 * Mendaftarkan akun pengguna baru (Calon Siswa / Wali Murid / PPDB)
 */
export async function registerUser(data: {
  name: string
  email: string
  password_hash: string
  role?: UserRole
  nis?: string
  nip?: string
  parentName?: string
  parentPhone?: string
  ppdbNo?: string
  classCode?: string
  major?: string
}): Promise<UserRecord> {
  const cleanEmail = data.email.trim().toLowerCase()
  const newId = MOCK_MYSQL_USERS.length > 0 ? Math.max(...MOCK_MYSQL_USERS.map((u) => u.id)) + 1 : 1
  const role: UserRole = data.role || "siswa"
  const roleLabelMap: Record<UserRole, string> = {
    siswa: "Siswa & Wali Murid",
    guru: "Guru",
    staff: "Staff",
  }

  const newUser: UserRecord = {
    id: newId,
    identifier: cleanEmail,
    email: cleanEmail,
    name: data.name.trim(),
    password_hash: data.password_hash,
    role,
    role_label: roleLabelMap[role],
    nis: data.nis?.trim(),
    nip: data.nip?.trim(),
    parentName: data.parentName?.trim(),
    parentPhone: data.parentPhone?.trim(),
    ppdbNo: data.ppdbNo?.trim(),
    classCode: data.classCode?.trim(),
    major: data.major?.trim(),
  }

  MOCK_MYSQL_USERS.push(newUser)
  return newUser
}

/**
 * Mendapatkan user berdasarkan ID
 */
export async function findUserById(id: number): Promise<UserRecord | null> {
  return MOCK_MYSQL_USERS.find((u) => u.id === id) || null
}

/**
 * Memperbarui profil akun (Nama, dsb.)
 */
export async function updateUserProfile(id: number, data: { name?: string; parentName?: string; parentPhone?: string; classCode?: string }): Promise<UserRecord | null> {
  const user = MOCK_MYSQL_USERS.find((u) => u.id === id)
  if (!user) return null
  if (data.name?.trim()) user.name = data.name.trim()
  if (data.parentName?.trim()) user.parentName = data.parentName.trim()
  if (data.parentPhone?.trim()) user.parentPhone = data.parentPhone.trim()
  if (data.classCode?.trim()) user.classCode = data.classCode.trim()
  return user
}


