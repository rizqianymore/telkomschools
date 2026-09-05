import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const leadership = [
  {
    name: "Dr. Ir. Dwi S. Purnomo, M.M.",
    role: "Ketua Yayasan Pendidikan Telkom",
    desc: "25+ tahun memimpin transformasi institusi pendidikan teknologi dan tata kelola korporasi.",
  },
  {
    name: "Prof. Dr. Hendra Suhartono, M.T.",
    role: "Direktur Pendidikan Dasar & Menengah",
    desc: "Pakar kurikulum vokasi teknologi dan pembina kompetisi sains/teknologi.",
  },
  {
    name: "Dra. Ratna Kusumawati, M.Pd.",
    role: "Kepala Penjaminan Mutu & Karakter",
    desc: "Fokus pada budaya mutu standar ISO dan pengembangan karakter siswa berprestasi.",
  },
]

export function AboutLeadership() {
  return (
    <section className="bg-neutral-50/60 py-20 border-t border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
          >
            Kepemimpinan
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Pimpinan Yayasan Pendidikan Telkom
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            Didukung jajaran pendidik dan profesional berpengalaman luas di sektor industri teknologi.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {leadership.map((item, idx) => (
            <Card key={idx} className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
              <CardContent className="p-0">
                <div className="h-12 w-12 rounded-full bg-red-50 text-primary font-bold flex items-center justify-center text-lg mb-4">
                  {item.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{item.name}</h3>
                <p className="text-xs font-semibold text-primary mt-1 mb-3">{item.role}</p>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
