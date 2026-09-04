import { NextResponse } from "next/server"
import { askSchoolAI, type ChatMessage } from "@/lib/aiSupport"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prompt, history } = body as {
      prompt?: string
      history?: ChatMessage[]
    }

    if (!prompt || !prompt.trim()) {
      return NextResponse.json(
        { success: false, message: "Pesan pertanyaan tidak boleh kosong." },
        { status: 400 }
      )
    }

    const answer = await askSchoolAI(prompt, history || [])

    return NextResponse.json({
      success: true,
      answer,
    })
  } catch (error) {
    console.error("AI Support API Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Layanan asisten AI sedang sibuk. Silakan coba kembali dalam beberapa saat.",
      },
      { status: 500 }
    )
  }
}
