import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Kapan periode pendaftaran siswa baru (PPDB) dibuka?",
    answer:
      "Pendaftaran siswa baru dibuka secara bertahap dalam 3 gelombang setiap tahun ajaran (Jalur Prestasi, Reguler 1, dan Reguler 2). Calon siswa dapat mendaftar secara daring melalui portal resmi atau hadir langsung di kampus Cengkareng, Jakarta Barat.",
  },
  {
    question: "Apakah lulusan SMK Telkom Jakarta bisa langsung kuliah di PTN?",
    answer:
      "Tentu saja. Selain dipersiapkan kompetensi kerja industri, kami menyediakan kelas bimbingan intensif persiapan UTBK-SNBT sehingga puluhan lulusan kami rutin diterima di PTN favorit (UI, ITB, UGM, ITS, hingga Telkom University).",
  },
  {
    question: "Apa saja dokumen yang wajib disiapkan saat mendaftar?",
    answer:
      "Persyaratan administrasi awal meliputi salinan rapor 2 semester terakhir, Akta Kelahiran, Kartu Keluarga (KK), pas foto berwarna, dan sertifikat prestasi kejuaraan bagi pendaftar jalur prestasi.",
  },
  {
    question: "Bagaimana proses penyaluran kerja untuk lulusan?",
    answer:
      "Melalui unit Bursa Kerja Khusus (BKK) dan ekosistem Telkom Group, sekolah secara berkala menggelar campus recruitment bersama 50+ mitra industri teknologi nasional maupun multinasional.",
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
            className="mb-4 inline-flex items-center gap-2 rounded-md border-red-200 bg-red-50/70 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-primary shadow-none"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Pusat Informasi & Jawaban Cepat
          </h2>
          <p className="mt-3 text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Ringkasan informasi praktis yang paling sering ditanyakan oleh calon siswa dan orang tua.
          </p>
        </div>

        {/* Accordion Component - Standard shadcn style */}
        <div className="mt-10">
          <Accordion defaultValue={["item-0"]}>
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border-b border-neutral-200 py-1"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-neutral-900 hover:no-underline hover:text-primary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-neutral-600 leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg bg-neutral-50 p-4 border border-neutral-200">
            <p className="text-xs sm:text-sm text-neutral-600">
              Punya pertanyaan lain seputar beasiswa, rincian biaya, atau jadwal tes?
            </p>
            <Button
              variant="outline"
              render={<Link href="/faq" />}
              className="w-full sm:w-auto text-xs"
            >
              <span>Lihat Semua FAQ</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
