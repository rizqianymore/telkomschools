"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"



const campusBranches = [
  {
    city: "Bandung (Pusat)",
    address: "Jl. Telekomunikasi No. 1, Terusan Buahbatu, Dayeuhkolot, Bandung, Jawa Barat",
    phone: "(022) 7564-108",
  },
  {
    city: "Jakarta",
    address: "Jl. Daan Mogot KM. 11, Cengkareng Timur, Jakarta Barat, DKI Jakarta",
    phone: "(021) 5451-697",
  },
  {
    city: "Purwokerto",
    address: "Jl. DI Panjaitan No. 128, Purwokerto Selatan, Banyumas, Jawa Tengah",
    phone: "(0281) 641-629",
  },
  {
    city: "Malang",
    address: "Jl. Danau Ranau, Sawojajar, Kedungkandang, Kota Malang, Jawa Timur",
    phone: "(0341) 712-500",
  },
  {
    city: "Medan",
    address: "Jl. Jamin Ginting KM. 11, Simpang Selayang, Medan Tuntungan, Sumatera Utara",
    phone: "(061) 836-1290",
  },
  {
    city: "Makassar",
    address: "Jl. A. P. Pettarani No. 4, Gunung Sari, Rappocini, Kota Makassar, Sulawesi Selatan",
    phone: "(0411) 867-000",
  },
]

export default function KontakPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b border-neutral-200/80 bg-neutral-50/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="outline"
              className="mb-4 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold"
            >
              Hubungi Kami
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Kontak & Layanan <span className="text-primary">Pendaftaran</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
              Kami siap melayani kebutuhan informasi penerimaan siswa baru dan kerjasama kemitraan industri.
            </p>
          </div>
        </div>

        {/* Contact Form & Main Info */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              {/* Left Info Column */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">Kantor Sekretariat Utama</h2>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    Kunjungi kantor pelayanan terpadu kami untuk konsultasi langsung mengenai pendaftaran dan program beasiswa.
                  </p>
                </div>

                <div className="space-y-4">
                  <Card className="border-neutral-200/90 bg-neutral-50/40 p-4 shadow-sm">
                    <CardContent className="flex items-start gap-3.5 p-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-neutral-900">Alamat Kampus Pusat</div>
                        <div className="text-xs text-neutral-600 mt-0.5">
                          Jl. Telekomunikasi No. 1, Terusan Buahbatu, Bandung, Jawa Barat 40257
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
                          (021) 1234-5678 / +62 812-3456-7890
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
                          admissions@telkomschools.sch.id
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

              {/* Right Form Column */}
              <div className="lg:col-span-7">
                <Card className="border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-neutral-900">Kirim Pesan atau Pertanyaan</h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    Silakan lengkapi formulir di bawah ini, tim konsultan kami akan menghubungi Anda sesegera mungkin.
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
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-colors"
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
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-colors"
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
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                          Pilihan Jenjang
                        </label>
                        <select className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-colors">
                          <option value="tk">TK & PAUD</option>
                          <option value="sd">Sekolah Dasar (SD)</option>
                          <option value="smp">SMP Telkom</option>
                          <option value="smk">SMK Telkom (RPL / TKJ / DKV)</option>
                          <option value="sma">SMA Telkom</option>
                          <option value="kursus">Kursus & Pelatihan</option>
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
                        placeholder="Tuliskan pertanyaan Anda mengenai pendaftaran, biaya, atau fasilitas..."
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 p-3.5 text-sm text-neutral-900 outline-none focus:border-primary focus:bg-white transition-colors"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full sm:w-auto text-sm font-semibold">
                      <span>Kirim Pesan</span>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Campus Network */}
        <section className="bg-neutral-50/60 py-20 border-t border-neutral-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold"
              >
                Jaringan Kampus
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Lokasi Kampus Telkom Schools di Indonesia
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Hadir di berbagai kota strategis untuk menjangkau putra-putri terbaik di seluruh nusantara.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {campusBranches.map((item, idx) => (
                <Card key={idx} className="border-neutral-200/90 bg-white p-5 shadow-sm hover:border-red-200 hover:shadow">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 text-primary font-bold text-base">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{item.city}</span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-600 leading-relaxed">{item.address}</p>
                    <div className="mt-3 text-xs font-semibold text-neutral-800">
                      Telp: {item.phone}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
