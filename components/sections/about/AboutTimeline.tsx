import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const timelines = [
  {
    year: "1992",
    title: "Pendirian Perintis",
    desc: "Sekolah kejuruan telekomunikasi pertama untuk mencetak teknisi handal nasional.",
  },
  {
    year: "2005",
    title: "Kampus Daan Mogot",
    desc: "Pengembangan kampus terpadu Jakarta Barat untuk informatika dan jaringan.",
  },
  {
    year: "2015",
    title: "Standar Telkom Schools",
    desc: "Akreditasi A Unggul berstandar internasional di bawah Yayasan Pendidikan Telkom.",
  },
  {
    year: "2026",
    title: "Kurikulum AI & Cloud",
    desc: "Integrasi menyeluruh kecerdasan buatan, cloud computing, dan keamanan siber.",
  },
]

export function AboutTimeline() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
          >
            Jejak Langkah
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Sejarah SMK Telkom Jakarta
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            Perjalanan transformasi vokasi digital terdepan di Indonesia.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {timelines.map((item, idx) => (
            <Card key={idx} className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
              <CardContent className="p-0">
                <span className="text-2xl font-extrabold text-primary">{item.year}</span>
                <h3 className="mt-3 text-base font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
