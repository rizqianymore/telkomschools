"use client"

import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { GraduationCap, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white selection:bg-red-600 selection:text-white">
      {/* Left Column: Form & Header */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-neutral-900 leading-none">
                SMK Telkom <span className="text-primary">Jakarta</span>
              </span>
              <span className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider mt-1">
                Sistem Informasi Terpadu
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        <div className="mx-auto my-8 w-full max-w-sm">
          <LoginForm />
        </div>

        <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-100 pt-4">
          <span>© {new Date().getFullYear()} SMK Telkom Jakarta</span>
          <div className="flex items-center gap-1 text-neutral-500">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span>Sistem Terenkripsi & Terverifikasi</span>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Brand Card */}
      <div className="relative hidden bg-neutral-900 lg:block overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop"
          alt="SMK Telkom Jakarta Campus"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/40" />

        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <div className="max-w-md space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/60 px-3 py-1 text-xs font-semibold text-red-200">
              <span>Portal Akademik & Layanan</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-white">
              Pusat Aktivitas Akademik & Komunikasi Sekolah
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Satu portal terintegrasi untuk mendukung proses belajar mengajar, monitoring perkembangan studi siswa, serta manajemen operasional sekolah secara efisien.
            </p>

            <div className="pt-2 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Pencatatan presensi, nilai, dan rekap tugas digital</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Akses materi kurikulum berbasis industri teknologi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Layanan konsultasi dan komunikasi terpadu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
