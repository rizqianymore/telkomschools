"use client"

import * as React from "react"
import {
  BookOpen,
  Download,
  TrendingUp,
  Award,
} from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SiswaStatCard } from "@/components/dashboard/siswa-stat-card"
import { NilaiItem } from "@/lib/academic-data"

export default function SiswaNilaiPage() {
  const [grades, setGrades] = React.useState<NilaiItem[]>([])

  React.useEffect(() => {
    let isMounted = true
    fetch("/api/academic/nilai")
      .then((r) => r.json())
      .then((json) => {
        if (isMounted && json.success && json.grades) {
          setGrades(json.grades)
        }
      })
      .catch(() => {})

    return () => {
      isMounted = false
    }
  }, [])

  const average = grades.length > 0
    ? (grades.reduce((sum, g) => sum + g.nilaiAkhir, 0) / grades.length).toFixed(1)
    : "85.7"

  return (
    <div className="space-y-5">
      {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 border-b border-border">
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Nilai Rapor & Hasil Belajar
            </h1>
            <p className="text-xs text-muted-foreground">
              Rekap perolehan nilai tugas, UTS, UAS, dan predikat kelulusan semester aktif
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
              Download Rapor PDF
            </Button>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <SiswaStatCard
            label="Rata-rata Nilai Akhir"
            value={average}
            subtext="Memenuhi KKM (78.0)"
            icon={TrendingUp}
          />
          <SiswaStatCard
            label="Total Mata Pelajaran"
            value={grades.length}
            subtext="Kurikulum Merdeka SMK"
            icon={BookOpen}
          />
          <SiswaStatCard
            label="Predikat Kelulusan"
            value="Sangat Baik (A)"
            subtext="Peringkat 3 di Kelas"
            icon={Award}
          />
        </div>

        {/* Tabel Nilai */}
        <Card className="rounded-lg border-border shadow-none overflow-hidden">
          <CardHeader className="border-b border-border py-3 px-4 sm:px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-semibold">Lembar Penilaian Hasil Belajar</CardTitle>
              <Badge variant="outline" className="text-[10px] sm:text-[11px] text-muted-foreground font-normal">
                T.A 2026/2027
              </Badge>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-3.5 sm:px-4">Mata Pelajaran</th>
                  <th className="py-2.5 px-3.5 sm:px-4">KKM</th>
                  <th className="py-2.5 px-3.5 sm:px-4">Tugas (30%)</th>
                  <th className="py-2.5 px-3.5 sm:px-4">UTS (30%)</th>
                  <th className="py-2.5 px-3.5 sm:px-4">UAS (40%)</th>
                  <th className="py-2.5 px-3.5 sm:px-4">Nilai Akhir</th>
                  <th className="py-2.5 px-3.5 sm:px-4">Predikat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {grades.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground text-xs">
                      Memuat data nilai rapor...
                    </td>
                  </tr>
                ) : (
                  grades.map((g) => (
                    <tr key={g.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-2.5 px-3.5 sm:px-4">
                        <div className="font-semibold text-foreground">{g.subjectName}</div>
                        <span className="text-[10px] text-muted-foreground">{g.subjectCode} • {g.semester}</span>
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-muted-foreground">{g.kkm}</td>
                      <td className="py-2.5 px-3.5 sm:px-4 font-medium text-foreground">{g.nilaiTugas}</td>
                      <td className="py-2.5 px-3.5 sm:px-4 font-medium text-foreground">{g.nilaiUTS}</td>
                      <td className="py-2.5 px-3.5 sm:px-4 font-medium text-foreground">{g.nilaiUAS}</td>
                      <td className="py-2.5 px-3.5 sm:px-4 font-bold text-foreground">{g.nilaiAkhir}</td>
                      <td className="py-2.5 px-3.5 sm:px-4">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold px-2 py-0 ${
                            g.grade === "A"
                              ? "bg-green-500/10 text-green-700 border-green-200"
                              : g.grade === "B"
                              ? "bg-blue-500/10 text-blue-700 border-blue-200"
                              : "bg-amber-500/10 text-amber-700 border-amber-200"
                          }`}
                        >
                          {g.grade}
                        </Badge>
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
