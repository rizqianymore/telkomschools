import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"

const campusBranches = [
  {
    city: "Bandung (Pusat)",
    address: "Jl. Telekomunikasi No. 1, Terusan Buahbatu, Dayeuhkolot, Bandung, Jawa Barat",
    phone: "(022) 7564-108",
  },
  {
    city: "Jakarta",
    address: "Jl. Daan Mogot KM. 11, Cengkareng Timur, Jakarta Barat, DKI Jakarta",
    phone: "(021) 5451-697",
  },
  {
    city: "Purwokerto",
    address: "Jl. DI Panjaitan No. 128, Purwokerto Selatan, Banyumas, Jawa Tengah",
    phone: "(0281) 641-629",
  },
  {
    city: "Malang",
    address: "Jl. Danau Ranau, Sawojajar, Kedungkandang, Kota Malang, Jawa Timur",
    phone: "(0341) 712-500",
  },
  {
    city: "Medan",
    address: "Jl. Jamin Ginting KM. 11, Simpang Selayang, Medan Tuntungan, Sumatera Utara",
    phone: "(061) 836-1290",
  },
  {
    city: "Makassar",
    address: "Jl. A. P. Pettarani No. 4, Gunung Sari, Rappocini, Kota Makassar, Sulawesi Selatan",
    phone: "(0411) 867-000",
  },
]

export function ContactBranches() {
  return (
    <section className="bg-neutral-50/60 py-20 border-t border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-14">
          <Badge
            variant="outline"
            className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium"
          >
            Jaringan Nasional
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Jaringan Kampus Telkom Schools
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            Tersebar di kota-kota strategis di seluruh Indonesia di bawah Yayasan Pendidikan Telkom.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campusBranches.map((b, idx) => (
            <Card key={idx} className="border-neutral-200/90 bg-white p-6 shadow-sm hover:border-red-200 hover:shadow">
              <CardContent className="p-0">
                <h3 className="text-base font-bold text-neutral-900">{b.city}</h3>
                <p className="mt-2 text-xs text-neutral-600 leading-relaxed flex items-start gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </p>
                <div className="mt-3 text-xs font-medium text-neutral-700 flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{b.phone}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
