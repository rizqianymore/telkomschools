import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifySessionToken } from "@/lib/security"
import { calculateQuizRecommendation, QUIZ_SUBMISSIONS, QuizSubmissionLog } from "@/lib/quiz-data"

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

    const cookieStore = await cookies()
    const token = cookieStore.get("telkom_auth_session")?.value
    const session = token ? verifySessionToken(token) : null

    const result = calculateQuizRecommendation(answers)
    const cleanStudentName = studentName?.trim() || session?.name || "Calon Siswa"

    // Simpan ke log submission agar Guru bisa melihat di Dashboard
    const submissionLog: QuizSubmissionLog = {
      id: `sub-${Date.now()}`,
      userId: session?.userId,
      studentName: cleanStudentName,
      submittedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      primaryMajor: result.primary.major.code,
      score: result.primary.score,
      percentage: result.allScores[0]?.percentage || 0,
      allScores: result.allScores.map(s => ({
        major: s.major.code,
        score: s.score,
        percentage: s.percentage,
      }))
    }

    QUIZ_SUBMISSIONS.unshift(submissionLog)

    return NextResponse.json({
      success: true,
      data: {
        studentName: cleanStudentName,
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
