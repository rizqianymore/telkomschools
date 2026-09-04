import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Rizky Ramadhan",
    role: "Alumni Telkom Schools (Software Engineer)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    fallback: "RR",
    content:
      "Telkom Schools memberikan pondasi kejuruan IT dan kedisiplinan yang sangat kuat. Kurikulum berbasis industri membuat saya langsung siap bersaing di dunia kerja setelah lulus.",
  },
  {
    name: "Dr. Hendra Wijaya",
    role: "Orang Tua Siswa (Kelas XI)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    fallback: "HW",
    content:
      "Perkembangan anak saya sangat terasa, tidak hanya dari sisi akademik tetapi juga karakter moral, kepemimpinan, dan kemandirian dalam lingkungan belajar yang kondusif.",
  },
  {
    name: "Amanda Putri",
    role: "Siswa Berprestasi (Juara Olimpiade Informatika)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    fallback: "AP",
    content:
      "Guru-guru sangat membimbing dan memfasilitasi setiap potensi minat siswa. Laboratorium komputer dan pembinaan intensif kompetisinya benar-benar berstandar unggul.",
  },
]

export function Testimonials() {
  return (
    <section id="testimoni" className="relative bg-neutral-50/60 py-20 md:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 uppercase tracking-wider text-xs border-red-200 bg-red-50/60 text-primary font-semibold"
          >
            Testimoni
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Apa Kata Mereka Tentang Kami?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Kisah nyata dari para siswa, orang tua, dan alumni yang telah menjadi bagian dari keluarga besar Telkom Schools.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <Card
              key={idx}
              className="flex h-full flex-col justify-between border-neutral-200/90 bg-white p-6 sm:p-7 shadow-sm hover:border-red-200 hover:shadow"
            >
              <CardContent className="p-0">
                <span className="text-3xl font-serif text-primary/40 select-none">&ldquo;</span>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed -mt-2">
                  {item.content}
                </p>
              </CardContent>

              {/* Author Info */}
              <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                <Avatar size="lg" className="h-10 w-10 border border-neutral-200">
                  <AvatarImage src={item.avatar} alt={item.name} />
                  <AvatarFallback className="bg-red-50 text-primary font-bold text-xs">
                    {item.fallback}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-bold text-neutral-900 leading-tight">
                    {item.name}
                  </div>
                  <div className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
