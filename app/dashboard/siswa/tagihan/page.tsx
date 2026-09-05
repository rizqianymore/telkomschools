"use client"

import * as React from "react"
import {
  CreditCard,
  CheckCircle2,
  Download,
  Building,
  ShieldCheck,
} from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SiswaStatCard } from "@/components/dashboard/siswa-stat-card"
import { TagihanItem } from "@/lib/academic-data"

export default function SiswaTagihanPage() {
  const [bills, setBills] = React.useState<TagihanItem[]>([])
  const [payFeedback, setPayFeedback] = React.useState<string | null>(null)

  const loadBills = React.useCallback(async () => {
    try {
      const res = await fetch("/api/academic/bills")
      const json = await res.json()
      if (json.success && json.bills) {
        setBills(json.bills)
      }
    } catch {}
  }, [])

  React.useEffect(() => {
    let isMounted = true
    const fetchBills = async () => {
      try {
        const res = await fetch("/api/academic/bills")
        const json = await res.json()
        if (isMounted && json.success && json.bills) {
          setBills(json.bills)
        }
      } catch {}
    }
    void fetchBills()
    return () => {
      isMounted = false
    }
  }, [])

  const handlePay = async (billId: string) => {
    try {
      const res = await fetch("/api/academic/bills", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billId,
          status: "menunggu_konfirmasi",
          paymentMethod: "Virtual Account BNI Telkom",
        }),
      })
      const json = await res.json()
      if (json.success) {
        setPayFeedback(json.message)
        loadBills()
      }
    } catch {
      setPayFeedback("Gagal memproses pengajuan pembayaran.")
    }
  }

  const unpaid = bills.filter((b) => b.status === "belum_bayar")
  const totalUnpaid = unpaid.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="space-y-5">
      {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-1 border-b border-border">
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Tagihan SPP & Biaya Pendidikan
            </h1>
            <p className="text-xs text-muted-foreground">
              Informasi invoice SPP bulanan, praktikum UKK, dan pelunasan Virtual Account
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
              Cetak Invoice
            </Button>
          </div>
        </div>

        {/* Feedback Alert */}
        {payFeedback && (
          <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 p-3 text-xs text-green-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
              <span>{payFeedback}</span>
            </div>
            <button
              type="button"
              onClick={() => setPayFeedback(null)}
              className="text-green-700 hover:text-green-950 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Ringkasan Tunggakan Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <SiswaStatCard
            label="Total Tunggakan Aktif"
            value={`Rp ${totalUnpaid.toLocaleString("id-ID")}`}
            subtext={`${unpaid.length} invoice belum dibayar`}
            icon={CreditCard}
          />
          <SiswaStatCard
            label="Metode Pembayaran Resmi"
            value="VA BNI & Mandiri"
            subtext="Kode Sekolah: 8277"
            icon={Building}
          />
          <SiswaStatCard
            label="Status Verifikasi"
            value="Otomatis Bank"
            subtext="Sinkronisasi 1x24 jam"
            icon={ShieldCheck}
          />
        </div>

        {/* Tabel Invoice */}
        <Card className="rounded-lg border-border shadow-none overflow-hidden">
          <CardHeader className="border-b border-border py-3 px-4 sm:px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-semibold">Daftar Tagihan & Status Pembayaran</CardTitle>
              <Badge variant="outline" className="text-[10px] sm:text-[11px] text-muted-foreground font-normal">
                T.A 2026/2027
              </Badge>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 text-muted-foreground font-semibold">
                <tr>
                  <th className="py-2.5 px-3.5 sm:px-4">Uraian Tagihan</th>
                  <th className="py-2.5 px-3.5 sm:px-4">Nominal</th>
                  <th className="py-2.5 px-3.5 sm:px-4">Jatuh Tempo</th>
                  <th className="py-2.5 px-3.5 sm:px-4">Status Pembayaran</th>
                  <th className="py-2.5 px-3.5 sm:px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bills.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground text-xs">
                      Tidak ada tagihan yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  bills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-muted/20 transition-colors">
                      <td className="py-2.5 px-3.5 sm:px-4">
                        <div className="font-semibold text-foreground">{bill.title}</div>
                        <span className="text-[10px] text-muted-foreground">ID: {bill.id}</span>
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 font-bold text-foreground">
                        Rp {bill.amount.toLocaleString("id-ID")}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-muted-foreground">{bill.dueDate}</td>
                      <td className="py-2.5 px-3.5 sm:px-4">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-semibold px-2 py-0 ${
                            bill.status === "lunas"
                              ? "bg-green-500/10 text-green-700 border-green-200"
                              : bill.status === "menunggu_konfirmasi"
                              ? "bg-blue-500/10 text-blue-700 border-blue-200"
                              : "bg-red-500/10 text-red-700 border-red-200"
                          }`}
                        >
                          {bill.status === "lunas" && "Lunas"}
                          {bill.status === "menunggu_konfirmasi" && "Menunggu Verifikasi"}
                          {bill.status === "belum_bayar" && "Belum Dibayar"}
                        </Badge>
                        {bill.paidAt && (
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            {bill.paymentMethod}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 px-3.5 sm:px-4 text-right">
                        {bill.status === "belum_bayar" ? (
                          <Button
                            size="sm"
                            onClick={() => handlePay(bill.id)}
                            className="h-7 text-xs px-2.5 rounded-md"
                          >
                            Bayar Sekarang
                          </Button>
                        ) : (
                          <span className="text-[11px] text-muted-foreground italic">
                            {bill.status === "lunas" ? "Terverifikasi" : "Dalam Proses"}
                          </span>
                        )}
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
