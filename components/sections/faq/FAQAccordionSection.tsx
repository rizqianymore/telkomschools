import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { BookOpen, GraduationCap, DollarSign } from "lucide-react"

const faqCategories = [
  {
    category: "Penerimaan Siswa Baru (PPDB)",
    icon: GraduationCap,
    items: [
      {
        q: "Kapan periode pendaftaran siswa baru dibuka?",
        a: "Pendaftaran dibuka dalam 3 gelombang (Prestasi, Reguler 1, dan Reguler 2) secara online atau langsung di sekretariat kampus SMK Telkom Jakarta.",
      },
      {
        q: "Apa saja dokumen persyaratan wajib yang harus disiapkan?",
        a: "Salinan rapor semester 1-5 SMP/MTs, Akta Kelahiran, Kartu Keluarga (KK), pas foto, dan sertifikat prestasi (khusus jalur prestasi).",
      },
      {
        q: "Apakah menerima calon siswa dari luar DKI Jakarta?",
        a: "Ya. SMK Telkom Jakarta menerima pendaftar dari seluruh Indonesia dengan proses seleksi yang dapat diikuti secara daring.",
      },
    ],
  },
  {
    category: "Kurikulum & Program Kejuruan",
    icon: BookOpen,
    items: [
      {
        q: "Apa perbedaan kurikulum kejuruan Telkom Schools?",
        a: "Mengintegrasikan Kurikulum Nasional dengan kurikulum industri (Cisco, Microsoft, Oracle) dan model pembelajaran berbasis proyek nyata.",
      },
      {
        q: "Apa saja pilihan jurusan di SMK Telkom Jakarta?",
        a: "Terdapat 4 jurusan: Rekayasa Perangkat Lunak (RPL), Teknik Komputer dan Jaringan (TKJ), Desain Komunikasi Visual (DKV), dan Teknik Jaringan Akses (TJA).",
      },
      {
        q: "Apakah lulusan bisa melanjutkan kuliah ke PTN?",
        a: "Bisa. Tersedia bimbingan studi lanjut dan banyak alumni diterima di PTN ternama serta Telkom University.",
      },
    ],
  },
  {
    category: "Biaya Pendidikan & Beasiswa",
    icon: DollarSign,
    items: [
      {
        q: "Apakah tersedia program beasiswa?",
        a: "Tersedia beasiswa prestasi akademik, beasiswa tahfidz Quran, dan beasiswa kejuaraan sains/teknologi/olahraga.",
      },
      {
        q: "Bagaimana mekanisme pembayaran biaya pendidikan?",
        a: "Pembayaran dapat diangsur via virtual account bank nasional yang terintegrasi di portal siswa.",
      },
    ],
  },
]

export function FAQAccordionSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
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
  )
}
