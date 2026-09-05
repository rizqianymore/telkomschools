import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import { getStudentGrades, saveStudentGrade, ACADEMIC_GRADES } from "@/lib/academic-data"
import { MOCK_MYSQL_USERS } from "@/lib/db"

// GET: Siswa/Ortu melihat nilai diri sendiri; Guru/Staff dapat melihat nilai semua siswa atau filter by studentId
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak. Belum login." }, { status: 401 })
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
        // Return all grades untuk rekap guru/staff
        return NextResponse.json({
          success: true,
          total: ACADEMIC_GRADES.length,
          grades: ACADEMIC_GRADES,
        })
      }
    }

    const grades = getStudentGrades(targetStudentId)
    const average =
      grades.length > 0
        ? (grades.reduce((acc, g) => acc + g.nilaiAkhir, 0) / grades.length).toFixed(1)
        : "0"

    return NextResponse.json({
      success: true,
      studentId: targetStudentId,
      averageNilai: Number(average),
      totalMataPelajaran: grades.length,
      grades,
    })
  } catch (error) {
    console.error("Grades GET Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan internal." }, { status: 500 })
  }
}

// POST: Guru menginput / menyimpan nilai siswa
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session || (session.role !== "guru" && session.role !== "staff")) {
      return NextResponse.json({ success: false, message: "Hanya Guru atau Staff yang berhak menginput nilai." }, { status: 403 })
    }

    const body = await request.json()
    const { studentId, subjectCode, subjectName, kkm, nilaiTugas, nilaiUTS, nilaiUAS, semester } = body

    if (!studentId || !subjectCode || !subjectName) {
      return NextResponse.json({ success: false, message: "Data siswa dan mata pelajaran wajib diisi." }, { status: 400 })
    }

    const studentUser = MOCK_MYSQL_USERS.find((u) => u.id === Number(studentId))

    const newGrade = saveStudentGrade({
      studentId: Number(studentId),
      nis: studentUser?.nis || "10214055",
      subjectCode: subjectCode.trim(),
      subjectName: subjectName.trim(),
      kkm: Number(kkm) || 75,
      nilaiTugas: Number(nilaiTugas) || 0,
      nilaiUTS: Number(nilaiUTS) || 0,
      nilaiUAS: Number(nilaiUAS) || 0,
      semester: semester?.trim() || "Ganjil 2026/2027",
    })

    return NextResponse.json({
      success: true,
      message: `Nilai mata pelajaran ${newGrade.subjectName} berhasil disimpan dengan predikat ${newGrade.grade} (${newGrade.nilaiAkhir}).`,
      data: newGrade,
    })
  } catch (error) {
    console.error("Grades POST Error:", error)
    return NextResponse.json({ success: false, message: "Gagal menyimpan nilai." }, { status: 500 })
  }
}
