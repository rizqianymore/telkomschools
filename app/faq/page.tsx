import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { MessageSquare, PhoneCall, Mail, ArrowRight, BookOpen, GraduationCap, DollarSign } from "lucide-react"

export const metadata: Metadata = {
  title: "Pusat Bantuan & FAQ - SMK Telkom Jakarta",
  description: "Daftar lengkap jawaban pertanyaan seputar PPDB, kurikulum kejuruan, fasilitas lab, biaya, dan beasiswa di SMK Telkom Jakarta.",
}

const faqCategories = [
  {
    category: "Penerimaan & Pendaftaran Siswa Baru (PPDB)",
    icon: GraduationCap,
    items: [
      {
        q: "Kapan periode pendaftaran siswa baru SMK Telkom Jakarta dibuka?",
        a: "Pendaftaran siswa baru dibuka dalam 3 gelombang setiap tahun ajaran (Gelombang Prestasi, Reguler 1, dan Reguler 2). Calon siswa dapat mendaftar secara online melalui portal resmi atau langsung di sekretariat kampus SMK Telkom Jakarta di Cengkareng, Jakarta Barat.",
      },
      {
        q: "Apa saja dokumen persyaratan wajib yang harus disiapkan?",
        a: "Dokumen yang dibutuhkan meliputi salinan rapor 2 semester terakhir, Akta Kelahiran, Kartu Keluarga (KK), pas foto berwarna terbaru, dan piagam/sertifikat kejuaraan bagi pendaftar jalur prestasi.",
      },
      {
        q: "Apakah siswa dari luar DKI Jakarta bisa mendaftar?",
        a: "Tentu saja. SMK Telkom Jakarta menerima siswa dari seluruh wilayah Indonesia. Seluruh alur administrasi dan tes seleksi dapat diikuti secara daring.",
      },
    ],
  },
  {
    category: "Kurikulum, Jurusan & Pembelajaran",
    icon: BookOpen,
    items: [
      {
        q: "Apa perbedaan kurikulum SMK Telkom Jakarta dengan sekolah umum lainnya?",
        a: "SMK Telkom Jakarta mengintegrasikan Kurikulum Merdeka dengan kurikulum industri teknologi terkini (Cisco, Microsoft, Oracle). Siswa mempelajari software engineering, cloud, cybersecurity, dan multimedia terapan sejak dini dengan metode pembelajaran berbasis proyek riil.",
      },
      {
        q: "Apa saja pilihan jurusan di SMK Telkom Jakarta?",
        a: "SMK Telkom Jakarta memiliki 3 jurusan favorit: Rekayasa Perangkat Lunak (RPL), Teknik Komputer dan Jaringan (TKJ), serta Desain Komunikasi Visual (DKV). Seluruh jurusan memiliki akreditasi A Unggul.",
      },
      {
        q: "Apakah lulusan SMK Telkom Jakarta bisa langsung lanjut kuliah ke PTN?",
        a: "Sangat bisa. Kami memiliki program kelas bimbingan tembus perguruan tinggi negeri (UI, ITB, UGM, ITS, Telkom University) dengan tingkat kelulusan tinggi bagi siswa yang ingin melanjutkan studi.",
      },
    ],
  },
  {
    category: "Biaya Pendidikan & Program Beasiswa",
    icon: DollarSign,
    items: [
      {
        q: "Apakah tersedia program beasiswa pendidikan?",
        a: "Ya. Yayasan Pendidikan Telkom menyediakan berbagai kategori beasiswa: Beasiswa Prestasi Akademik, Beasiswa Hafidz Quran, Beasiswa Juara Sains/Teknologi/Olahraga, dan Bantuan Pendidikan Putra Karyawan/Keluarga Prasejahtera.",
      },
      {
        q: "Bagaimana sistem pembayaran biaya pendidikan di Telkom Schools?",
        a: "Pembayaran biaya pendidikan (Uang Pangkal dan SPP bulanan) dapat diangsur secara bertahap melalui sistem virtual account multi-bank nasional yang terhubung otomatis di dashboard wali murid.",
      },
    ],
  },
]

const contactHelpCards = [
  {
    icon: PhoneCall,
    title: "Layanan Telepon & WhatsApp",
    desc: "Hubungi petugas admisi kami setiap hari kerja Senin - Jumat pukul 08.00 - 16.00 WIB.",
    contact: "(021) 1234-5678 / +62 812-3456-7890",
  },
  {
    icon: Mail,
    title: "Email Layanan Admisi",
    desc: "Kirimkan pertanyaan resmi seputar administrasi, berkas pendaftaran, dan beasiswa.",
    contact: "admissions@telkomschools.sch.id",
  },
  {
    icon: MessageSquare,
    title: "Konsultasi Tatap Muka",
    desc: "Kunjungi gedung sekretariat kampus Telkom Schools terdekat di kota Anda.",
    contact: "Senin - Sabtu (08.00 - 15.00 WIB)",
  },
]

export default function FAQPage() {
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
              Pusat Bantuan & FAQ
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Pertanyaan yang <span className="text-primary">Sering Diajukan</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 leading-relaxed">
              Temukan klarifikasi dan jawaban lengkap atas seluruh pertanyaan seputar pendaftaran, biaya, sistem kurikulum, dan beasiswa di Telkom Schools.
            </p>
          </div>
        </section>

        {/* Categorized FAQs */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
            {faqCategories.map((cat, cIdx) => {
              const Icon = cat.icon
              return (
                <div key={cIdx} className="rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 border-b border-neutral-100 pb-4 mb-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-neutral-900">{cat.category}</h2>
                  </div>

                  <Accordion defaultValue={[`faq-${cIdx}-0`]}>
                    {cat.items.map((item, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`faq-${cIdx}-${idx}`}
                        className="border-b border-neutral-100 py-3 last:border-b-0"
                      >
                        <AccordionTrigger className="text-left text-base font-semibold text-neutral-900 hover:text-primary py-2">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-neutral-600 leading-relaxed pt-1 pb-3">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )
            })}
          </div>
        </section>

        {/* Help Cards */}
        <section className="bg-neutral-50/60 py-20 border-t border-neutral-200/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="outline" className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/70 text-primary font-semibold">
                Konsultasi Langsung
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
                Pertanyaan Anda Belum Terjawab?
              </h2>
              <p className="mt-4 text-base text-neutral-600 leading-relaxed">
                Staf konsultan pendidikan kami siap melayani Anda melalui berbagai kanal resmi di bawah ini.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {contactHelpCards.map((item, idx) => {
                const Icon = item.icon
                return (
                  <Card key={idx} className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
                    <CardContent className="p-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-primary mb-4">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                      <div className="mt-4 border-t border-neutral-100 pt-3 text-sm font-semibold text-primary">
                        {item.contact}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" render={<Link href="/kontak" />} className="text-sm font-semibold">
                <span>Hubungi Kami di Halaman Kontak</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
