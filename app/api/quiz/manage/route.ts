import { NextRequest, NextResponse } from "next/server"
import {
  QUIZ_QUESTIONS,
  QUIZ_SUBMISSIONS,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  QuizOption,
} from "@/lib/quiz-data"

// GET: Ambil daftar seluruh soal lengkap (dengan bobot penilaian) dan statistik untuk Guru
export async function GET() {
  return NextResponse.json({
    success: true,
    totalQuestions: QUIZ_QUESTIONS.length,
    totalSubmissions: QUIZ_SUBMISSIONS.length,
    questions: QUIZ_QUESTIONS,
    submissions: QUIZ_SUBMISSIONS,
  })
}

// POST: Tambah soal baru oleh Guru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { question, options } = body as {
      question: string
      options: QuizOption[]
    }

    if (!question || !options || options.length < 2) {
      return NextResponse.json(
        { success: false, message: "Pertanyaan dan minimal 2 opsi jawaban wajib diisi." },
        { status: 400 }
      )
    }

    const newQuestion = addQuestion(question, options)

    return NextResponse.json({
      success: true,
      message: "Soal berhasil ditambahkan.",
      data: newQuestion,
    })
  } catch (error) {
    console.error("Error creating question:", error)
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan soal kuis." },
      { status: 500 }
    )
  }
}

// PUT: Perbarui soal kuis oleh Guru
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, question, options } = body as {
      id: number
      question: string
      options: QuizOption[]
    }

    if (!id || !question || !options) {
      return NextResponse.json(
        { success: false, message: "ID soal, pertanyaan, dan opsi wajib disediakan." },
        { status: 400 }
      )
    }

    const updated = updateQuestion(id, question, options)
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Soal tidak ditemukan." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Soal berhasil diperbarui.",
      data: updated,
    })
  } catch (error) {
    console.error("Error updating question:", error)
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui soal." },
      { status: 500 }
    )
  }
}

// DELETE: Hapus soal kuis oleh Guru
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const idParam = searchParams.get("id")

    if (!idParam) {
      return NextResponse.json(
        { success: false, message: "Parameter id soal wajib diberikan." },
        { status: 400 }
      )
    }

    const id = parseInt(idParam, 10)
    const success = deleteQuestion(id)

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Soal tidak ditemukan atau gagal dihapus." },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Soal #${id} berhasil dihapus.`,
    })
  } catch (error) {
    console.error("Error deleting question:", error)
    return NextResponse.json(
      { success: false, message: "Gagal menghapus soal." },
      { status: 500 }
    )
  }
}
