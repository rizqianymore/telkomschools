"use client"

import * as React from "react"
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Gagal melakukan login.")
      } else {
        setSuccessMessage(`${data.message} (Login sebagai: ${data.user.name})`)
      }
    } catch {
      setErrorMessage("Koneksi ke server gagal. Pastikan koneksi internet stabil.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Masuk ke Portal
          </h1>
          <p className="text-sm text-neutral-500 text-balance">
            Masukkan email dan password Anda untuk mengakses sistem SMK Telkom Jakarta
          </p>
        </div>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs font-medium text-neutral-900">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
            <span>{successMessage}</span>
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email" className="text-xs font-semibold text-neutral-700">
            Alamat Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@smktelkom-jkt.sch.id"
            className="rounded-xl border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/20"
            required
          />
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password" className="text-xs font-semibold text-neutral-700">
              Kata Sandi
            </FieldLabel>
            <a
              href="#"
              className="text-xs text-neutral-500 hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Lupa sandi?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="rounded-xl border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/20"
            required
          />
        </Field>

        <Field className="mt-1">
          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl py-2.5 text-sm font-semibold bg-primary text-white hover:bg-red-700 shadow-sm"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Memverifikasi...
              </span>
            ) : (
              "Masuk Sekarang"
            )}
          </Button>
        </Field>

        {/* Demo Account Hint */}
        <div className="rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-3 text-xs text-neutral-600 space-y-1">
          <div className="font-semibold text-neutral-800">Akun Contoh (MySQL Query Demo):</div>
          <div>• Email: <span className="font-mono text-neutral-900 font-medium">admin@smktelkom-jkt.sch.id</span> (sandi: <span className="font-mono text-neutral-900 font-medium">admin123</span>)</div>
          <div>• Email: <span className="font-mono text-neutral-900 font-medium">siswa@smktelkom-jkt.sch.id</span> (sandi: <span className="font-mono text-neutral-900 font-medium">siswa123</span>)</div>
        </div>

        <FieldDescription className="text-center text-xs text-neutral-500">
          Belum memiliki akun siswa baru?{" "}
          <a href="/kontak" className="font-medium text-primary hover:underline underline-offset-4">
            Daftar PPDB Di Sini
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  )
}
