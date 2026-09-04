import { NextRequest, NextResponse } from "next/server"
import { calculateQuizRecommendation } from "@/lib/quiz-data"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { answers, studentName } = body

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        {
          success: false,
          message: "Data jawaban (answers) tidak valid atau kosong."
        },
        { status: 400 }
      )
    }

    const result = calculateQuizRecommendation(answers)

    return NextResponse.json({
      success: true,
      data: {
        studentName: studentName || "Calon Siswa",
        result
      }
    })
  } catch (error) {
    console.error("Error processing quiz recommendation:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat memproses rekomendasi jurusan."
      },
      { status: 500 }
    )
  }
}
