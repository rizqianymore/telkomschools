"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Users,
  CheckCircle2,
  Mail,
  Search,
  MessageSquare,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  CreditCard,
  ShieldCheck,
  UserPlus,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PendaftarPPDB, StatusPendaftaran } from "@/lib/ppdb-data"
import { ContactMessage } from "@/lib/contact-data"
import { TagihanItem } from "@/lib/academic-data"

interface AdminUserItem {
  id: number
  identifier: string
  email: string
  name: string
  role: string
  role_label: string
  nis?: string
  nip?: string
}

export default function StaffDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<"ppdb" | "inbox" | "tagihan" | "users">("ppdb")
  const [applicants, setApplicants] = React.useState<PendaftarPPDB[]>([])
  const [messages, setMessages] = React.useState<ContactMessage[]>([])
  const [bills, setBills] = React.useState<TagihanItem[]>([])
  const [users, setUsers] = React.useState<AdminUserItem[]>([])
  const [stats, setStats] = React.useState({
    total: 0,
    menunggu: 0,
    terverifikasi: 0,
    lulus: 0,
    tidak_lulus: 0,
  })
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [feedback, setFeedback] = React.useState<{ type: "success" | "error"; text: string } | null>(null)
  const [updatingNo, setUpdatingNo] = React.useState<string | null>(null)

  // Form states untuk tambah akun pengguna manual (Admin Staff)
  const [newUserName, setNewUserName] = React.useState("")
  const [newUserEmail, setNewUserEmail] = React.useState("")
  const [newUserPassword, setNewUserPassword] = React.useState("")
  const [newUserRole, setNewUserRole] = React.useState<"siswa" | "guru" | "staff">("guru")
  const [newUserNipNis, setNewUserNipNis] = React.useState("")
  const [creatingUser, setCreatingUser] = React.useState(false)

  const loadData = React.useCallback(async () => {
    setLoading(true)
    try {
      const [ppdbRes, contactRes, billsRes, usersRes] = await Promise.all([
        fetch("/api/ppdb/manage"),
        fetch("/api/contact"),
        fetch("/api/academic/bills"),
        fetch("/api/admin/users"),
      ])

      const ppdbJson = await ppdbRes.json()
      if (ppdbJson.success) {
        setApplicants(ppdbJson.pendaftar || [])
        setStats(ppdbJson.stats)
      }

      const contactJson = await contactRes.json()
      if (contactJson.success) {
        setMessages(contactJson.messages || [])
      }

      const billsJson = await billsRes.json()
      if (billsJson.success) {
        setBills(billsJson.bills || [])
      }

      const usersJson = await usersRes.json()
      if (usersJson.success) {
        setUsers(usersJson.users || [])
      }
    } catch (err) {
      console.error("Gagal mengambil data dashboard staff:", err)
      setFeedback({ type: "error", text: "Gagal mengambil data terkini." })
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    let isMounted = true
    const init = async () => {
      if (isMounted) {
        await loadData()
      }
    }
    void init()
    return () => {
      isMounted = false
    }
  }, [loadData])

  const handleUpdateStatus = async (no_pendaftaran: string, status: StatusPendaftaran) => {
    const catatan = prompt("Catatan verifikasi untuk calon siswa (opsional):", "")
    if (catatan === null) return

    setUpdatingNo(no_pendaftaran)
    try {
      const res = await fetch("/api/ppdb/manage", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_pendaftaran, status, catatan }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: json.message })
        loadData()
      } else {
        setFeedback({ type: "error", text: json.message || "Gagal memperbarui status." })
      }
    } catch {
      setFeedback({ type: "error", text: "Terjadi gangguan koneksi jaringan." })
    } finally {
      setUpdatingNo(null)
    }
  }

  const handleConfirmBillPayment = async (billId: string) => {
    try {
      const res = await fetch("/api/academic/bills", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billId, status: "lunas", paymentMethod: "Petugas Kasir Sekolah / Bank" }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: json.message })
        loadData()
      }
    } catch {
      setFeedback({ type: "error", text: "Gagal mengonfirmasi pembayaran." })
    }
  }

  const handleMessageStatus = async (id: string, status: "read" | "replied") => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: json.message })
        loadData()
      }
    } catch {
      setFeedback({ type: "error", text: "Gagal memperbarui status pesan." })
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreatingUser(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
          nis: newUserRole === "siswa" ? newUserNipNis : undefined,
          nip: newUserRole === "guru" || newUserRole === "staff" ? newUserNipNis : undefined,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setFeedback({ type: "success", text: json.message })
        setNewUserName("")
        setNewUserEmail("")
        setNewUserPassword("")
        setNewUserNipNis("")
        loadData()
      } else {
        setFeedback({ type: "error", text: json.message || "Gagal membuat akun pengguna." })
      }
    } catch {
      setFeedback({ type: "error", text: "Gangguan koneksi server." })
    } finally {
      setCreatingUser(false)
    }
  }

  const filteredApplicants = applicants.filter((a) => {
    const q = searchQuery.toLowerCase()
    return (
      a.nama_lengkap.toLowerCase().includes(q) ||
      a.no_pendaftaran.toLowerCase().includes(q) ||
      a.nisn.includes(q) ||
      a.asal_sekolah.toLowerCase().includes(q)
    )
  })

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />

      <main className="flex-1 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-neutral-200">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-red-200 bg-red-50 text-primary text-xs font-semibold">
                  Administrator & Staff Terpadu
                </Badge>
                <span className="text-xs text-neutral-500">• Akses Master PPDB, Keuangan, Inbox & Pengguna</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-2">
                Pusat Kendali Administrasi <span className="text-primary">SMK Telkom</span>
              </h1>
              <p className="text-sm text-neutral-500 mt-1">
                Kelola pendaftaran siswa baru, verifikasi tagihan SPP, penanganan tiket konsultasi, dan manajemen akun pengguna.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={loadData}
                disabled={loading}
                className="rounded-xl text-xs border-neutral-200"
              >
                <RefreshCw className={`h-3.5 w-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
                Segarkan Data
              </Button>
              <Button
                variant="outline"
                render={<Link href="/daftar" target="_blank" />}
                className="rounded-xl text-xs border-neutral-200"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Form PPDB Publik
              </Button>
            </div>
          </div>

          {/* Feedback alert */}
          {feedback && (
            <div
              className={`mt-6 flex items-center justify-between rounded-xl p-3.5 text-xs font-medium ${
                feedback.type === "success"
                  ? "border border-green-200 bg-green-50 text-green-800"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              <div className="flex items-center gap-2">
                {feedback.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <span>{feedback.text}</span>
              </div>
              <button
                type="button"
                onClick={() => setFeedback(null)}
                className="text-neutral-400 hover:text-neutral-700"
              >
                ✕
              </button>
            </div>
          )}

          {/* Stat Summary Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-800">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{stats.total}</div>
                  <div className="text-xs text-neutral-500">Pendaftar PPDB</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{bills.length}</div>
                  <div className="text-xs text-neutral-500">Invoice Tagihan SPP</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{messages.length}</div>
                  <div className="text-xs text-neutral-500">Tiket Pesan Masuk</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-neutral-200 bg-white p-5 shadow-xs">
              <CardContent className="p-0 flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-neutral-900">{users.length}</div>
                  <div className="text-xs text-neutral-500">Akun Sistem Terdaftar</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-10 flex border-b border-neutral-200 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("ppdb")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                activeTab === "ppdb"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Verifikasi Berkas PPDB ({applicants.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tagihan")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                activeTab === "tagihan"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span>Verifikasi Keuangan & SPP ({bills.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("inbox")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                activeTab === "inbox"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <Mail className="h-4 w-4" />
              <span>Kotak Pesan Kontak ({messages.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("users")}
              className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 shrink-0 ${
                activeTab === "users"
                  ? "border-primary text-primary"
                  : "border-transparent text-neutral-500 hover:text-neutral-900"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Master Akun Pengguna ({users.length})</span>
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* 1. TAB VERIFIKASI PPDB */}
            {activeTab === "ppdb" && (
              <motion.div
                key="tab-ppdb"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-4"
              >
                {/* Search Bar */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari nama siswa, nomor PPDB, NISN, atau asal sekolah..."
                      className="h-10 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-xs text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                      <tr>
                        <th className="p-3.5">No. PPDB</th>
                        <th className="p-3.5">Nama & NISN</th>
                        <th className="p-3.5">Pilihan Jurusan</th>
                        <th className="p-3.5">Kontak</th>
                        <th className="p-3.5">Status Seleksi</th>
                        <th className="p-3.5 text-right">Aksi Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredApplicants.map((app) => (
                        <tr key={app.id} className="hover:bg-neutral-50/50">
                          <td className="p-3.5 font-bold text-neutral-900">
                            <div>{app.no_pendaftaran}</div>
                            <span className="text-[10px] text-neutral-400 uppercase">{app.jalur}</span>
                          </td>
                          <td className="p-3.5">
                            <div className="font-semibold text-neutral-900">{app.nama_lengkap}</div>
                            <div className="text-[11px] text-neutral-500">
                              NISN: {app.nisn} • {app.asal_sekolah}
                            </div>
                          </td>
                          <td className="p-3.5">
                            <Badge className="bg-red-50 text-primary border-red-200 font-bold text-[10px]">
                              {app.jurusan_pilihan_1}
                            </Badge>
                          </td>
                          <td className="p-3.5">
                            <div className="text-neutral-700">{app.email}</div>
                            <div className="text-[11px] text-neutral-500">{app.no_whatsapp}</div>
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                app.status === "lulus_seleksi"
                                  ? "bg-green-100 text-green-800"
                                  : app.status === "terverifikasi"
                                  ? "bg-blue-100 text-blue-800"
                                  : app.status === "tidak_lulus"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {app.status === "menunggu_verifikasi" && "Menunggu"}
                              {app.status === "terverifikasi" && "Terverifikasi"}
                              {app.status === "lulus_seleksi" && "Lulus"}
                              {app.status === "tidak_lulus" && "Tidak Lulus"}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={updatingNo === app.no_pendaftaran}
                                onClick={() => handleUpdateStatus(app.no_pendaftaran, "terverifikasi")}
                                className="h-7 text-[10px] px-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                              >
                                Verifikasi
                              </Button>
                              <Button
                                size="sm"
                                disabled={updatingNo === app.no_pendaftaran}
                                onClick={() => handleUpdateStatus(app.no_pendaftaran, "lulus_seleksi")}
                                className="h-7 text-[10px] px-2 bg-green-600 hover:bg-green-700 text-white"
                              >
                                Luluskan
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 2. TAB VERIFIKASI KEUANGAN & SPP */}
            {activeTab === "tagihan" && (
              <motion.div
                key="tab-tagihan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6"
              >
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                      <tr>
                        <th className="p-3.5">Invoice & Uraian Biaya</th>
                        <th className="p-3.5">NIS Siswa</th>
                        <th className="p-3.5">Nominal</th>
                        <th className="p-3.5">Jatuh Tempo</th>
                        <th className="p-3.5">Status Pembayaran</th>
                        <th className="p-3.5 text-right">Aksi Konfirmasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {bills.map((b) => (
                        <tr key={b.id} className="hover:bg-neutral-50/50">
                          <td className="p-3.5 font-bold text-neutral-900">
                            <div>{b.title}</div>
                            <span className="text-[10px] text-neutral-400">ID: {b.id}</span>
                          </td>
                          <td className="p-3.5 text-neutral-700">{b.nis}</td>
                          <td className="p-3.5 font-bold text-neutral-900">Rp {b.amount.toLocaleString("id-ID")}</td>
                          <td className="p-3.5 text-neutral-500">{b.dueDate}</td>
                          <td className="p-3.5">
                            <Badge
                              className={`text-[10px] font-bold ${
                                b.status === "lunas"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : b.status === "menunggu_konfirmasi"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }`}
                            >
                              {b.status === "lunas" && "Lunas"}
                              {b.status === "menunggu_konfirmasi" && "Menunggu Konfirmasi"}
                              {b.status === "belum_bayar" && "Belum Dibayar"}
                            </Badge>
                          </td>
                          <td className="p-3.5 text-right">
                            {b.status !== "lunas" ? (
                              <Button
                                size="sm"
                                onClick={() => handleConfirmBillPayment(b.id)}
                                className="h-7 text-[10px] px-2 bg-green-600 hover:bg-green-700 text-white"
                              >
                                Tandai Lunas
                              </Button>
                            ) : (
                              <span className="text-[10px] text-green-700 font-semibold">Telah Terverifikasi</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* 3. TAB INBOX PESAN KONTAK */}
            {activeTab === "inbox" && (
              <motion.div
                key="tab-inbox"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-3"
              >
                {messages.map((m) => (
                  <Card key={m.id} className="border-neutral-200 bg-white p-5 shadow-xs">
                    <CardContent className="p-0 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-neutral-900">{m.name}</span>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${
                              m.status === "unread"
                                ? "border-amber-200 bg-amber-50 text-amber-700 font-bold"
                                : "border-neutral-200 text-neutral-500"
                            }`}
                          >
                            {m.status === "unread" ? "Baru" : m.status === "read" ? "Dibaca" : "Dibalas"}
                          </Badge>
                        </div>
                        <div className="text-xs text-neutral-500">
                          <span>Email: {m.email}</span> • <span>HP: {m.phone}</span> •{" "}
                          <span className="font-medium text-neutral-700">Minat: {m.majorInterest}</span>
                        </div>
                        <div className="rounded-lg bg-neutral-50 border border-neutral-100 p-3 text-xs text-neutral-800 mt-2">
                          &quot;{m.message}&quot;
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMessageStatus(m.id, "read")}
                          className="h-8 text-xs border-neutral-200"
                        >
                          Tandai Dibaca
                        </Button>
                        <Button
                          size="sm"
                          render={<a href={`mailto:${m.email}?subject=Tanggapan Layanan SMK Telkom Jakarta`} />}
                          className="h-8 text-xs bg-primary hover:bg-red-700 text-white"
                        >
                          <MessageSquare className="h-3.5 w-3.5 mr-1" />
                          Balas Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {/* 4. TAB MASTER AKUN PENGGUNA */}
            {activeTab === "users" && (
              <motion.div
                key="tab-users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-6"
              >
                {/* Form Buat Akun Pengguna Baru */}
                <Card className="border border-neutral-200 bg-neutral-50/60 p-5 shadow-xs">
                  <h3 className="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                    <UserPlus className="h-4 w-4 text-primary" />
                    <span>Buat Akun Pengguna Baru (Guru, Staff, Siswa, Ortu)</span>
                  </h3>
                  <form onSubmit={handleCreateUser} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Nama Lengkap</label>
                      <Input
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="cth. Ahmad Dani, S.Kom."
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Alamat Email</label>
                      <Input
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="ahmad@smktelkom-jkt.sch.id"
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Kata Sandi Awal</label>
                      <Input
                        type="password"
                        value={newUserPassword}
                        onChange={(e) => setNewUserPassword(e.target.value)}
                        placeholder="Minimal 6 karakter"
                        className="rounded-xl text-xs bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Peran / Role</label>
                      <select
                        value={newUserRole}
                        onChange={(e) => setNewUserRole(e.target.value as "siswa" | "guru" | "staff")}
                        className="h-9 w-full rounded-xl border border-neutral-200 bg-white px-3 text-xs text-neutral-900"
                      >
                        <option value="guru">Guru</option>
                        <option value="staff">Staff / Admin</option>
                        <option value="siswa">Siswa & Wali Murid</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-600 mb-1">NIP / NIS (Opsional)</label>
                      <Input
                        value={newUserNipNis}
                        onChange={(e) => setNewUserNipNis(e.target.value)}
                        placeholder="19870101..."
                        className="rounded-xl text-xs bg-white"
                      />
                    </div>
                    <div className="sm:col-span-5 flex justify-end">
                      <Button
                        type="submit"
                        size="sm"
                        disabled={creatingUser}
                        className="rounded-xl text-xs bg-primary text-white"
                      >
                        {creatingUser ? "Membuat Akun..." : "Buat Akun"}
                      </Button>
                    </div>
                  </form>
                </Card>

                {/* Tabel Seluruh Akun */}
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-neutral-200 bg-neutral-50 text-neutral-600 font-semibold">
                      <tr>
                        <th className="p-3.5">ID & Nama Lengkap</th>
                        <th className="p-3.5">Email Akun</th>
                        <th className="p-3.5">Peran / Role</th>
                        <th className="p-3.5">Identitas (NIS / NIP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-neutral-50/50">
                          <td className="p-3.5 font-bold text-neutral-900">
                            <div>{u.name}</div>
                            <span className="text-[10px] text-neutral-400">ID #{u.id}</span>
                          </td>
                          <td className="p-3.5 text-neutral-700">{u.email}</td>
                          <td className="p-3.5">
                            <Badge
                              className={`text-[10px] font-bold ${
                                u.role === "staff"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : u.role === "guru"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-neutral-100 text-neutral-700"
                              }`}
                            >
                              {u.role_label}
                            </Badge>
                          </td>
                          <td className="p-3.5 text-neutral-500">{u.nip || u.nis || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
