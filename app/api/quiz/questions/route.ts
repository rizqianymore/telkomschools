import { NextResponse } from "next/server"
import { QUIZ_QUESTIONS } from "@/lib/quiz-data"

export async function GET() {
  // Exclude raw scores from response to keep answer key secure on the backend
  const sanitizedQuestions = QUIZ_QUESTIONS.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options.map(opt => ({
      id: opt.id,
      text: opt.text
    }))
  }))

  return NextResponse.json({
    success: true,
    total: sanitizedQuestions.length,
    estimatedMinutes: "3-4",
    questions: sanitizedQuestions
  })
}
