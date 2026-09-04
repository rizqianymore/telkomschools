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

interface RoleConfig {
  key: UserRole
  label: string
  icon: React.ComponentType<{ className?: string }>
  identifierLabel: string
  placeholder: string
  helperText: string
}

const roleConfigs: RoleConfig[] = [
  {
    key: "siswa",
    label: "Siswa",
    icon: GraduationCap,
    identifierLabel: "Nomor Induk Siswa (NIS) atau Email",
    placeholder: "Contoh: 10214055 atau nama@smktelkom-jkt.sch.id",
    helperText: "Gunakan NIS resmi atau email siswa yang terdaftar",
  },
  {
    key: "ortu",
    label: "Orang Tua",
    icon: Users,
    identifierLabel: "Alamat Email Orang Tua",
    placeholder: "nama@smktelkom-jkt.sch.id",
    helperText: "Email yang didaftarkan saat registrasi PPDB",
  },
  {
    key: "guru",
    label: "Guru",
    icon: BookOpen,
    identifierLabel: "NIP atau Email Pendidik",
    placeholder: "Contoh: 19850412... atau guru@smktelkom-jkt.sch.id",
    helperText: "Gunakan NIP resmi atau email kedinasan SMK Telkom",
  },
  {
    key: "admin",
    label: "Admin",
    icon: Shield,
    identifierLabel: "Email Administrator",
    placeholder: "admin@smktelkom-jkt.sch.id",
    helperText: "Akses khusus pengelola sistem dan PPDB",
  },
]

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [selectedRole, setSelectedRole] = React.useState<UserRole>("siswa")
  const [identifier, setIdentifier] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  const activeConfig = roleConfigs.find((r) => r.key === selectedRole) || roleConfigs[0]

  // Otomatis mengenali input identifier jika pengguna mengetik NIP / NIS
  const handleIdentifierChange = (val: string) => {
    setIdentifier(val)
    const trimmed = val.trim()

    // Jika berupa angka 18 digit -> otomatis ganti ke Guru (format NIP)
    if (/^\d{16,18}$/.test(trimmed)) {
      if (selectedRole !== "guru") setSelectedRole("guru")
    }
    // Jika berupa angka 8 digit -> otomatis ganti ke Siswa (format NIS)
    else if (/^\d{7,10}$/.test(trimmed)) {
      if (selectedRole !== "siswa") setSelectedRole("siswa")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, role: selectedRole }),
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
          {roleConfigs.map((r) => {
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

        {/* Dynamic Identifier Field (NIS/Email for Siswa, NIP/Email for Guru, Email for Ortu/Admin) */}
        <Field>
          <FieldLabel htmlFor="identifier" className="text-xs font-semibold text-neutral-700">
            {activeConfig.identifierLabel}
          </FieldLabel>
          <Input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e) => handleIdentifierChange(e.target.value)}
            placeholder={activeConfig.placeholder}
            className="rounded-xl border-neutral-200 focus-visible:border-primary focus-visible:ring-primary/20"
            required
          />
          <span className="text-[11px] text-neutral-400 mt-0.5">
            {activeConfig.helperText}
          </span>
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
              `Masuk sebagai ${activeConfig.label}`
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
