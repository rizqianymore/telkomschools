"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  Briefcase,
  GraduationCap,
  Award,
  LogOut,
  UserCheck
} from "lucide-react"
import { QuizResult, QuizQuestion } from "@/lib/quiz-data"
import { getStoredUser, removeStoredUser, AuthUser } from "@/lib/auth"

export default function QuizPage() {
  const [stage, setStage] = React.useState<"intro" | "quiz" | "submitting" | "result">("intro")
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<number, string>>({})
  const [result, setResult] = React.useState<QuizResult | null>(null)
  const [studentName, setStudentName] = React.useState(() => getStoredUser()?.name || "")
  const [loadingQuestions, setLoadingQuestions] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState<AuthUser | null>(() => getStoredUser())

  // Cek status autentikasi pengguna dari storage
  React.useEffect(() => {
    const handleAuthChange = () => {
      const updatedUser = getStoredUser()
      setCurrentUser(updatedUser)
      if (updatedUser) {
        setStudentName((prev) => prev || updatedUser.name)
      }
    }

    window.addEventListener("auth_state_changed", handleAuthChange)
    return () => window.removeEventListener("auth_state_changed", handleAuthChange)
  }, [])

  // Fetch questions from Backend API
  const handleStartQuiz = async () => {
    setLoadingQuestions(true)
    try {
      const res = await fetch("/api/quiz/questions")
      const json = await res.json()
      if (json.success && json.questions) {
        setQuestions(json.questions)
        setStage("quiz")
        setCurrentIndex(0)
        setAnswers({})
      }
    } catch (err) {
      console.error("Gagal mengambil data soal kuis:", err)
    } finally {
      setLoadingQuestions(false)
    }
  }

  const handleSelectOption = (questionId: number, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    setStage("submitting")
    try {
      const res = await fetch("/api/quiz/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          studentName: studentName.trim() || undefined
        })
      })

      const json = await res.json()
      if (json.success && json.data?.result) {
        setResult(json.data.result)
        setStage("result")
      }
    } catch (err) {
      console.error("Gagal memproses rekomendasi kuis:", err)
      setStage("quiz")
    }
  }

  const handleRestart = () => {
    setAnswers({})
    setCurrentIndex(0)
    setResult(null)
    setStage("intro")
  }

  const currentQuestion = questions[currentIndex]
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined
  const progressPercent = questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0
  const isAllAnswered = questions.length > 0 && questions.every(q => !!answers[q.id])

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50/50 text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* STAGE: INTRO */}
          {stage === "intro" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="text-center">
                <Badge
                  variant="outline"
                  className="mb-4 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-none"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>Tes Minat & Bakat Siswa</span>
                </Badge>
                <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
                  Quiz Rekomendasi <span className="text-primary">Jurusan</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
                  Bingung memilih jurusan yang tepat di SMK Telkom? Temukan jurusan yang paling sesuai dengan passion, kepribadian, dan minat karirmu lewat kuis interaktif ini.
                </p>
              </div>

              <Card className="border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center border-b border-neutral-100 pb-6 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-xl bg-red-50 text-primary flex items-center justify-center mb-2">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-bold text-neutral-900">10 Soal Singkat</div>
                    <div className="text-xs text-neutral-500 mt-0.5">Pilihan ganda praktis</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-bold text-neutral-900">3 - 4 Menit</div>
                    <div className="text-xs text-neutral-500 mt-0.5">Cepat & tanpa beban</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-bold text-neutral-900">4 Jurusan Pilihan</div>
                    <div className="text-xs text-neutral-500 mt-0.5">RPL, TKJ, TJA, dan DKV</div>
                  </div>
                </div>

                <div className="space-y-4 max-w-md mx-auto">
                  {/* Status Login Pengguna (Opsional jika sudah login) */}
                  {currentUser && (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs">
                      <div className="flex items-center gap-2 text-emerald-900">
                        <UserCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-semibold text-emerald-950">{currentUser.name}</span>
                          <span className="text-emerald-700 ml-1">
                            ({currentUser.role_label}
                            {currentUser.nis ? ` • NIS ${currentUser.nis}` : ""})
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          removeStoredUser()
                          setCurrentUser(null)
                          setStudentName("")
                        }}
                        className="text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <LogOut className="h-3 w-3" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Nama Kamu (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama panggilanmu..."
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-colors"
                    />
                  </div>

                  <Button
                    size="lg"
                    onClick={handleStartQuiz}
                    disabled={loadingQuestions}
                    className="w-full text-sm font-semibold h-11"
                  >
                    <span>{loadingQuestions ? "Memuat Soal..." : "Mulai Quiz Sekarang"}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </Card>

              {/* Jurusan Overview Banner */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { code: "RPL", name: "Rekayasa Perangkat Lunak", color: "border-red-200 bg-red-50/40 text-red-700" },
                  { code: "TKJ", name: "Teknik Komputer & Jaringan", color: "border-blue-200 bg-blue-50/40 text-blue-700" },
                  { code: "TJA", name: "Teknik Jaringan Akses", color: "border-emerald-200 bg-emerald-50/40 text-emerald-700" },
                  { code: "DKV", name: "Desain Komunikasi Visual", color: "border-amber-200 bg-amber-50/40 text-amber-700" },
                ].map((j, i) => (
                  <div key={i} className={`p-3.5 rounded-xl border ${j.color} text-center`}>
                    <div className="text-sm font-extrabold tracking-wide">{j.code}</div>
                    <div className="text-[11px] text-neutral-600 mt-0.5 leading-snug">{j.name}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STAGE: QUIZ IN PROGRESS */}
          {stage === "quiz" && currentQuestion && (
            <div className="space-y-6">
              {/* Top Progress Bar */}
              <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-600">
                  <span className="flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-primary text-[11px] font-bold">
                      {currentIndex + 1}
                    </span>
                    <span>Soal {currentIndex + 1} dari {questions.length}</span>
                  </span>
                  <span>{progressPercent}% Selesai</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug mb-6">
                      {currentQuestion.question}
                    </h2>

                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => {
                        const isSelected = currentAnswer === option.id
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                              isSelected
                                ? "border-primary bg-red-50/50 shadow-sm ring-1 ring-primary/20"
                                : "border-neutral-200/90 bg-neutral-50/40 hover:bg-neutral-50 hover:border-neutral-300"
                            }`}
                          >
                            <span
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                                isSelected
                                  ? "bg-primary text-white"
                                  : "bg-white text-neutral-600 border border-neutral-200"
                              }`}
                            >
                              {option.id}
                            </span>
                            <span className="text-sm sm:text-base font-medium text-neutral-800 pt-0.5">
                              {option.text}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="text-xs font-medium"
                      >
                        <ArrowLeft className="h-3.5 w-3.5 mr-1" />
                        Sebelumnya
                      </Button>

                      {currentIndex === questions.length - 1 ? (
                        <Button
                          size="default"
                          onClick={handleSubmitQuiz}
                          disabled={!isAllAnswered}
                          className="text-xs font-semibold bg-primary hover:bg-primary/90"
                        >
                          <span>Lihat Hasil Rekomendasi</span>
                          <Sparkles className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      ) : (
                        <Button
                          size="default"
                          onClick={handleNext}
                          disabled={!currentAnswer}
                          className="text-xs font-semibold"
                        >
                          <span>Selanjutnya</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* STAGE: SUBMITTING / LOADING */}
          {stage === "submitting" && (
            <Card className="border-neutral-200/90 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-primary animate-pulse mb-4">
                <Sparkles className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">Menganalisis Minat & Bakat...</h3>
              <p className="mt-2 text-sm text-neutral-500">
                Backend sedang mengkalkulasi skor kecocokan minatmu dengan jurusan di Telkom Schools.
              </p>
            </Card>
          )}

          {/* STAGE: RESULT */}
          {stage === "result" && result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Header Result */}
              <div className="text-center">
                <Badge
                  variant="outline"
                  className="mb-3 text-xs border-emerald-200 bg-emerald-50/80 text-emerald-700 font-medium py-1 px-3"
                >
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 inline text-emerald-600" />
                  Analisis Minat Selesai
                </Badge>
                <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                  Rekomendasi Jurusan Terbaik Untukmu
                </h1>
                <p className="mt-2 text-sm sm:text-base text-neutral-600">
                  Halo {studentName ? <strong className="text-neutral-900">{studentName}</strong> : "Calon Siswa"}, berikut hasil kecocokan berdasarkan 10 pertanyaan yang telah kamu jawab.
                </p>
              </div>

              {/* Primary Recommendation Card */}
              <Card className="border-2 border-red-500/20 bg-gradient-to-br from-red-50/30 via-white to-white p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5 mb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      ★ Rekomendasi Utama
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
                      {result.primary.major.code} – {result.primary.major.fullName}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                      {result.primary.major.tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="rounded-xl bg-primary text-white text-sm font-bold px-4 py-2 shadow-sm">
                      Skor: {result.primary.score}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Kenapa Kamu Cocok di Sini?
                    </div>
                    <p className="text-sm sm:text-base text-neutral-700 leading-relaxed bg-white/80 p-4 rounded-xl border border-neutral-100">
                      {result.primary.major.whyMatch}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-neutral-600" />
                      <span>Peluang Karir Lulusan:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.primary.major.careerOpportunities.map((career, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-medium text-neutral-800 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{career}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Alternative Recommendation Card (If Any) */}
              {result.alternative && (
                <Card className="border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4 mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                        Pilihan Alternatif (Selisih Skor &le; 3)
                      </span>
                      <h3 className="text-xl font-bold text-neutral-900 mt-1">
                        {result.alternative.major.code} – {result.alternative.major.fullName}
                      </h3>
                    </div>
                    <span className="rounded-xl bg-neutral-100 text-neutral-800 text-xs font-bold px-3 py-1.5 self-start sm:self-center border border-neutral-200">
                      Skor: {result.alternative.score}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {result.alternative.major.alternativeWhyMatch}
                  </p>
                </Card>
              )}

              {/* All Scores Breakdown */}
              <Card className="border-neutral-200/90 bg-white p-6 shadow-sm">
                <h3 className="text-base font-bold text-neutral-900 mb-4">
                  Distribusi Minat di 4 Jurusan
                </h3>
                <div className="space-y-4">
                  {result.allScores.map((item) => (
                    <div key={item.major.code} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-neutral-800">
                          {item.major.code} – {item.major.fullName}
                        </span>
                        <span className="font-bold text-neutral-600">
                          {item.score} Poin ({item.percentage}%)
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.major.color.progress} transition-all duration-500 rounded-full`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleRestart}
                  className="w-full sm:w-auto text-xs font-medium"
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Ulangi Quiz
                </Button>
                <Button
                  size="lg"
                  render={<Link href="/kontak" />}
                  className="w-full sm:w-auto text-xs font-semibold bg-primary hover:bg-primary/90"
                >
                  <GraduationCap className="h-4 w-4 mr-1.5" />
                  <span>Daftar Jurusan Ini Sekarang</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
