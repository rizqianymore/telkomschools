"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { setStoredUser } from "@/lib/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  // Otomatisasi pesan & field error
  const [errorField, setErrorField] = React.useState<"identifier" | "password" | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  // Validasi real-time saat pengguna mengetik (auto clear error)
  const handleIdentifierChange = (val: string) => {
    setIdentifier(val)
    if (errorField === "identifier") {
      setErrorField(null)
      setErrorMessage(null)
    }
  }

  const handlePasswordChange = (val: string) => {
    setPassword(val)
    if (errorField === "password") {
      setErrorField(null)
      setErrorMessage(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorField(null)
    setErrorMessage(null)
    setSuccessMessage(null)

    // Validasi otomatis sebelum kirim
    if (!identifier.trim()) {
      setErrorField("identifier")
      setErrorMessage("Silakan masukkan NIS / NIP / Email Anda.")
      return
    }

    if (!password.trim()) {
      setErrorField("password")
      setErrorMessage("Silakan masukkan kata sandi Anda.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim(), password: password.trim() }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorField(data.field || null)
        setErrorMessage(data.message || "Gagal masuk ke sistem.")
      } else {
        setSuccessMessage(data.message)
        if (data.user) {
          setStoredUser(data.user)
        }
        const search = typeof window !== "undefined" ? window.location.search : ""
        const params = new URLSearchParams(search)
        const redirectUrl = params.get("redirect")

        setTimeout(() => {
          if (redirectUrl) {
            router.push(redirectUrl)
          } else if (data.user?.role === "guru") {
            router.push("/dashboard/guru")
          } else if (data.user?.role === "staff") {
            router.push("/dashboard/staff")
          } else {
            router.push("/")
          }
        }, 750)
      }
    } catch {
      setErrorMessage("Gagal terhubung ke server. Periksa koneksi internet Anda.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-5", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Masuk Portal Terpadu
          </h1>
          <p className="text-sm text-neutral-500 text-balance">
            Masukkan identitas akun dan kata sandi Anda untuk melanjutkan
          </p>
        </div>

        {/* Notifikasi Alert Error Otomatis */}
        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
            <div className="leading-snug">{errorMessage}</div>
          </div>
        )}

        {/* Notifikasi Alert Sukses */}
        {successMessage && (
          <div className="flex items-start gap-2.5 rounded-md border border-neutral-200 bg-neutral-50 p-3 text-xs font-medium text-neutral-900">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary mt-0.5" />
            <div className="leading-snug">{successMessage}</div>
          </div>
        )}

        {/* Input Identifier Tunggal: NIS / NIP / Email (Tanpa teks pemisah) */}
        <Field>
          <FieldLabel htmlFor="identifier" className="text-xs font-semibold text-neutral-700">
            NIS / NIP / Email
          </FieldLabel>
          <Input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) => handleIdentifierChange(e.target.value)}
            placeholder="Masukkan NIS / NIP / Email"
            autoComplete="username"
            className={cn(
              errorField === "identifier"
                ? "border-red-500 ring-2 ring-red-500/10 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                : "border-neutral-300 focus-visible:border-primary focus-visible:ring-primary/20"
            )}
            required
          />
        </Field>

        {/* Input Password */}
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-xs font-semibold text-neutral-700">
              Kata Sandi
            </FieldLabel>
            <a
              href="#"
              className="text-xs text-neutral-500 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Lupa kata sandi?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className={cn(
              errorField === "password"
                ? "border-red-500 ring-2 ring-red-500/10 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                : "border-neutral-300 focus-visible:border-primary focus-visible:ring-primary/20"
            )}
            required
          />
        </Field>

        {/* Submit Button */}
        <Field className="mt-1">
            <button
              type="submit"
              disabled={loading}
              className={cn("w-full h-10 px-5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none cursor-pointer", loading && "flex items-center justify-center gap-2")}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Memverifikasi Akun...
                </>
              ) : (
                "Masuk ke Portal"
              )}
            </button>
        </Field>

        <FieldDescription className="text-center text-xs text-neutral-500">
          Belum terdaftar sebagai siswa baru?{" "}
          <a href="/kontak" className="font-medium text-primary hover:underline underline-offset-4">
            Daftar PPDB Di Sini
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
