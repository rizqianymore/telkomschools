"use client"

import Link from "next/link"
import Image from "next/image"
import { LoginForm } from "@/components/login-form"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white selection:bg-red-600 selection:text-white">
      {/* Left Column: Form & Header */}
      <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
            title="Kembali ke Halaman Utama"
          >
            <Image
              src="/img/image.png"
              alt="Logo SMK Telkom"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="text-base font-bold tracking-tight text-neutral-900 leading-none">
              SMK Telkom <span className="text-primary">Jakarta</span>
            </span>
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

        <div className="text-center text-xs text-neutral-400 border-t border-neutral-100 pt-4">
          <span>© {new Date().getFullYear()} SMK Telkom Jakarta. All rights reserved.</span>
        </div>
      </div>

      {/* Right Column: Clean Neutral Brand Visual */}
      <div className="relative hidden bg-neutral-900 lg:block overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop"
          alt="SMK Telkom Jakarta Campus"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/50" />

        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <div className="max-w-md space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-700 bg-neutral-800/80 px-3 py-1 text-xs font-medium text-neutral-200">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Portal Akademik & Layanan</span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Pusat Pembelajaran & Aktivitas Digital
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Satu portal terpadu untuk monitoring kemajuan studi, akses kurikulum industri, dan layanan administrasi sekolah.
            </p>

            <div className="pt-2 space-y-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Pencatatan presensi, nilai, dan tugas digital</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Akses materi kurikulum berbasis industri</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>Layanan konsultasi dan komunikasi guru-siswa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
