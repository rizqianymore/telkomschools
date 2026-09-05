"use client"

import * as React from "react"
import {
  BookOpen,
  CalendarCheck,
  CreditCard,
  FileCheck,
  Users,
  Sparkles,
} from "lucide-react"
import { SiswaWelcomeBanner } from "@/components/dashboard/siswa-welcome-banner"
import { SiswaStatCard } from "@/components/dashboard/siswa-stat-card"
import { SiswaModuleCard } from "@/components/dashboard/siswa-module-card"
import { PendaftarPPDB } from "@/lib/ppdb-data"
import { NilaiItem, PresensiItem, TagihanItem } from "@/lib/academic-data"
import { getStoredUser } from "@/lib/auth"

export default function SiswaDashboardPage() {
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null)
  const [pendaftaran, setPendaftaran] = React.useState<PendaftarPPDB | null>(null)
  const [grades, setGrades] = React.useState<NilaiItem[]>([])
  const [attendance, setAttendance] = React.useState<PresensiItem[]>([])
  const [bills, setBills] = React.useState<TagihanItem[]>([])

  React.useEffect(() => {
    let isMounted = true
    const stored = getStoredUser()
    const queryEmail = stored?.email || "siswa@smktelkom-jkt.sch.id"

    Promise.all([
      Promise.resolve(stored ? { name: stored.name, email: stored.email } : null),
      fetch(`/api/ppdb/status?q=${encodeURIComponent(queryEmail)}`).then((r) => r.json()).catch(() => null),
      fetch("/api/academic/nilai").then((r) => r.json()).catch(() => null),
      fetch("/api/academic/attendance").then((r) => r.json()).catch(() => null),
      fetch("/api/academic/bills").then((r) => r.json()).catch(() => null),
    ])
      .then(([userData, ppdbJson, gradesJson, attJson, billsJson]) => {
        if (!isMounted) return
        if (userData) setUser(userData)
        if (ppdbJson?.success && ppdbJson.pendaftaran) setPendaftaran(ppdbJson.pendaftaran)
        if (gradesJson?.success && gradesJson.grades) setGrades(gradesJson.grades)
        if (attJson?.success && attJson.records) setAttendance(attJson.records)
        if (billsJson?.success && billsJson.bills) setBills(billsJson.bills)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const attendanceStats = {
    total: attendance.length,
    hadir: attendance.filter((a) => a.status === "hadir").length,
  }
  const attendanceRate = attendanceStats.total > 0 ? Math.round((attendanceStats.hadir / attendanceStats.total) * 100) : 100
  const gpa = grades.length > 0 ? (grades.reduce((sum, g) => sum + g.nilaiAkhir, 0) / grades.length).toFixed(1) : "85.7"
  const unpaidBills = bills.filter((b) => b.status === "belum_bayar")

  return (
    <div className="space-y-5">
      {/* Welcome Banner */}
      <SiswaWelcomeBanner
          name={user?.name || "Muhammad Fadhil"}
          nis="10214055"
        />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <SiswaStatCard
            label="Rata-rata Nilai Rapor"
            value={gpa}
            subtext={`Dari ${grades.length} mata pelajaran`}
            icon={BookOpen}
          />
          <SiswaStatCard
            label="Tingkat Kehadiran"
            value={`${attendanceRate}%`}
            subtext={`${attendanceStats.hadir} hari hadir tercatat`}
            icon={CalendarCheck}
          />
          <SiswaStatCard
            label="Tagihan SPP & UKK"
            value={unpaidBills.length}
            subtext={unpaidBills.length > 0 ? "Menunggu pelunasan" : "Seluruh tagihan lunas"}
            icon={CreditCard}
          />
          <SiswaStatCard
            label="Kelas & Jurusan"
            value="X-RPL-1"
            subtext="Rekayasa Perangkat Lunak"
            icon={FileCheck}
          />
        </div>

        {/* Grid Menu Modul Siswa */}
        <div className="space-y-3 pt-1">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Menu Layanan Siswa</h2>
            <p className="text-xs text-muted-foreground">Pilih modul yang ingin Anda tinjau atau kelola</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <SiswaModuleCard
              title="Pendaftaran PPDB"
              description="Cek status kelulusan, nomor registrasi, dan cetak bukti seleksi masuk."
              href="/dashboard/siswa/ppdb"
              buttonLabel="Buka Status PPDB"
              icon={FileCheck}
              badgeText={pendaftaran?.status === "terverifikasi" ? "Terverifikasi" : "Aktif"}
            />

            <SiswaModuleCard
              title="Nilai & Rapor"
              description="Rekap perolehan nilai tugas, UTS, UAS, dan predikat kelulusan tiap mapel."
              href="/dashboard/siswa/nilai"
              buttonLabel="Lihat Lembar Nilai"
              icon={BookOpen}
              badgeText={`${grades.length} Pelajaran`}
            />

            <SiswaModuleCard
              title="Presensi & Kehadiran"
              description="Log kehadiran kelas harian, rekap sakit, izin resmi, dan catatan absensi."
              href="/dashboard/siswa/kehadiran"
              buttonLabel="Cek Riwayat Presensi"
              icon={CalendarCheck}
              badgeText={`${attendanceRate}% Hadir`}
            />

            <SiswaModuleCard
              title="Tagihan SPP & UKK"
              description="Informasi invoice SPP bulanan, pembayaran via Virtual Account, dan riwayat."
              href="/dashboard/siswa/tagihan"
              buttonLabel="Kelola Pembayaran"
              icon={CreditCard}
              badgeText={unpaidBills.length > 0 ? `${unpaidBills.length} Belum Bayar` : "Lunas"}
              badgeVariant={unpaidBills.length > 0 ? "destructive" : "outline"}
            />

            <SiswaModuleCard
              title="Data Orang Tua / Wali"
              description="Biodata ayah, ibu, nomor kontak darurat keluarga, dan alamat domisili."
              href="/dashboard/siswa/ortu"
              buttonLabel="Lihat Profil Wali"
              icon={Users}
              badgeText="Terpadu"
            />

            <SiswaModuleCard
              title="Quiz Minat & Bakat"
              description="Rekomendasi konsentrasi keahlian (RPL, TKJ, DKV, TJA) berbasis minat."
              href="/quiz"
              buttonLabel="Mulai Quiz Jurusan"
              icon={Sparkles}
              badgeText="Tes Minat"
            />
          </div>
        </div>
      </div>
  )
}
