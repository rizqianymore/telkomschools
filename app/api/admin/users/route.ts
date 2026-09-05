import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken, hashPassword } from "@/lib/security"
import { MOCK_MYSQL_USERS, UserRole, UserRecord } from "@/lib/db"

// GET: Staff Administrator mengambil seluruh daftar akun pengguna
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session || session.role !== "staff") {
      return NextResponse.json({ success: false, message: "Akses ditolak. Khusus Staff Administrator." }, { status: 403 })
    }

    const safeUsers = MOCK_MYSQL_USERS.map((u) => ({
      id: u.id,
      identifier: u.identifier,
      email: u.email,
      name: u.name,
      role: u.role,
      role_label: u.role_label,
      nis: u.nis,
      nip: u.nip,
    }))

    return NextResponse.json({
      success: true,
      total: safeUsers.length,
      users: safeUsers,
    })
  } catch (error) {
    console.error("Admin Users GET Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan internal." }, { status: 500 })
  }
}

// POST: Staff Administrator membuat akun pengguna baru secara manual
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session || session.role !== "staff") {
      return NextResponse.json({ success: false, message: "Akses ditolak. Khusus Staff Administrator." }, { status: 403 })
    }

    const body = await request.json()
    const { name, email, password, role, nis, nip } = body as {
      name?: string
      email?: string
      password?: string
      role?: UserRole
      nis?: string
      nip?: string
    }

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json({ success: false, message: "Nama, email, dan password wajib diisi." }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const existing = MOCK_MYSQL_USERS.find((u) => u.email.toLowerCase() === cleanEmail)
    if (existing) {
      return NextResponse.json({ success: false, message: "Email sudah terdaftar dalam sistem." }, { status: 409 })
    }

    const password_hash = await hashPassword(password.trim())
    const userRole = role || "siswa"
    const roleMap: Record<UserRole, string> = {
      siswa: "Siswa & Wali Murid",
      guru: "Guru",
      staff: "Staff",
    }

    const newId = Math.max(...MOCK_MYSQL_USERS.map((u) => u.id)) + 1
    const newUser: UserRecord = {
      id: newId,
      identifier: cleanEmail,
      email: cleanEmail,
      name: name.trim(),
      password_hash,
      role: userRole,
      role_label: roleMap[userRole],
      nis: nis?.trim(),
      nip: nip?.trim(),
    }

    MOCK_MYSQL_USERS.push(newUser)

    return NextResponse.json({
      success: true,
      message: `Akun ${newUser.name} (${newUser.role_label}) berhasil dibuat.`,
      user: {
        id: newUser.id,
        identifier: newUser.identifier,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        role_label: newUser.role_label,
        nis: newUser.nis,
        nip: newUser.nip,
      },
    })
  } catch (error) {
    console.error("Admin Users POST Error:", error)
    return NextResponse.json({ success: false, message: "Gagal membuat pengguna baru." }, { status: 500 })
  }
}
