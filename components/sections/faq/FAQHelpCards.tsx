import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PhoneCall, Mail, MessageSquare, ArrowRight } from "lucide-react"

const contactHelpCards = [
  {
    icon: PhoneCall,
    title: "Telepon & WhatsApp",
    desc: "Layanan informasi pendaftaran setiap hari kerja pukul 08.00 - 16.00 WIB.",
    contact: "(021) 5451-697 / +62 812-3456-7890",
  },
  {
    icon: Mail,
    title: "Email Pelayanan",
    desc: "Kirimkan pertanyaan resmi seputar administrasi dan beasiswa.",
    contact: "info@smktelkom-jkt.sch.id",
  },
  {
    icon: MessageSquare,
    title: "Konsultasi Kampus",
    desc: "Kunjungi gedung sekretariat kampus SMK Telkom Jakarta Barat.",
    contact: "Senin - Sabtu (08.00 - 15.00 WIB)",
  },
]

export function FAQHelpCards() {
  return (
    <section className="bg-neutral-50/60 py-20 border-t border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium">
            Konsultasi Langsung
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Pertanyaan Belum Terjawab?
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            Staf konsultan pendidikan kami siap membantu Anda melalui kanal berikut.
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
  )
}
