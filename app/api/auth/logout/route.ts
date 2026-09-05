import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const loginUrl = new URL("/login", request.url)
  const response = NextResponse.redirect(loginUrl)

  response.cookies.set({
    name: "telkom_auth_session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })

  return response
}

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Berhasil keluar dari sistem.",
  })

  // Hapus cookie session dengan maxAge: 0
  response.cookies.set({
    name: "telkom_auth_session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  })

  return response
}
