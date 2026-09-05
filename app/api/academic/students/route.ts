import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import { MOCK_MYSQL_USERS } from "@/lib/db"

// GET: Ambil daftar seluruh siswa untuk Guru & Staff (Input Nilai, Presensi, Monitoring)
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session) {
      return NextResponse.json({ success: false, message: "Sesi tidak valid." }, { status: 401 })
    }

    if (session.role !== "guru" && session.role !== "staff") {
      return NextResponse.json({ success: false, message: "Akses khusus Guru dan Staff." }, { status: 403 })
    }

    const students = MOCK_MYSQL_USERS.filter((u) => u.role === "siswa").map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      nis: s.nis || "-",
      classCode: s.classCode || "X-RPL-1",
      major: s.major || "RPL",
      parentName: s.parentName || "-",
      parentPhone: s.parentPhone || "-",
    }))

    return NextResponse.json({
      success: true,
      total: students.length,
      students,
    })
  } catch (error) {
    console.error("Academic Students GET Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi gangguan sistem." }, { status: 500 })
  }
}
