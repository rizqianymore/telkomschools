import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import { getStudentAttendance, recordAttendance, ACADEMIC_ATTENDANCE } from "@/lib/academic-data"
import { MOCK_MYSQL_USERS } from "@/lib/db"

// GET: Rekap kehadiran & riwayat absensi harian
export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url)
    const studentIdParam = searchParams.get("studentId")

    let targetStudentId = session.userId
    if (session.role === "guru" || session.role === "staff") {
      if (studentIdParam) {
        targetStudentId = parseInt(studentIdParam, 10)
      } else {
        return NextResponse.json({
          success: true,
          total: ACADEMIC_ATTENDANCE.length,
          attendance: ACADEMIC_ATTENDANCE,
        })
      }
    }

    const attendance = getStudentAttendance(targetStudentId)
    const stats = {
      total: attendance.length,
      hadir: attendance.filter((a) => a.status === "hadir").length,
      izin: attendance.filter((a) => a.status === "izin").length,
      sakit: attendance.filter((a) => a.status === "sakit").length,
      alpa: attendance.filter((a) => a.status === "alpa").length,
    }

    const rate = stats.total > 0 ? Math.round((stats.hadir / stats.total) * 100) : 100

    return NextResponse.json({
      success: true,
      studentId: targetStudentId,
      attendanceRate: `${rate}%`,
      stats,
      records: attendance,
    })
  } catch (error) {
    console.error("Attendance GET Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi gangguan sistem." }, { status: 500 })
  }
}

// POST: Guru / Staff mencatat presensi harian siswa
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session || (session.role !== "guru" && session.role !== "staff")) {
      return NextResponse.json({ success: false, message: "Hanya Guru / Petugas Presensi yang dapat mencatat absensi." }, { status: 403 })
    }

    const body = await request.json()
    const { studentId, date, status, keterangan } = body

    if (!studentId || !date || !status) {
      return NextResponse.json({ success: false, message: "ID siswa, tanggal, dan status presensi wajib diisi." }, { status: 400 })
    }

    const studentUser = MOCK_MYSQL_USERS.find((u) => u.id === Number(studentId))

    const recorded = recordAttendance({
      studentId: Number(studentId),
      nis: studentUser?.nis || "10214055",
      date: date.trim(),
      status,
      keterangan: keterangan?.trim(),
    })

    return NextResponse.json({
      success: true,
      message: `Presensi tanggal ${recorded.date} status "${recorded.status}" berhasil dicatat.`,
      data: recorded,
    })
  } catch (error) {
    console.error("Attendance POST Error:", error)
    return NextResponse.json({ success: false, message: "Gagal mencatat presensi." }, { status: 500 })
  }
}
