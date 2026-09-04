import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ArrowRight, Building2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Testimoni & Cerita Sukses - SMK Telkom Jakarta",
  description: "Ulasan jujur siswa, apresiasi orang tua, dan jejak karier alumni SMK Telkom Jakarta di perusahaan teknologi dunia.",
}

const studentTestimonials = [
  {
    name: "Rizky Ramadhan",
    role: "Senior Frontend Engineer di Unicorn Tech",
    grad: "Alumni SMK Telkom Jakarta Angkatan 2019",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    fallback: "RR",
    quote:
      "SMK Telkom Jakarta memberikan bekal kejuruan IT dan kedisiplinan yang sangat nyata. Saat pertama kali masuk dunia industri, tools dan teknologi yang digunakan sudah tidak asing lagi bagi saya.",
  },
  {
    name: "Farhan Maulana",
    role: "DevOps & Cloud Engineer di Singapore",
    grad: "Alumni SMK Telkom Angkatan 2017",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    fallback: "FM",
    quote:
      "Laboratorium jaringan dan kurikulum Cisco di sekolah membuka jalan bagi saya untuk meraih sertifikasi internasional sebelum lulus. Peluang karier global terbuka sangat lebar.",
  },
  {
    name: "Amanda Putri",
    role: "Juara 1 Lomba Kompetensi Siswa (LKS) Nasional",
    grad: "Siswa Kelas XII RPL",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    fallback: "AP",
    quote:
      "Dukungan guru dan fasilitas workstation sekolah luar biasa mendukung persiapan lomba. Kami dibimbing oleh mentor yang benar-benar praktisi aktif di industri digital.",
  },
]

const parentTestimonials = [
  {
    name: "Dr. Hendra Wijaya, Sp.A",
    role: "Orang Tua Siswa Kelas XI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    fallback: "HW",
    quote:
      "Saya melihat perubahan kepribadian anak saya yang semakin mandiri, bertutur kata sopan, dan disiplin belajar tinggi. Keseimbangan antara teknologi dan pendidikan budi pekerti sangat terasa.",
  },
  {
    name: "Ibu Nurhayati, S.E.",
    role: "Orang Tua Siswa Kelas IX SMP Telkom",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    fallback: "NH",
    quote:
      "Sistem komunikasi guru dengan orang tua sangat terbuka dan transparan melalui aplikasi digital. Perkembangan nilai dan kebiasaan positif anak selalu dipantau dengan baik.",
  },
  {
    name: "Bambang Sudibyo, M.M.",
    role: "Orang Tua Alumni SD & SMP Telkom",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    fallback: "BS",
    quote:
      "Kedua anak saya bersekolah di Telkom Schools. Kualitas guru-gurunya berdedikasi tinggi serta lingkungan belajar yang sehat membuat mereka betah dan berprestasi.",
  },
]

const hiringPartners = [
  { name: "Telkom Indonesia", type: "Telekomunikasi & Digital Telco" },
  { name: "Telkomsel", type: "Mobile Network Provider" },
  { name: "Mitratel", type: "Digital Infrastructure" },
  { name: "Finnet Indonesia", type: "Fintech & Payment Gateway" },
  { name: "Telkomsigma", type: "Enterprise Cloud & Data Center" },
  { name: "Agate Games", type: "Game Development Studio" },
]

export default function TestimoniPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-neutral-200/80 bg-neutral-50/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge
              variant="outline"
              className="mb-4 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold"
            >
              Ulasan & Bukti Prestasi
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Testimoni & <span className="text-primary">Cerita Sukses</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
              Dengarkan langsung penuturan siswa, orang tua, dan alumni mengenai pengalaman berharga menimba ilmu di lingkungan SMK Telkom Jakarta.
            </p>
          </div>
        </section>

        {/* Siswa & Alumni Testimonials */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="outline" className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold">
                Siswa & Alumni
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Suara dari Para Generasi Juara
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Bagaimana pengalaman belajar di SMK Telkom Jakarta mengantarkan mereka menuju karier impian.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {studentTestimonials.map((item, idx) => (
                <Card key={idx} className="flex h-full flex-col justify-between border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm hover:border-red-200 hover:shadow">
                  <CardContent className="p-0">
                    <span className="text-3xl font-serif text-primary/40 select-none">&ldquo;</span>
                    <p className="text-sm text-neutral-600 leading-relaxed -mt-2">{item.quote}</p>
                  </CardContent>

                  <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                    <Avatar size="lg" className="h-10 w-10 border border-neutral-200">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback className="bg-red-50 text-primary font-bold text-xs">
                        {item.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-bold text-neutral-900 leading-tight">{item.name}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{item.role}</div>
                      <div className="text-[11px] font-semibold text-primary mt-0.5">{item.grad}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimoni Orang Tua */}
        <section className="bg-neutral-50/60 py-20 border-y border-neutral-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="outline" className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold">
                Orang Tua Siswa
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Apresiasi & Kepercayaan Orang Tua
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Kepercayaan orang tua adalah amanah terbesar yang senantiasa kami jaga dengan integritas mutu.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {parentTestimonials.map((item, idx) => (
                <Card key={idx} className="flex h-full flex-col justify-between border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm hover:border-red-200 hover:shadow">
                  <CardContent className="p-0">
                    <span className="text-3xl font-serif text-primary/40 select-none">&ldquo;</span>
                    <p className="text-sm text-neutral-600 leading-relaxed -mt-2">{item.quote}</p>
                  </CardContent>

                  <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                    <Avatar size="lg" className="h-10 w-10 border border-neutral-200">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback className="bg-red-50 text-primary font-bold text-xs">
                        {item.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-bold text-neutral-900 leading-tight">{item.name}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{item.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Rekruter & Mitra Industri */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="outline" className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold">
                Mitra Penyaluran Kerja
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Dipercaya oleh Industri Teknologi
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Lulusan Telkom Schools diakui memiliki etos kerja disiplin dan kesiapan keterampilan teknis yang tinggi.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {hiringPartners.map((p, idx) => (
                <div key={idx} className="rounded-xl border border-neutral-200/80 bg-neutral-50/50 p-4 text-center">
                  <Building2 className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="text-sm font-bold text-neutral-900">{p.name}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">{p.type}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-neutral-50/60 border-t border-neutral-200/80 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
              Ingin Menjadi Bagian dari Cerita Sukses Berikutnya?
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              Pendaftaran penerimaan peserta didik baru tahun ajaran 2026/2027 telah dibuka. Amankan kursi Anda sekarang.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button size="lg" render={<Link href="/kontak" />} className="text-sm font-semibold">
                <span>Daftar Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" render={<Link href="/program" />} className="border-neutral-300">
                Pilih Program Studi
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
