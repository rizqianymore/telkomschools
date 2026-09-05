"use client"

import * as React from "react"
import {
  Users,
  ShieldCheck,
  Phone,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PendaftarPPDB } from "@/lib/ppdb-data"
import { getStoredUser } from "@/lib/auth"

export default function SiswaOrtuPage() {
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
      {/* Header Bar */}
        <div className="pb-1 border-b border-border">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
            Data Orang Tua & Wali Murid
          </h1>
          <p className="text-xs text-muted-foreground">
            Informasi identitas orang tua/wali pemantau terpadu yang terdaftar dalam sistem akademik
          </p>
        </div>

        {/* Status Hubungan Info Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-lg border border-border bg-muted/20">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
          <div className="text-xs leading-relaxed">
            <p className="font-semibold text-foreground">Akun Terpadu Siswa & Wali Murid</p>
            <p className="text-muted-foreground">
              Orang tua murid memantau perkembangan akademik anak, invoice SPP, dan absensi harian secara langsung melalui akun terpadu ini tanpa perlu akun terpisah.
            </p>
          </div>
        </div>

        {/* 2 Kolom: Data Ayah & Ibu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Ayah */}
          <Card className="rounded-lg border-border shadow-none">
            <CardHeader className="border-b border-border p-3.5">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <CardTitle className="text-xs sm:text-sm font-semibold">Data Ayah Kandung / Wali</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3.5 space-y-2.5 text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px]">Nama Lengkap Ayah:</span>
                <span className="font-semibold text-foreground text-xs sm:text-sm">
                  {pendaftaran?.nama_ayah || "Bambang Prasetyo"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Profesi / Pekerjaan:</span>
                <span className="font-medium text-foreground">
                  {pendaftaran?.pekerjaan_ayah || "Karyawan BUMN Telkom"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Status Hubungan:</span>
                <span className="font-medium text-foreground">Orang Tua Kandung</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Akses Pemantauan:</span>
                <Badge variant="outline" className="text-[10px] text-green-700 bg-green-500/10 border-green-200 mt-1">
                  Aktif Terhubung
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Ibu */}
          <Card className="rounded-lg border-border shadow-none">
            <CardHeader className="border-b border-border p-3.5">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <CardTitle className="text-xs sm:text-sm font-semibold">Data Ibu Kandung</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-3.5 space-y-2.5 text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px]">Nama Lengkap Ibu:</span>
                <span className="font-semibold text-foreground text-xs sm:text-sm">
                  {pendaftaran?.nama_ibu || "Endang Sulastri"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Profesi / Pekerjaan:</span>
                <span className="font-medium text-foreground">
                  {pendaftaran?.pekerjaan_ibu || "Guru Matematika"}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Status Hubungan:</span>
                <span className="font-medium text-foreground">Orang Tua Kandung</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Akses Pemantauan:</span>
                <Badge variant="outline" className="text-[10px] text-green-700 bg-green-500/10 border-green-200 mt-1">
                  Aktif Terhubung
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kontak & Domisili */}
        <Card className="rounded-lg border-border shadow-none">
          <CardHeader className="border-b border-border p-3.5">
            <CardTitle className="text-xs sm:text-sm font-semibold">Kontak Darurat & Alamat Rumah Keluarga</CardTitle>
            <CardDescription className="text-xs">
              Digunakan oleh pihak sekolah untuk komunikasi resmi atau darurat
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="flex items-start gap-2.5">
              <Phone className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-muted-foreground block text-[10px]">Nomor WhatsApp Orang Tua:</span>
                <span className="font-semibold text-foreground text-xs sm:text-sm">
                  {pendaftaran?.no_hp_ortu || "0812-8899-0011"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-muted-foreground block text-[10px]">Alamat Domisili Tetap:</span>
                <span className="font-medium text-foreground leading-relaxed">
                  {pendaftaran?.alamat_ortu || "Jl. Daan Mogot KM. 11, Kalideres, Jakarta Barat, DKI Jakarta"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
