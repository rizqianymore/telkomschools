import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value

    if (!token) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
    }

    const payload = verifySessionToken(token)

    if (!payload) {
      return NextResponse.json(
        { authenticated: false, message: "Sesi tidak valid atau telah kedaluwarsa.", user: null },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: payload.userId,
        identifier: payload.identifier,
        email: payload.email,
        name: payload.name,
        role: payload.role,
        role_label: payload.role_label,
      },
    })
  } catch (error) {
    console.error("Session verification error:", error)
    return NextResponse.json(
      { authenticated: false, message: "Terjadi kesalahan internal." },
      { status: 500 }
    )
  }
}
