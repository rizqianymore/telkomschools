import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Kapan periode pendaftaran siswa baru SMK Telkom Jakarta dibuka?",
    answer:
      "Pendaftaran siswa baru (PPDB) dibuka sepanjang tahun akademik secara bertahap dalam beberapa gelombang. Anda dapat mendaftar secara online melalui portal resmi kami atau langsung mengunjungi sekretariat pendaftaran di kampus SMK Telkom Jakarta.",
  },
  {
    question: "Apa saja kurikulum dan konsentrasi keahlian yang ditawarkan?",
    answer:
      "Kami menerapkan Kurikulum Merdeka yang diperkaya dengan kurikulum vokasi berbasis teknologi informasi dan industri. Jurusan unggulan meliputi Rekayasa Perangkat Lunak (RPL), Teknik Komputer dan Jaringan (TKJ), serta Desain Komunikasi Visual (DKV).",
  },
  {
    question: "Apakah tersedia program beasiswa untuk siswa berprestasi?",
    answer:
      "Ya, SMK Telkom Jakarta menyediakan berbagai skema beasiswa, mulai dari beasiswa prestasi akademik, beasiswa kejuaraan sains/teknologi/olahraga, hingga program bantuan pendidikan dari Yayasan Pendidikan Telkom.",
  },
  {
    question: "Bagaimana dengan fasilitas laboratorium dan teknologi pendukung?",
    answer:
      "Sekolah kami dilengkapi dengan laboratorium komputer mutakhir, studio multimedia, lab Cisco networking, akses internet fiber optic berkecepatan tinggi, perpustakaan digital, serta ruang kelas interaktif modern.",
  },
  {
    question: "Apakah lulusan SMK Telkom Jakarta dibantu dalam penyaluran kerja dan kuliah?",
    answer:
      "Benar. Kami memiliki unit Bursa Kerja Khusus (BKK) yang bermitra dengan lebih dari 100 perusahaan teknologi skala nasional dan multinasional, serta program pembinaan akselerasi tembus perguruan tinggi negeri (PTN) dan perguruan tinggi kedinasan.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative bg-white py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/60 text-primary font-semibold"
          >
            Pertanyaan Umum
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Informasi penting seputar pendaftaran, kurikulum kejuruan, fasilitas, dan prospek kelulusan di SMK Telkom Jakarta.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="mt-12 rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-sm">
          <Accordion defaultValue={["item-0"]}>
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border-b border-neutral-100 py-3 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-neutral-900 hover:text-primary py-2">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-neutral-600 leading-relaxed pt-1 pb-3">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
