"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Users,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { QuizQuestion, QuizOption, QuizSubmissionLog } from "@/lib/quiz-data"

export default function GuruDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<"soal" | "hasil">("soal")
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([])
  const [submissions, setSubmissions] = React.useState<QuizSubmissionLog[]>([])
  const [loading, setLoading] = React.useState(true)
  const [feedback, setFeedback] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  // Form states untuk tambah soal baru
  const [showAddForm, setShowAddForm] = React.useState(false)
  const [newQuestionText, setNewQuestionText] = React.useState("")
  const [optA, setOptA] = React.useState("")
  const [optB, setOptB] = React.useState("")
  const [optC, setOptC] = React.useState("")
  const [optD, setOptD] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  // Load data from API
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/quiz/manage")
      const json = await res.json()
      if (json.success) {
        setQuestions(json.questions || [])
        setSubmissions(json.submissions || [])
      }
    } catch (err) {
      console.error("Gagal memuat data guru:", err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm(`Hapus soal #${id}?`)) return

    try {
      const res = await fetch(`/api/quiz/manage?id=${id}`, { method: "DELETE" })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: json.message })
        fetchData()
      } else {
        setFeedback({ type: "error", text: json.message || "Gagal menghapus soal." })
      }
    } catch {
      setFeedback({ type: "error", text: "Terjadi gangguan jaringan." })
    }
  }

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestionText.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      alert("Pertanyaan dan semua 4 opsi jawaban wajib diisi.")
      return
    }

    setSubmitting(true)
    const options: QuizOption[] = [
      { id: "A", text: optA.trim(), scores: { RPL: 2 } },
      { id: "B", text: optB.trim(), scores: { DKV: 2 } },
      { id: "C", text: optC.trim(), scores: { TKJ: 2 } },
      { id: "D", text: optD.trim(), scores: { TJA: 2 } },
    ]

    try {
      const res = await fetch("/api/quiz/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestionText.trim(), options }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: "Soal baru berhasil ditambahkan dan langsung aktif untuk siswa!" })
        setShowAddForm(false)
        setNewQuestionText("")
        setOptA("")
        setOptB("")
        setOptC("")
        setOptD("")
        fetchData()
      } else {
        setFeedback({ type: "error", text: json.message || "Gagal menambahkan soal." })
      }
    } catch {
      setFeedback({ type: "error", text: "Gagal terhubung ke server." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-red-200 bg-red-50 text-primary text-xs font-semibold">
                  Dashboard Guru & Pendidik
                </Badge>
                <span className="text-xs text-neutral-500">• Manajemen Quiz Minat Bakat</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-2">
                Pusat Pengaturan <span className="text-primary">Quiz Jurusan</span>
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Atur pertanyaan kuis penjurusan dan pantau hasil rekomendasi calon siswa secara real-time.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                render={<Link href="/quiz" />}
                className="rounded-xl text-xs border-neutral-200"
              >
                Coba Quiz Siswa
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                className="rounded-xl text-xs bg-primary text-white hover:bg-red-700 shadow-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                {showAddForm ? "Batal Tambah" : "Tambah Soal Baru"}
              </Button>
            </div>
          </div>

          {/* Feedback alert */}
          {feedback && (
            <div
              className={`mt-6 flex items-center justify-between rounded-xl p-3.5 text-xs font-medium ${
                feedback.type === "success"
                  ? "border border-neutral-200 bg-neutral-50 text-neutral-900"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <span>{feedback.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setFeedback(null)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>
          )}

          {/* Stat Summary Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{questions.length}</div>
                  <div className="text-xs text-neutral-500">Total Pertanyaan Aktif</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{submissions.length}</div>
                  <div className="text-xs text-neutral-500">Siswa Telah Mengerjakan</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">4 Jurusan</div>
                  <div className="text-xs text-neutral-500">RPL, TKJ, TJA, & DKV</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form Tambah Soal Baru (Collapsible) */}
          {showAddForm && (
            <Card className="mt-8 border border-neutral-200 bg-neutral-50/50 p-6 shadow-sm animate-in fade-in duration-200">
              <CardContent className="p-0">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                    <Edit3 className="h-4 w-4 text-primary" />
                    <span>Formulir Buat Soal Kuis Baru</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    Kuis Minat Bakat
                  </Badge>
                </div>

                <form onSubmit={handleCreateQuestion} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Kalimat Pertanyaan Kuis:
                    </label>
                    <Input
                      value={newQuestionText}
                      onChange={(e) => setNewQuestionText(e.target.value)}
                      placeholder="Contoh: Kegiatan apa yang paling kamu sukai saat waktu luang?"
                      className="rounded-xl text-xs bg-white border-neutral-200 focus-visible:border-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Pilihan A <span className="text-primary font-semibold">(Bobot: RPL)</span>
                      </label>
                      <Input
                        value={optA}
                        onChange={(e) => setOptA(e.target.value)}
                        placeholder="Contoh: Membuat kode program / web"
                        className="rounded-xl text-xs bg-white border-neutral-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Pilihan B <span className="text-neutral-900 font-semibold">(Bobot: DKV)</span>
                      </label>
                      <Input
                        value={optB}
                        onChange={(e) => setOptB(e.target.value)}
                        placeholder="Contoh: Membuat desain grafis / video"
                        className="rounded-xl text-xs bg-white border-neutral-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Pilihan C <span className="text-neutral-900 font-semibold">(Bobot: TKJ)</span>
                      </label>
                      <Input
                        value={optC}
                        onChange={(e) => setOptC(e.target.value)}
                        placeholder="Contoh: Merakit komputer & setting server"
                        className="rounded-xl text-xs bg-white border-neutral-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-600 mb-1">
                        Pilihan D <span className="text-primary font-semibold">(Bobot: TJA)</span>
                      </label>
                      <Input
                        value={optD}
                        onChange={(e) => setOptD(e.target.value)}
                        placeholder="Contoh: Menyambung fiber optic & akses jaringan"
                        className="rounded-xl text-xs bg-white border-neutral-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2.5 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                      className="rounded-xl text-xs border-neutral-200"
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="rounded-xl text-xs bg-primary text-white hover:bg-red-700 shadow-sm"
                    >
                      {submitting ? "Menyimpan..." : "Simpan & Aktifkan Soal"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Tab Navigasi: Kelola Soal vs Riwayat Pengerjaan */}
          <div className="mt-10 flex border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveTab("soal")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors ${
                activeTab === "soal"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Daftar Soal Aktif ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("hasil")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors ${
                activeTab === "hasil"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Hasil Pengerjaan Siswa ({submissions.length})
            </button>
          </div>

          {/* Konten Tab dengan Animasi Perpindahan Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "soal" && (
              <motion.div
                key="tab-soal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-6 space-y-4"
              >
                {loading ? (
                  <div className="py-12 text-center text-xs text-neutral-500">Memuat daftar soal...</div>
                ) : questions.length === 0 ? (
                  <div className="py-12 text-center text-xs text-neutral-500">Belum ada soal kuis yang terdaftar.</div>
                ) : (
                  questions.map((q, idx) => (
                    <Card key={q.id} className="border-neutral-200/90 bg-white p-5 shadow-xs hover:border-neutral-300">
                      <CardContent className="p-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-50 text-primary font-bold text-xs">
                              {idx + 1}
                            </span>
                            <div>
                              <h3 className="text-sm font-bold text-neutral-900 leading-snug">{q.question}</h3>
                              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-600">
                                {q.options.map((opt) => (
                                  <div key={opt.id} className="rounded-lg border border-neutral-100 bg-neutral-50/60 px-3 py-2">
                                    <span className="font-semibold text-primary mr-1.5">{opt.id}.</span>
                                    <span>{opt.text}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg shrink-0"
                            title="Hapus Soal"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === "hasil" && (
              <motion.div
                key="tab-hasil"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-6"
              >
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                      <tr>
                        <th className="p-3.5">Nama Siswa</th>
                        <th className="p-3.5">Waktu Selesai</th>
                        <th className="p-3.5">Rekomendasi Utama</th>
                        <th className="p-3.5">Skor Kecocokan</th>
                        <th className="p-3.5">Detail Nilai Jurusan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {submissions.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-neutral-400">
                            Belum ada data pengerjaan kuis siswa.
                          </td>
                        </tr>
                      ) : (
                        submissions.map((sub) => (
                          <tr key={sub.id} className="hover:bg-neutral-50/50">
                            <td className="p-3.5 font-bold text-neutral-900">{sub.studentName}</td>
                            <td className="p-3.5 text-neutral-500">{sub.submittedAt}</td>
                            <td className="p-3.5">
                              <Badge className="bg-red-50 text-primary border-red-200 font-bold">
                                {sub.primaryMajor}
                              </Badge>
                            </td>
                            <td className="p-3.5">
                              <span className="font-semibold text-neutral-800">{sub.percentage}%</span>
                              <span className="text-neutral-400 ml-1">({sub.score} poin)</span>
                            </td>
                            <td className="p-3.5">
                              <div className="flex flex-wrap gap-1.5 text-[10px]">
                                {sub.allScores.map((s, sIdx) => (
                                  <span key={sIdx} className="rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-700">
                                    {s.major}: {s.score}pt ({s.percentage}%)
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
