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
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Award,
  CalendarCheck,
  Building2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { QuizQuestion, QuizOption, QuizSubmissionLog } from "@/lib/quiz-data"
import { NilaiItem, PresensiItem, KelasItem } from "@/lib/academic-data"

interface StudentOption {
  id: number
  name: string
  email: string
  nis: string
  classCode: string
  major: string
}

export default function GuruDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<"soal" | "hasil" | "nilai" | "presensi" | "kelas">("soal")
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([])
  const [submissions, setSubmissions] = React.useState<QuizSubmissionLog[]>([])
  const [grades, setGrades] = React.useState<NilaiItem[]>([])
  const [attendance, setAttendance] = React.useState<PresensiItem[]>([])
  const [classes, setClasses] = React.useState<KelasItem[]>([])
  const [students, setStudents] = React.useState<StudentOption[]>([])
  const [feedback, setFeedback] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  // Form states untuk tambah soal baru
  const [showAddForm, setShowAddForm] = React.useState(false)
  const [newQuestionText, setNewQuestionText] = React.useState("")
  const [optA, setOptA] = React.useState("")
  const [optB, setOptB] = React.useState("")
  const [optC, setOptC] = React.useState("")
  const [optD, setOptD] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  // Form states untuk input nilai siswa
  const [gradeStudentId, setGradeStudentId] = React.useState("1")
  const gradeSubjectCode = "RPL-303"
  const [gradeSubjectName, setGradeSubjectName] = React.useState("Kecerdasan Buatan & IoT")
  const [gradeTugas, setGradeTugas] = React.useState("88")
  const [gradeUTS, setGradeUTS] = React.useState("85")
  const [gradeUAS, setGradeUAS] = React.useState("90")

  // Form states untuk catat presensi
  const [attStudentId, setAttStudentId] = React.useState("1")
  const [attDate, setAttDate] = React.useState(new Date().toISOString().substring(0, 10))
  const [attStatus, setAttStatus] = React.useState<"hadir" | "izin" | "sakit" | "alpa">("hadir")
  const [attKet, setAttKet] = React.useState("KBM Teori & Praktikum Lab")

  // Form states untuk tambah kelas baru
  const [classCode, setClassCode] = React.useState("XI-RPL-1")
  const [className, setClassName] = React.useState("Kelas XI Rekayasa Perangkat Lunak 1")
  const [classMajor, setClassMajor] = React.useState<"RPL" | "TKJ" | "DKV" | "TJA">("RPL")
  const [classRoom, setClassRoom] = React.useState("Lab AI & Mobile 304")

  // Load data from API
  const fetchData = React.useCallback(async () => {
    try {
      const [quizRes, gradesRes, attRes, classesRes, studentsRes] = await Promise.all([
        fetch("/api/quiz/manage"),
        fetch("/api/academic/nilai"),
        fetch("/api/academic/attendance"),
        fetch("/api/academic/classes"),
        fetch("/api/academic/students"),
      ])

      const quizJson = await quizRes.json()
      if (quizJson.success) {
        setQuestions(quizJson.questions || [])
        setSubmissions(quizJson.submissions || [])
      }

      const gradesJson = await gradesRes.json()
      if (gradesJson.success) {
        setGrades(gradesJson.grades || [])
      }

      const attJson = await attRes.json()
      if (attJson.success) {
        setAttendance(attJson.attendance || [])
      }

      const classesJson = await classesRes.json()
      if (classesJson.success) {
        setClasses(classesJson.classes || [])
      }

      const studentsJson = await studentsRes.json()
      if (studentsJson.success && studentsJson.students) {
        setStudents(studentsJson.students)
        if (studentsJson.students.length > 0) {
          setGradeStudentId(String(studentsJson.students[0].id))
          setAttStudentId(String(studentsJson.students[0].id))
        }
      }
    } catch (err) {
      console.error("Gagal memuat data guru:", err)
    }
  }, [])

  React.useEffect(() => {
    let isMounted = true
    const init = async () => {
      if (isMounted) {
        await fetchData()
      }
    }
    void init()
    return () => {
      isMounted = false
    }
  }, [fetchData])

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
        setFeedback({ type: "success", text: "Soal baru berhasil ditambahkan dan langsung aktif!" })
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

  const handleInputGrade = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/academic/nilai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: gradeStudentId,
          subjectCode: gradeSubjectCode,
          subjectName: gradeSubjectName,
          kkm: 75,
          nilaiTugas: Number(gradeTugas),
          nilaiUTS: Number(gradeUTS),
          nilaiUAS: Number(gradeUAS),
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: json.message })
        fetchData()
      } else {
        setFeedback({ type: "error", text: json.message || "Gagal menyimpan nilai." })
      }
    } catch {
      setFeedback({ type: "error", text: "Gangguan koneksi server." })
    }
  }

  const handleInputAttendance = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/academic/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: attStudentId,
          date: attDate,
          status: attStatus,
          keterangan: attKet,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: json.message })
        fetchData()
      } else {
        setFeedback({ type: "error", text: json.message || "Gagal mencatat absensi." })
      }
    } catch {
      setFeedback({ type: "error", text: "Gangguan koneksi server." })
    }
  }

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/academic/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: classCode,
          name: className,
          major: classMajor,
          room: classRoom,
          totalStudents: 36,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: json.message })
        fetchData()
      } else {
        setFeedback({ type: "error", text: json.message || "Gagal membuat kelas." })
      }
    } catch {
      setFeedback({ type: "error", text: "Gangguan koneksi server." })
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
                  Dashboard Pendidik & Wali Kelas
                </Badge>
                <span className="text-xs text-neutral-500">• Manajemen Nilai, Absensi, Kelas & Quiz</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-2">
                Pusat Pembelajaran & <span className="text-primary">Akademik Guru</span>
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Kelola penilaian siswa, pencatatan absensi harian, pembagian kelas kejuruan, dan pantau hasil kuis minat bakat.
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
                {showAddForm ? "Batal Tambah" : "Tambah Soal Quiz"}
              </Button>
            </div>
          </div>

          {/* Feedback alert */}
          {feedback && (
            <div
              className={`mt-6 flex items-center justify-between rounded-xl p-3.5 text-xs font-medium ${
                feedback.type === "success"
                  ? "border border-green-200 bg-green-50 text-green-900"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
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
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{questions.length}</div>
                  <div className="text-xs text-neutral-500">Soal Quiz Aktif</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{grades.length}</div>
                  <div className="text-xs text-neutral-500">Entri Nilai Masuk</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <CalendarCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{attendance.length}</div>
                  <div className="text-xs text-neutral-500">Log Presensi Harian</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{classes.length}</div>
                  <div className="text-xs text-neutral-500">Rombongan Belajar (Kelas)</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collapsible Form Tambah Soal */}
          {showAddForm && (
            <Card className="mt-8 border border-neutral-200 bg-neutral-50/50 p-6 shadow-sm">
              <CardContent className="p-0">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                    <Edit3 className="h-4 w-4 text-primary" />
                    <span>Formulir Buat Soal Kuis Baru</span>
                  </div>
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
                      className="rounded-xl text-xs bg-white border-neutral-200"
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

          {/* Tab Navigasi */}
          <div className="mt-10 flex border-b border-neutral-200 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("soal")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors shrink-0 ${
                activeTab === "soal"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Daftar Soal Quiz ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("hasil")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors shrink-0 ${
                activeTab === "hasil"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Hasil Quiz Siswa ({submissions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("nilai")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors shrink-0 ${
                activeTab === "nilai"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Input & Rekap Nilai ({grades.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("presensi")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors shrink-0 ${
                activeTab === "presensi"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Presensi Kelas ({attendance.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("kelas")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors shrink-0 ${
                activeTab === "kelas"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Manajemen Kelas ({classes.length})
            </button>
          </div>

          {/* Konten Tab */}
          <AnimatePresence mode="wait">
            {/* 1. TAB SOAL QUIZ */}
            {activeTab === "soal" && (
              <motion.div
                key="tab-soal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-4"
              >
                {questions.map((q, idx) => (
                  <Card key={q.id} className="border-neutral-200 bg-white p-5 shadow-xs">
                    <CardContent className="p-0 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-50 text-primary font-bold text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="text-sm font-bold text-neutral-900">{q.question}</h3>
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
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* 2. TAB HASIL QUIZ SISWA */}
            {activeTab === "hasil" && (
              <motion.div
                key="tab-hasil"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
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
                      {submissions.map((sub) => (
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 3. TAB INPUT & REKAP NILAI SISWA */}
            {activeTab === "nilai" && (
              <motion.div
                key="tab-nilai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-6"
              >
                {/* Form Input Nilai Cepat */}
                <Card className="border border-neutral-200 bg-neutral-50/60 p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-primary" />
                    <span>Input Nilai Mata Pelajaran Siswa</span>
                  </h3>
                  <form onSubmit={handleInputGrade} className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Pilih Siswa</label>
                      <select
                        value={gradeStudentId}
                        onChange={(e) => setGradeStudentId(e.target.value)}
                        className="h-9 w-full rounded-xl border border-neutral-200 bg-white px-3 text-xs text-neutral-900"
                        required
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.nis} - {s.classCode})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Nama Mata Pelajaran</label>
                      <Input
                        value={gradeSubjectName}
                        onChange={(e) => setGradeSubjectName(e.target.value)}
                        placeholder="cth. Cloud Architecture"
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Nilai Tugas (30%)</label>
                      <Input
                        type="number"
                        value={gradeTugas}
                        onChange={(e) => setGradeTugas(e.target.value)}
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Nilai UTS (30%)</label>
                      <Input
                        type="number"
                        value={gradeUTS}
                        onChange={(e) => setGradeUTS(e.target.value)}
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Nilai UAS (40%)</label>
                      <Input
                        type="number"
                        value={gradeUAS}
                        onChange={(e) => setGradeUAS(e.target.value)}
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div className="sm:col-span-6 flex justify-end">
                      <Button type="submit" size="sm" className="rounded-xl text-xs bg-primary text-white">
                        Simpan Nilai Rapor
                      </Button>
                    </div>
                  </form>
                </Card>

                {/* Tabel Nilai Terdaftar */}
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                      <tr>
                        <th className="p-3.5">NIS & Mata Pelajaran</th>
                        <th className="p-3.5">KKM</th>
                        <th className="p-3.5">Tugas</th>
                        <th className="p-3.5">UTS</th>
                        <th className="p-3.5">UAS</th>
                        <th className="p-3.5">Nilai Akhir</th>
                        <th className="p-3.5">Predikat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {grades.map((g) => (
                        <tr key={g.id} className="hover:bg-neutral-50/50">
                          <td className="p-3.5">
                            <div className="font-bold text-neutral-900">{g.subjectName}</div>
                            <span className="text-[10px] text-neutral-400">NIS: {g.nis} • {g.subjectCode}</span>
                          </td>
                          <td className="p-3.5 text-neutral-500">{g.kkm}</td>
                          <td className="p-3.5 font-medium text-neutral-700">{g.nilaiTugas}</td>
                          <td className="p-3.5 font-medium text-neutral-700">{g.nilaiUTS}</td>
                          <td className="p-3.5 font-medium text-neutral-700">{g.nilaiUAS}</td>
                          <td className="p-3.5 font-extrabold text-neutral-900">{g.nilaiAkhir}</td>
                          <td className="p-3.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">
                              {g.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 4. TAB PRESENSI KELAS */}
            {activeTab === "presensi" && (
              <motion.div
                key="tab-presensi"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-6"
              >
                {/* Form Catat Presensi */}
                <Card className="border border-neutral-200 bg-neutral-50/60 p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-primary" />
                    <span>Catat Kehadiran / Absensi Siswa</span>
                  </h3>
                  <form onSubmit={handleInputAttendance} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Pilih Siswa</label>
                      <select
                        value={attStudentId}
                        onChange={(e) => setAttStudentId(e.target.value)}
                        className="h-9 w-full rounded-xl border border-neutral-200 bg-white px-3 text-xs text-neutral-900"
                        required
                      >
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.nis} - {s.classCode})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Tanggal</label>
                      <Input
                        type="date"
                        value={attDate}
                        onChange={(e) => setAttDate(e.target.value)}
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Status Kehadiran</label>
                      <select
                        value={attStatus}
                        onChange={(e) => setAttStatus(e.target.value as "hadir" | "izin" | "sakit" | "alpa")}
                        className="h-9 w-full rounded-xl border border-neutral-200 bg-white px-3 text-xs text-neutral-900"
                      >
                        <option value="hadir">Hadir</option>
                        <option value="izin">Izin</option>
                        <option value="sakit">Sakit</option>
                        <option value="alpa">Alpa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Keterangan</label>
                      <Input
                        value={attKet}
                        onChange={(e) => setAttKet(e.target.value)}
                        placeholder="cth. Praktikum Lab"
                        className="rounded-xl text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-4 flex justify-end">
                      <Button type="submit" size="sm" className="rounded-xl text-xs bg-primary text-white">
                        Simpan Absensi
                      </Button>
                    </div>
                  </form>
                </Card>

                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                      <tr>
                        <th className="p-3.5">Tanggal</th>
                        <th className="p-3.5">NIS Siswa</th>
                        <th className="p-3.5">Status Presensi</th>
                        <th className="p-3.5">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {attendance.map((att) => (
                        <tr key={att.id} className="hover:bg-neutral-50/50">
                          <td className="p-3.5 font-bold text-neutral-900">{att.date}</td>
                          <td className="p-3.5 text-neutral-600">{att.nis}</td>
                          <td className="p-3.5">
                            <Badge className="bg-green-50 text-green-700 border-green-200 font-bold text-[10px]">
                              {att.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="p-3.5 text-neutral-500">{att.keterangan || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 5. TAB MANAJEMEN KELAS */}
            {activeTab === "kelas" && (
              <motion.div
                key="tab-kelas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-6"
              >
                {/* Form Tambah Kelas */}
                <Card className="border border-neutral-200 bg-neutral-50/60 p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span>Tambah Rombongan Belajar (Kelas Baru)</span>
                  </h3>
                  <form onSubmit={handleCreateClass} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Kode Kelas</label>
                      <Input
                        value={classCode}
                        onChange={(e) => setClassCode(e.target.value)}
                        placeholder="cth. XI-RPL-1"
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Nama Lengkap Kelas</label>
                      <Input
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="cth. Kelas XI RPL 1"
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Peminatan Jurusan</label>
                      <select
                        value={classMajor}
                        onChange={(e) => setClassMajor(e.target.value as "RPL" | "TKJ" | "DKV" | "TJA")}
                        className="h-9 w-full rounded-xl border border-neutral-200 bg-white px-3 text-xs text-neutral-900"
                      >
                        <option value="RPL">RPL</option>
                        <option value="TKJ">TKJ</option>
                        <option value="DKV">DKV</option>
                        <option value="TJA">TJA</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Ruangan / Lab</label>
                      <Input
                        value={classRoom}
                        onChange={(e) => setClassRoom(e.target.value)}
                        placeholder="cth. Lab Software 302"
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div className="sm:col-span-4 flex justify-end">
                      <Button type="submit" size="sm" className="rounded-xl text-xs bg-primary text-white">
                        Buat Kelas Baru
                      </Button>
                    </div>
                  </form>
                </Card>

                {/* Grid Card Kelas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {classes.map((cls) => (
                    <Card key={cls.id} className="border-neutral-200 bg-white p-5 shadow-xs">
                      <CardContent className="p-0 space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-red-50 text-primary border-red-200 font-bold text-[10px]">
                            {cls.major}
                          </Badge>
                          <span className="text-xs font-semibold text-neutral-500">{cls.totalStudents} Siswa</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-neutral-900">{cls.name}</h4>
                          <span className="text-xs text-neutral-400">{cls.code}</span>
                        </div>
                        <div className="border-t border-neutral-100 pt-2.5 text-xs text-neutral-600 space-y-1">
                          <div><strong>Wali Kelas:</strong> {cls.waliKelasName}</div>
                          <div><strong>Ruang Belajar:</strong> {cls.room}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
