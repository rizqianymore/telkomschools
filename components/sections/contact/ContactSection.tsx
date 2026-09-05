"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export function ContactSection() {
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

              <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
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
                      placeholder="cth. nama@domain.com"
                      className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                      Pilihan Jurusan Minat
                    </label>
                    <select className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3.5 text-sm text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors">
                      <option value="rpl">Rekayasa Perangkat Lunak (RPL)</option>
                      <option value="tkj">Teknik Komputer & Jaringan (TKJ)</option>
                      <option value="dkv">Desain Komunikasi Visual (DKV)</option>
                      <option value="tja">Teknik Jaringan Akses (TJA)</option>
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
                    placeholder="Tuliskan pertanyaan Anda mengenai pendaftaran, tes seleksi, atau biaya..."
                    className="w-full rounded-md border border-neutral-300 bg-white p-3 text-sm text-neutral-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  <span>Kirim Pesan</span>
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
