import { NextResponse } from "next/server"

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
