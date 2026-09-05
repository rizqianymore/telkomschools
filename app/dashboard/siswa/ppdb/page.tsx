"use client"

import * as React from "react"
import Link from "next/link"
import {
  FileCheck,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Printer,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PendaftarPPDB } from "@/lib/ppdb-data"
import { getStoredUser } from "@/lib/auth"

export default function SiswaPPDBPage() {
  const [pendaftaran, setPendaftaran] = React.useState<PendaftarPPDB | null>(null)

  React.useEffect(() => {
    let isMounted = true
    const stored = getStoredUser()
    const queryEmail = stored?.email || "siswa@smktelkom-jkt.sch.id"

    fetch(`/api/ppdb/status?q=${encodeURIComponent(queryEmail)}`)
      .then((r) => r.json())
      .then((json) => {
        if (isMounted && json.success && json.pendaftaran) {
          setPendaftaran(json.pendaftaran)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="space-y-5">
      {/* Header Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 border-b border-border">
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Status Pendaftaran Calon Siswa
            </h1>
            <p className="text-xs text-muted-foreground">
              Informasi berkas pendaftaran dan hasil verifikasi panitia PPDB online
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="text-xs h-8 px-3 rounded-md"
            >
              <Printer className="h-3.5 w-3.5 mr-1.5" />
              Cetak Bukti
            </Button>
            <Button
              size="sm"
              render={<Link href="/program" />}
              className="text-xs h-8 px-3 rounded-md"
            >
              Kurikulum Jurusan
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>
        </div>

        {/* Main Status Card */}
        <Card className="rounded-lg border-border shadow-none">
          <CardHeader className="border-b border-border p-4 pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <FileCheck className="h-4 w-4" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Lembar Registrasi PPDB</CardTitle>
                  <CardDescription className="text-xs">
                    Nomor registrasi resmi: <span className="font-semibold text-foreground">{pendaftaran?.no_pendaftaran || "PPDB-2026-0001"}</span>
                  </CardDescription>
                </div>
              </div>
              <Badge
                className={`text-[11px] font-semibold px-2 py-0.5 w-fit ${
                  pendaftaran?.status === "lulus_seleksi"
                    ? "bg-green-500/10 text-green-700 border-green-200"
                    : pendaftaran?.status === "terverifikasi"
                    ? "bg-blue-500/10 text-blue-700 border-blue-200"
                    : "bg-amber-500/10 text-amber-700 border-amber-200"
                }`}
              >
                {pendaftaran?.status === "lulus_seleksi" && "Lulus Seleksi Masuk"}
                {pendaftaran?.status === "terverifikasi" && "Berkas Terverifikasi"}
                {pendaftaran?.status === "menunggu_verifikasi" && "Menunggu Verifikasi"}
                {pendaftaran?.status === "tidak_lulus" && "Belum Lulus Seleksi"}
                {!pendaftaran?.status && "Berkas Terverifikasi"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-5 space-y-5">
            {/* Grid Data Pendaftaran */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-md border border-border p-3 bg-muted/20">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                  Nomor Registrasi
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block truncate">
                  {pendaftaran?.no_pendaftaran || "PPDB-2026-0001"}
                </span>
              </div>

              <div className="rounded-md border border-border p-3 bg-muted/20">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                  Jalur Seleksi
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground uppercase mt-0.5 block truncate">
                  {pendaftaran?.jalur || "PRESTASI"}
                </span>
              </div>

              <div className="rounded-md border border-border p-3 bg-muted/20">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                  Jurusan Pilihan
                </span>
                <span className="text-xs sm:text-sm font-bold text-primary mt-0.5 block truncate">
                  {pendaftaran?.jurusan_pilihan_1 || "RPL (Rekayasa Perangkat Lunak)"}
                </span>
              </div>

              <div className="rounded-md border border-border p-3 bg-muted/20">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider block">
                  Asal Sekolah
                </span>
                <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5 block truncate">
                  {pendaftaran?.asal_sekolah || "SMP Negeri 111 Jakarta"}
                </span>
              </div>
            </div>

            {/* Catatan Panitia */}
            <div className="rounded-md border border-blue-200 bg-blue-50/50 p-3.5 text-xs text-blue-950">
              <div className="font-semibold flex items-center gap-1.5 mb-1 text-blue-900">
                <AlertCircle className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>Catatan Panitia PPDB:</span>
              </div>
              <p className="leading-relaxed text-blue-900/90 text-xs">
                &quot;{pendaftaran?.catatan_petugas || "Berkas administrasi dan nilai rapor semester 1-5 telah diverifikasi lengkap. Selamat mengikuti tahapan orientasi siswa baru."}&quot;
              </p>
            </div>

            {/* Tahapan Seleksi List */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Progres Tahapan Seleksi
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="flex items-center gap-2.5 p-2.5 rounded-md border border-green-200 bg-green-50/40">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-green-950">1. Formulir Online</p>
                    <p className="text-[10px] text-green-800">Selesai disubmit</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-md border border-green-200 bg-green-50/40">
                  <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-green-950">2. Verifikasi Berkas</p>
                    <p className="text-[10px] text-green-800">Diverifikasi panitia</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-md border border-blue-200 bg-blue-50/40">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-blue-950">3. Registrasi Ulang</p>
                    <p className="text-[10px] text-blue-800">Menunggu jadwal KBM</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
