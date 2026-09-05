"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginHeader } from "@/components/sections/login/LoginHeader"
import { LoginVisualBanner } from "@/components/sections/login/LoginVisualBanner"
import {
  Mail,
  KeyRound,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

export default function LupaPasswordPage() {
  const router = useRouter()
  // Step 1: Request OTP -> Step 2: Verify OTP -> Step 3: Set New Password -> Step 4: Success
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1)

  const [email, setEmail] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [demoOtpCode, setDemoOtpCode] = React.useState<string | null>(null)
  const [resetToken, setResetToken] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")

  const [loading, setLoading] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  // Step 1: Kirim Permintaan OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!email.trim()) {
      setErrorMsg("Email akun wajib diisi.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request", email: email.trim() }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Gagal meminta kode OTP.")
      } else {
        setSuccessMsg(data.message)
        if (data.demoOtp) {
          setDemoOtpCode(data.demoOtp)
        }
        setStep(2)
      }
    } catch {
      setErrorMsg("Gangguan koneksi internet. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verifikasi Kode OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!otp.trim() || otp.trim().length !== 6) {
      setErrorMsg("Kode OTP harus 6 digit angka.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", email: email.trim(), otp: otp.trim() }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Kode OTP tidak valid.")
      } else {
        setSuccessMsg("Verifikasi OTP berhasil! Silakan tentukan kata sandi baru.")
        setResetToken(data.resetToken)
        setStep(3)
      }
    } catch {
      setErrorMsg("Gangguan koneksi internet. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Atur Kata Sandi Baru
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (newPassword.length < 6) {
      setErrorMsg("Kata sandi baru minimal 6 karakter.")
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword }),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Gagal mengatur ulang kata sandi.")
      } else {
        setSuccessMsg(data.message)
        setStep(4)
      }
    } catch {
      setErrorMsg("Gangguan koneksi internet. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white selection:bg-red-600 selection:text-white">
      {/* Left Column: Form & Header */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <LoginHeader />

        <div className="mx-auto my-8 w-full max-w-sm">
          {/* Header Title */}
          <div className="flex flex-col items-center gap-1.5 text-center mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary mb-1">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Reset Kata Sandi
            </h1>
            <p className="text-xs text-neutral-500">
              {step === 1 && "Langkah 1: Masukkan email untuk menerima kode OTP"}
              {step === 2 && "Langkah 2: Masukkan kode OTP 6 digit"}
              {step === 3 && "Langkah 3: Buat kata sandi baru akun Anda"}
              {step === 4 && "Langkah 4: Kata sandi berhasil diperbarui"}
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="mb-4 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              <div className="leading-snug">{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 flex items-start gap-2.5 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-xs font-medium text-neutral-900">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <div className="leading-snug">{successMsg}</div>
            </div>
          )}

          {/* STEP 1: FORM REQUEST OTP */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Email Akun Terdaftar
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    required
                    placeholder="nama@smktelkom-jkt.sch.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-10 rounded-md">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Mengirim OTP...
                  </>
                ) : (
                  <>
                    <span>Kirim Kode OTP</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="text-xs text-neutral-500 hover:text-primary transition-colors underline-offset-4 hover:underline"
                >
                  Kembali ke Halaman Masuk
                </Link>
              </div>
            </form>
          )}

          {/* STEP 2: FORM VERIFY OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {demoOtpCode && (
                <div className="p-3 rounded-md bg-amber-50 border border-amber-200 text-xs text-amber-800">
                  <span className="font-bold">Kode OTP Demo:</span> {demoOtpCode}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Kode OTP 6 Digit
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="h-10 pl-9 font-mono tracking-widest text-center text-base border-neutral-300 focus-visible:border-primary"
                  />
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
                <p className="mt-1 text-[11px] text-neutral-500">
                  Kode dikirim ke <span className="font-semibold text-neutral-700">{email}</span>
                </p>
              </div>

              <Button type="submit" disabled={loading} className="w-full h-10 rounded-md">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Memverifikasi...
                  </>
                ) : (
                  "Verifikasi OTP"
                )}
              </Button>

              <div className="flex justify-between items-center text-xs pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-neutral-500 hover:text-neutral-800 cursor-pointer"
                >
                  Ganti Email
                </button>
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={loading}
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                  Kirim Ulang OTP
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: FORM NEW PASSWORD */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Kata Sandi Baru (Min. 6 karakter)
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Konfirmasi Kata Sandi Baru
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

              <Button type="submit" disabled={loading} className="w-full h-10 rounded-md">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Menyimpan Kata Sandi...
                  </>
                ) : (
                  "Simpan Kata Sandi Baru"
                )}
              </Button>
            </form>
          )}

          {/* STEP 4: SUCCESS COMPLETE */}
          {step === 4 && (
            <div className="space-y-5 text-center">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-3" />
                <h2 className="text-base font-bold text-neutral-900">Kata Sandi Berhasil Diperbarui!</h2>
                <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                  Sekarang Anda dapat masuk ke Portal Terpadu SMK Telkom Jakarta dengan kata sandi baru Anda.
                </p>
              </div>

              <Button
                onClick={() => router.push("/login")}
                className="w-full h-10 rounded-md"
              >
                Masuk ke Akun Sekarang
              </Button>
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
