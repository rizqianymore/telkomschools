import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const studentTestimonials = [
  {
    name: "Rizky Ramadhan",
    role: "Senior Frontend Engineer di Unicorn Tech",
    grad: "Alumni SMK Telkom Angkatan 2019",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    fallback: "RR",
    quote:
      "SMK Telkom Jakarta memberikan bekal kejuruan IT dan kedisiplinan yang nyata. Saat masuk industri, perangkat dan alur kerja teknologi sudah terbiasa.",
  },
  {
    name: "Farhan Maulana",
    role: "DevOps & Cloud Engineer di Singapore",
    grad: "Alumni SMK Telkom Angkatan 2017",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    fallback: "FM",
    quote:
      "Laboratorium jaringan dan sertifikasi Cisco di sekolah membuka pintu karier global sebelum saya resmi lulus.",
  },
  {
    name: "Amanda Putri",
    role: "Juara 1 Lomba Kompetensi Siswa (LKS) Nasional",
    grad: "Siswa Kelas XII RPL",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    fallback: "AP",
    quote:
      "Fasilitas laboratorium dan bimbingan guru praktisi aktif membantu saya menguasai full-stack development dan memenangkan kejuaraan nasional.",
  },
]

const parentTestimonials = [
  {
    name: "Dr. Hendra Wijaya, Sp.A",
    role: "Orang Tua Siswa",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    fallback: "HW",
    quote:
      "Keseimbangan antara pembekalan teknologi mutakhir dan pendidikan budi pekerti sangat terasa dalam kemandirian anak saya.",
  },
  {
    name: "Ibu Nurhayati, S.E.",
    role: "Orang Tua Siswa",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    fallback: "NH",
    quote:
      "Komunikasi sekolah sangat transparan melalui sistem portal digital. Perkembangan akademis anak terpantau berkala.",
  },
]

export function TestimoniList() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Siswa & Alumni */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge variant="outline" className="mb-3 text-xs border-neutral-200 bg-neutral-100 text-neutral-800 font-medium">
            Alumni & Siswa
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Jejak Karya & Prestasi
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20">
          {studentTestimonials.map((item, idx) => (
            <Card key={idx} className="border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between rounded-xl">
              <CardContent className="p-0">
                <p className="text-sm text-neutral-600 italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <Avatar className="h-10 w-10 border border-neutral-200">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">{item.name}</h3>
                    <p className="text-xs text-primary font-medium">{item.role}</p>
                    <p className="text-[11px] text-neutral-400">{item.grad}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orang Tua */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge variant="outline" className="mb-3 text-xs border-neutral-200 bg-neutral-100 text-neutral-800 font-medium">
            Wali Murid
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Apresiasi Orang Tua
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {parentTestimonials.map((item, idx) => (
            <Card key={idx} className="border-neutral-200/90 bg-white p-6 shadow-sm flex flex-col justify-between rounded-xl">
              <CardContent className="p-0">
                <p className="text-sm text-neutral-600 italic leading-relaxed mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <Avatar className="h-10 w-10 border border-neutral-200">
                    <AvatarImage src={item.avatar} alt={item.name} />
                    <AvatarFallback>{item.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-sm font-bold text-neutral-900">{item.name}</h3>
                    <p className="text-xs text-neutral-500">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
