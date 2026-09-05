"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginHeader } from "@/components/sections/login/LoginHeader"
import { LoginVisualBanner } from "@/components/sections/login/LoginVisualBanner"
import { setStoredUser } from "@/lib/auth"
import {
  User,
  Mail,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [role, setRole] = React.useState<"siswa" | "ortu">("siswa")

  const [loading, setLoading] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    if (!name.trim()) {
      setErrorMsg("Nama lengkap wajib diisi.")
      return
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Email tidak valid.")
      return
    }

    if (password.length < 6) {
      setErrorMsg("Kata sandi minimal 6 karakter.")
      return
    }

    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak sesuai.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
          role,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.message || "Pendaftaran akun gagal.")
      } else {
        setSuccessMsg(data.message)
        if (data.user) {
          setStoredUser(data.user)
        }
        setTimeout(() => {
          router.push("/")
        }, 800)
      }
    } catch {
      setErrorMsg("Gangguan koneksi internet. Silakan coba kembali.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white selection:bg-red-600 selection:text-white">
      {/* Left Column: Form & Header */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <LoginHeader />

        <div className="mx-auto my-6 w-full max-w-sm">
          <div className="flex flex-col items-center gap-1.5 text-center mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary mb-1">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Buat Akun Portal
            </h1>
            <p className="text-xs text-neutral-500">
              Daftar akun portal terpadu untuk calon siswa atau wali murid
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

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Pilih Peran Akun
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("siswa")}
                  className={`h-9 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                    role === "siswa"
                      ? "border-primary bg-red-50 text-primary"
                      : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  Calon Siswa
                </button>
                <button
                  type="button"
                  onClick={() => setRole("ortu")}
                  className={`h-9 rounded-md border text-xs font-semibold transition-colors cursor-pointer ${
                    role === "ortu"
                      ? "border-primary bg-red-50 text-primary"
                      : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  Orang Tua / Wali
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nama Lengkap *
              </label>
              <div className="relative">
                <Input
                  type="text"
                  required
                  placeholder="cth. Muhammad Rizki"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Alamat Email Aktif *
              </label>
              <div className="relative">
                <Input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 pl-9 border-neutral-300 focus-visible:border-primary"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Kata Sandi (Min. 6 karakter) *
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
                Konfirmasi Kata Sandi *
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

            <Button type="submit" disabled={loading} className="w-full h-10 rounded-md mt-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Mendaftarkan Akun...
                </>
              ) : (
                <>
                  <span>Daftar Akun Sekarang</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <span className="text-xs text-neutral-500">
                Sudah memiliki akun?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline underline-offset-4"
                >
                  Masuk di Sini
                </Link>
              </span>
            </div>
          </form>
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
