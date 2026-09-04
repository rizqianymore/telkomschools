// lib/db.ts
// Contoh arsitektur koneksi database MySQL untuk Next.js App Router
// Bila ingin menghubungkan ke database MySQL sungguhan, install driver mysql2:
// npm install mysql2
//
// import mysql from "mysql2/promise"
//
// export const pool = mysql.createPool({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME || "smk_telkom_jkt",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// })

export interface UserRecord {
  id: number
  email: string
  name: string
  password_hash: string
  role: "admin" | "guru" | "siswa" | "ortu"
}

// Simulasi database MySQL in-memory untuk demo/prototipe langsung jalan
const MOCK_MYSQL_USERS: UserRecord[] = [
  {
    id: 1,
    email: "admin@smktelkom-jkt.sch.id",
    name: "Administrator SMK Telkom",
    // Password dummy: "admin123"
    password_hash: "admin123",
    role: "admin",
  },
  {
    id: 2,
    email: "siswa@smktelkom-jkt.sch.id",
    name: "Calon Siswa Baru",
    // Password dummy: "siswa123"
    password_hash: "siswa123",
    role: "siswa",
  },
]

/**
 * Contoh query MySQL: Mencari user berdasarkan email
 * Ekuivalen dengan: SELECT * FROM users WHERE email = ? LIMIT 1
 */
export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  // Jika menggunakan pool mysql2:
  // const [rows] = await pool.execute<mysql.RowDataPacket[]>(
  //   "SELECT id, email, name, password_hash, role FROM users WHERE email = ? LIMIT 1",
  //   [email]
  // )
  // return (rows[0] as UserRecord) || null

  const user = MOCK_MYSQL_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )
  return user || null
}
