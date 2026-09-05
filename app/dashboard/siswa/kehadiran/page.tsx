"use client"

import * as React from "react"
import {
  Download,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PresensiItem } from "@/lib/academic-data"

export default function SiswaKehadiranPage() {
  const [attendance, setAttendance] = React.useState<PresensiItem[]>([])

  React.useEffect(() => {
    let isMounted = true
    fetch("/api/academic/attendance")
      .then((r) => r.json())
      .then((json) => {
        if (isMounted && json.success && json.records) {
          setAttendance(json.records)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const stats = {
    total: attendance.length,
    hadir: attendance.filter((a) => a.status === "hadir").length,
    izin: attendance.filter((a) => a.status === "izin").length,
    sakit: attendance.filter((a) => a.status === "sakit").length,
    alpa: attendance.filter((a) => a.status === "alpa").length,
  }

  const rate = stats.total > 0 ? Math.round((stats.hadir / stats.total) * 100) : 100

  return (
    <div className="space-y-5">
      {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 border-b border-border">
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Rekap Presensi & Kehadiran Kelas
            </h1>
            <p className="text-xs text-muted-foreground">
              Catatan absensi harian KBM teori, praktikum laboratorium, dan kegiatan kejuruan
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="text-xs h-8 px-3 rounded-md"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Cetak Presensi
            </Button>
          </div>
        </div>

        {/* 4 Cards Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="rounded-lg border-border shadow-none">
            <CardContent className="p-3.5 text-center">
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground block">Total Hadir</span>
              <span className="text-xl sm:text-2xl font-bold text-green-600 mt-1 block">{stats.hadir} Hari</span>
              <span className="text-[10px] text-muted-foreground mt-0.5 block">{rate}% kehadiran</span>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-border shadow-none">
            <CardContent className="p-3.5 text-center">
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground block">Izin Resmi</span>
              <span className="text-xl sm:text-2xl font-bold text-blue-600 mt-1 block">{stats.izin} Hari</span>
              <span className="text-[10px] text-muted-foreground mt-0.5 block">Disetujui wali kelas</span>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-border shadow-none">
            <CardContent className="p-3.5 text-center">
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground block">Sakit</span>
              <span className="text-xl sm:text-2xl font-bold text-amber-600 mt-1 block">{stats.sakit} Hari</span>
              <span className="text-[10px] text-muted-foreground mt-0.5 block">Keterangan dokter</span>
            </CardContent>
          </Card>

          <Card className="rounded-lg border-border shadow-none">
            <CardContent className="p-3.5 text-center">
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground block">Alpa / Tanpa Ket.</span>
              <span className="text-xl sm:text-2xl font-bold text-foreground mt-1 block">{stats.alpa} Hari</span>
              <span className="text-[10px] text-green-600 font-medium mt-0.5 block">Disiplin baik</span>
            </CardContent>
          </Card>
        </div>

        {/* Tabel Log Kehadiran */}
        <Card className="rounded-lg border-border shadow-none overflow-hidden">
          <CardHeader className="border-b border-border py-3 px-4 sm:px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-semibold">Log Riwayat Presensi Kelas</CardTitle>
              <Badge variant="outline" className="text-[10px] sm:text-[11px] text-muted-foreground font-normal">
                Total {attendance.length} Hari KBM
              </Badge>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-3.5 sm:px-4">Tanggal KBM</th>
                  <th className="py-2.5 px-3.5 sm:px-4">Status Presensi</th>
                  <th className="py-2.5 px-3.5 sm:px-4">Keterangan / Berita Acara Guru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-muted-foreground text-xs">
                      Belum ada riwayat pencatatan presensi.
                    </td>
                  </tr>
                ) : (
                  attendance.map((att) => (
                    <tr key={att.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-2.5 px-3.5 sm:px-4 font-semibold text-foreground">{att.date}</td>
                      <td className="py-2.5 px-3.5 sm:px-4">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold px-2 py-0 ${
                            att.status === "hadir"
                              ? "bg-green-500/10 text-green-700 border-green-200"
                              : att.status === "izin"
                              ? "bg-blue-500/10 text-blue-700 border-blue-200"
                              : att.status === "sakit"
                              ? "bg-amber-500/10 text-amber-700 border-amber-200"
                              : "bg-red-500/10 text-red-700 border-red-200"
                          }`}
                        >
                          {att.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-muted-foreground">
                        {att.keterangan || "Kehadiran KBM teori & praktikum kelas"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
  )
}
