import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { runRateLimit } from "@/lib/rateLimit"
import { findUserByAnyIdentifier, updateUserProfile } from "@/lib/db"
import { verifySessionToken } from "@/lib/security"

// GET: Ambil detail profil akun saat ini
export async function GET(request: Request) {
  await runRateLimit(request)

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Belum login." },
        { status: 401 }
      )
    }

    const session = verifySessionToken(token)
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid." },
        { status: 401 }
      )
    }

    const user = await findUserByAnyIdentifier(session.email)
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Data pengguna tidak ditemukan." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        identifier: user.identifier,
        email: user.email,
        nis: user.nis,
        nip: user.nip,
        name: user.name,
        role: user.role,
        role_label: user.role_label,
      },
    })
  } catch (error) {
    console.error("Auth Me GET Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi gangguan internal." },
      { status: 500 }
    )
  }
}

// PUT: Perbarui nama / profil akun
export async function PUT(request: Request) {
  await runRateLimit(request)

  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Belum login." },
        { status: 401 }
      )
    }

    const session = verifySessionToken(token)
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Sesi tidak valid." },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name } = body as { name?: string }

    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama lengkap tidak boleh kosong." },
        { status: 400 }
      )
    }

    const updated = await updateUserProfile(session.userId, { name: name.trim() })
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Gagal memperbarui profil." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Profil berhasil diperbarui.",
      user: {
        id: updated.id,
        identifier: updated.identifier,
        email: updated.email,
        name: updated.name,
        role: updated.role,
        role_label: updated.role_label,
      },
    })
  } catch (error) {
    console.error("Auth Me PUT Error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal." },
      { status: 500 }
    )
  }
}
