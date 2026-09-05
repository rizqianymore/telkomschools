"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { LoginHeader } from "@/components/sections/login/LoginHeader"
import { LoginVisualBanner } from "@/components/sections/login/LoginVisualBanner"
import { setStoredUser } from "@/lib/auth"
import {
  User,
  Mail,
  Lock,
  Phone,
  School,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  GraduationCap,
  FileCheck,
} from "lucide-react"

export default function RegisterCalonSiswaPage() {
  const router = useRouter()
  // Multi-step Registration ala BINUS Online Admission
  // Step 1: Data Diri Calon Siswa & Akun
  // Step 2: Pilihan Jurusan & Asal Sekolah
  // Step 3: Pendaftaran Sukses & Nomor Registrasi
  const [currentStep, setCurrentStep] = React.useState<1 | 2 | 3>(1)

  // Step 1 fields
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  // Step 2 fields (Binus-style Admission Details)
  const [nisn, setNisn] = React.useState("")
  const [schoolOrigin, setSchoolOrigin] = React.useState("")
  const [major1, setMajor1] = React.useState<"RPL" | "TKJ" | "DKV" | "TJA">("RPL")
  const [major2, setMajor2] = React.useState<"RPL" | "TKJ" | "DKV" | "TJA">("TKJ")
  const [track, setTrack] = React.useState<"prestasi" | "reguler_1" | "reguler_2" | "kemitraan">("reguler_1")

  // Result state
  const [registeredNo, setRegisteredNo] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)

  // Validasi Step 1 sebelum lanjut ke Step 2
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!name.trim()) {
      setErrorMsg("Nama lengkap calon siswa wajib diisi.")
      return
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Alamat email aktif wajib diisi dengan benar.")
      return
    }

    if (!phone.trim()) {
      setErrorMsg("Nomor WhatsApp/HP calon siswa wajib diisi.")
      return
    }

    if (password.length < 6) {
      setErrorMsg("Kata sandi minimal 6 karakter.")
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok.")
      return
    }

    setCurrentStep(2)
  }

  // Submit Final (Step 2)
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim(),
          nisn: nisn.trim(),
          schoolOrigin: schoolOrigin.trim(),
          major1,
          major2: major1 === major2 ? undefined : major2,
          track,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Pendaftaran gagal. Silakan coba kembali.")
      } else {
        setRegisteredNo(data.noPendaftaran)
        if (data.user) {
          setStoredUser(data.user)
        }
        setCurrentStep(3)
      }
    } catch {
      setErrorMsg("Terjadi gangguan koneksi. Periksa jaringan internet Anda.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white selection:bg-red-600 selection:text-white">
      {/* Left Column: Form & Header */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <LoginHeader />

        <div className="mx-auto my-6 w-full max-w-md">
          {/* Header Title & BINUS-style Step Indicator */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-[11px] border-red-200 bg-red-50 text-primary font-medium">
                Pendaftaran Calon Siswa Baru 2026/2027
              </Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Registrasi Akun Admisi PPDB
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Satu akun terpadu untuk memilih jurusan, verifikasi berkas, dan memantau status kelulusan.
            </p>

            {/* Stepper Wizard Bar */}
            {currentStep !== 3 && (
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold">
                <div
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                    currentStep === 1
                      ? "border-primary bg-red-50/70 text-primary"
                      : "border-neutral-200 bg-neutral-50 text-neutral-500"
                  }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px]">
                    1
                  </span>
                  <span>Data Akun & Kontak</span>
                </div>

                <div
                  className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                    currentStep === 2
                      ? "border-primary bg-red-50/70 text-primary"
                      : "border-neutral-200 bg-neutral-50 text-neutral-500"
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    currentStep === 2 ? "bg-primary text-white" : "bg-neutral-200 text-neutral-600"
                  }`}>
                    2
                  </span>
                  <span>Peminatan Jurusan</span>
                </div>
              </div>
            )}
          </div>

          {/* Feedback Error Alert */}
          {errorMsg && (
            <div className="mb-4 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              <div className="leading-snug">{errorMsg}</div>
            </div>
          )}

          {/* STEP 1: DATA DIRI & AKUN */}
          {currentStep === 1 && (
            <form onSubmit={handleProceedToStep2} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Nama Lengkap Calon Siswa *
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    required
                    placeholder="cth. Muhammad Rizki Ramadhan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Alamat Email Calon Siswa (Untuk Akun & Notifikasi) *
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    required
                    placeholder="nama@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Nomor WhatsApp Calon Siswa / Wali *
                </label>
                <div className="relative">
                  <Input
                    type="tel"
                    required
                    placeholder="cth. 081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                  />
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Kata Sandi (Min. 6 Karakter) *
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                    />
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Konfirmasi Sandi *
                  </label>
                  <div className="relative">
                    <Input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                    />
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-10 rounded-md mt-2">
                <span>Lanjut ke Peminatan Jurusan</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>

              <div className="text-center pt-2">
                <span className="text-xs text-neutral-500">
                  Sudah memiliki akun calon siswa?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-primary hover:underline underline-offset-4"
                  >
                    Masuk ke Portal
                  </Link>
                </span>
              </div>
            </form>
          )}

          {/* STEP 2: PEMINATAN JURUSAN & ASAL SEKOLAH (BINUS STYLE) */}
          {currentStep === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Jalur Pendaftaran PPDB
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTrack("reguler_1")}
                    className={`p-2 rounded-md border text-left text-xs transition-colors cursor-pointer ${
                      track === "reguler_1"
                        ? "border-primary bg-red-50 text-primary font-bold"
                        : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <div>Jalur Reguler Gelombang 1</div>
                    <div className="text-[10px] text-neutral-500 font-normal">Tes Potensi & Minat Bakat</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTrack("prestasi")}
                    className={`p-2 rounded-md border text-left text-xs transition-colors cursor-pointer ${
                      track === "prestasi"
                        ? "border-primary bg-red-50 text-primary font-bold"
                        : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    <div>Jalur Prestasi Unggulan</div>
                    <div className="text-[10px] text-neutral-500 font-normal">Nilai Rapor & Sertifikat</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Pilihan Jurusan Prioritas 1 *
                  </label>
                  <select
                    value={major1}
                    onChange={(e) => setMajor1(e.target.value as any)}
                    className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-xs text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                    <option value="TKJ">Teknik Komputer & Jaringan (TKJ)</option>
                    <option value="DKV">Desain Komunikasi Visual (DKV)</option>
                    <option value="TJA">Teknik Jaringan Akses (TJA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Pilihan Jurusan Prioritas 2 (Opsional)
                  </label>
                  <select
                    value={major2}
                    onChange={(e) => setMajor2(e.target.value as any)}
                    className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-xs text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="TKJ">Teknik Komputer & Jaringan (TKJ)</option>
                    <option value="RPL">Rekayasa Perangkat Lunak (RPL)</option>
                    <option value="DKV">Desain Komunikasi Visual (DKV)</option>
                    <option value="TJA">Teknik Jaringan Akses (TJA)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Asal Sekolah (SMP / MTs) *
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    required
                    placeholder="cth. SMP Negeri 111 Jakarta Barat"
                    value={schoolOrigin}
                    onChange={(e) => setSchoolOrigin(e.target.value)}
                    className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                  />
                  <School className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Nomor Induk Siswa Nasional (NISN)
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    maxLength={10}
                    placeholder="10 digit NISN (cth. 0078123456)"
                    value={nisn}
                    onChange={(e) => setNisn(e.target.value.replace(/\D/g, ""))}
                    className="h-10 pl-9 border-neutral-300 focus-visible:border-primary font-mono text-xs"
                  />
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
                <p className="text-[10px] text-neutral-400 mt-1">
                  Dapat dilengkapi nanti saat proses verifikasi berkas rapor.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  disabled={loading}
                  className="h-10 px-4 text-xs font-semibold border-neutral-200"
                >
                  Kembali
                </Button>

                <Button type="submit" disabled={loading} className="flex-1 h-10 rounded-md">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Memproses Pendaftaran...
                    </>
                  ) : (
                    <>
                      <span>Kirim & Terbitkan Nomor Pendaftaran</span>
                      <Sparkles className="h-4 w-4 ml-1.5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS BUKTI PENDAFTARAN & NO REGISTRASI */}
          {currentStep === 3 && (
            <div className="space-y-5 text-center">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-3">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="text-lg font-bold text-neutral-900">Pendaftaran Calon Siswa Berhasil!</h2>
                <p className="mt-1 text-xs text-neutral-600">
                  Selamat datang, <strong className="text-neutral-900">{name}</strong>. Berkas pendaftaran awal Anda telah resmi tercatat di sistem admisi SMK Telkom Jakarta.
                </p>

                {registeredNo && (
                  <div className="mt-5 rounded-lg border border-red-200 bg-white p-3.5">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                      Nomor Registrasi PPDB Anda
                    </div>
                    <div className="text-2xl font-black text-primary tracking-wide mt-1">
                      {registeredNo}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1">
                      Bukti pendaftaran dan salinan akun telah dikirimkan ke <span className="font-semibold text-neutral-800">{email}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => router.push("/")}
                  className="w-full h-10 rounded-md"
                >
                  <span>Masuk ke Dashboard & Beranda</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
                <Link
                  href="/quiz"
                  className="inline-block text-xs text-neutral-500 hover:text-primary transition-colors underline-offset-4 hover:underline pt-1"
                >
                  Ingin coba tes minat jurusan kembali? Ikuti Quiz
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-xs text-neutral-400 border-t border-neutral-100 pt-4">
          <span>© {new Date().getFullYear()} SMK Telkom Jakarta. All rights reserved.</span>
        </div>
      </div>

      {/* Right Column: Clean Neutral Brand Visual */}
      <LoginVisualBanner />
    </div>
  )
}
