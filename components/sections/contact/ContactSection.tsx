"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    majorInterest: "Rekayasa Perangkat Lunak (RPL)",
    message: "",
  })
  const [loading, setLoading] = React.useState(false)
  const [feedback, setFeedback] = React.useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setFeedback({ type: "success", text: data.message })
        setFormData({
          name: "",
          phone: "",
          email: "",
          majorInterest: "Rekayasa Perangkat Lunak (RPL)",
          message: "",
        })
      } else {
        setFeedback({ type: "error", text: data.message || "Gagal mengirimkan pesan." })
      }
    } catch {
      setFeedback({ type: "error", text: "Terjadi gangguan koneksi jaringan." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Kolom Informasi */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Kantor Sekretariat Utama</h2>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Kunjungi kantor pelayanan kami untuk konsultasi langsung PPDB dan beasiswa.
              </p>
            </div>

            <div className="space-y-4">
              <Card className="border-neutral-200/90 bg-neutral-50/40 p-4 shadow-sm">
                <CardContent className="flex items-start gap-3.5 p-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">Alamat Kampus Utama</div>
                    <div className="text-xs text-neutral-600 mt-0.5">
                      Jl. Daan Mogot KM. 11, Cengkareng Timur, Jakarta Barat, DKI Jakarta 11730
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-200/90 bg-neutral-50/40 p-4 shadow-sm">
                <CardContent className="flex items-start gap-3.5 p-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">Telepon & WhatsApp Admisi</div>
                    <div className="text-xs text-neutral-600 mt-0.5">
                      (021) 5451-697 / +62 812-3456-7890
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-200/90 bg-neutral-50/40 p-4 shadow-sm">
                <CardContent className="flex items-start gap-3.5 p-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">Surat Elektronik (Email)</div>
                    <div className="text-xs text-neutral-600 mt-0.5">
                      info@smktelkom-jkt.sch.id
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-200/90 bg-neutral-50/40 p-4 shadow-sm">
                <CardContent className="flex items-start gap-3.5 p-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900">Jam Operasional Pelayanan</div>
                    <div className="text-xs text-neutral-600 mt-0.5">
                      Senin - Jumat: 08.00 - 16.00 WIB | Sabtu: 08.00 - 13.00 WIB
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Pertanyaan */}
          <div className="lg:col-span-7">
            <Card className="border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900">Kirim Pesan atau Pertanyaan</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Silakan lengkapi formulir di bawah ini, tim kami akan segera menghubungi Anda.
              </p>

              {feedback && (
                <div
                  className={`mt-4 rounded-lg p-3 text-xs font-medium ${
                    feedback.type === "success"
                      ? "border border-green-200 bg-green-50 text-green-800"
                      : "border border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {feedback.text}
                </div>
              )}

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="cth. Budi Santoso"
                      className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Nomor WhatsApp / HP *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="cth. 081234567890"
                      className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="cth. nama@domain.com"
                      className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Pilihan Jurusan Minat
                    </label>
                    <select
                      value={formData.majorInterest}
                      onChange={(e) => setFormData({ ...formData, majorInterest: e.target.value })}
                      className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    >
                      <option value="Rekayasa Perangkat Lunak (RPL)">Rekayasa Perangkat Lunak (RPL)</option>
                      <option value="Teknik Komputer & Jaringan (TKJ)">Teknik Komputer & Jaringan (TKJ)</option>
                      <option value="Desain Komunikasi Visual (DKV)">Desain Komunikasi Visual (DKV)</option>
                      <option value="Teknik Jaringan Akses (TJA)">Teknik Jaringan Akses (TJA)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                    Pesan atau Pertanyaan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pertanyaan Anda mengenai pendaftaran, tes seleksi, atau biaya..."
                    className="w-full rounded-md border border-neutral-300 bg-white p-3 text-sm text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  <span>{loading ? "Mengirimkan..." : "Kirim Pesan"}</span>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
