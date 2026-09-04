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
import { CheckCircle2, AlertCircle, Loader2, GraduationCap, Users, BookOpen, Shield } from "lucide-react"
import type { UserRole } from "@/lib/db"

const roles: { key: UserRole; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "siswa", label: "Siswa", icon: GraduationCap },
  { key: "ortu", label: "Orang Tua", icon: Users },
  { key: "guru", label: "Guru", icon: BookOpen },
  { key: "admin", label: "Admin", icon: Shield },
]

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [selectedRole, setSelectedRole] = React.useState<UserRole>("siswa")
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
        body: JSON.stringify({ email, password, role: selectedRole }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Gagal melakukan verifikasi akun.")
      } else {
        setSuccessMessage(data.message)
      }
    } catch {
      setErrorMessage("Koneksi ke server gagal. Periksa jaringan Anda.")
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
            Pilih peran Anda dan masukkan identitas akun untuk melanjutkan
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50/80 p-1">
          {roles.map((r) => {
            const Icon = r.icon
            const isActive = selectedRole === r.key
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => {
                  setSelectedRole(r.key)
                  setErrorMessage(null)
                  setSuccessMessage(null)
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-lg py-2 px-1 text-xs font-semibold transition-all",
                  isActive
                    ? "bg-white text-primary shadow-xs border border-neutral-200"
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-neutral-500")} />
                <span className="leading-tight">{r.label}</span>
              </button>
            )
          })}
        </div>

        {/* Feedback Alert Messages */}
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
            Alamat Email ({roles.find((r) => r.key === selectedRole)?.label})
          </FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={`nama@smktelkom-jkt.sch.id`}
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
              Lupa kata sandi?
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
              `Masuk sebagai ${roles.find((r) => r.key === selectedRole)?.label}`
            )}
          </Button>
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
