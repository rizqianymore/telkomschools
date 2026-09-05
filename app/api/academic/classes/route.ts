import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import { getAllClasses, createClass } from "@/lib/academic-data"

// GET: Ambil daftar seluruh kelas kejuruan
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

    const classes = getAllClasses()
    return NextResponse.json({
      success: true,
      total: classes.length,
      classes,
    })
  } catch (error) {
    console.error("Classes GET Error:", error)
    return NextResponse.json({ success: false, message: "Terjadi gangguan sistem." }, { status: 500 })
  }
}

// POST: Guru / Staff membuat kelas baru
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Akses ditolak." }, { status: 401 })
    }

    const session = verifySessionToken(token)
    if (!session || (session.role !== "guru" && session.role !== "staff")) {
      return NextResponse.json({ success: false, message: "Hanya Guru / Staff yang berhak menambah kelas." }, { status: 403 })
    }

    const body = await request.json()
    const { code, name, major, waliKelasName, room, totalStudents } = body

    if (!code || !name || !major) {
      return NextResponse.json({ success: false, message: "Kode kelas, nama kelas, dan jurusan wajib diisi." }, { status: 400 })
    }

    const newClass = createClass({
      code: code.trim(),
      name: name.trim(),
      major,
      waliKelasId: session.userId,
      waliKelasName: waliKelasName?.trim() || session.name,
      room: room?.trim() || "Lab Kejuruan",
      totalStudents: Number(totalStudents) || 36,
    })

    return NextResponse.json({
      success: true,
      message: `Kelas baru ${newClass.name} (${newClass.code}) berhasil ditambahkan.`,
      data: newClass,
    })
  } catch (error) {
    console.error("Classes POST Error:", error)
    return NextResponse.json({ success: false, message: "Gagal membuat kelas." }, { status: 500 })
  }
}
