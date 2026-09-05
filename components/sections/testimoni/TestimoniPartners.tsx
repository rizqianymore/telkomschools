import { Badge } from "@/components/ui/badge"
import { Building2 } from "lucide-react"

const hiringPartners = [
  { name: "Telkom Indonesia", type: "Telekomunikasi & Digital Telco" },
  { name: "Telkomsel", type: "Mobile Network Provider" },
  { name: "Mitratel", type: "Digital Infrastructure" },
  { name: "Finnet Indonesia", type: "Fintech & Payment Gateway" },
  { name: "Telkomsigma", type: "Enterprise Cloud & Data Center" },
  { name: "Agate Games", type: "Game Development Studio" },
]

export function TestimoniPartners() {
  return (
    <section className="bg-neutral-50/60 py-20 border-t border-neutral-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge variant="outline" className="mb-3 text-xs border-red-200 bg-red-50/70 text-primary font-medium">
            Kemitraan Industri
          </Badge>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900">
            Mitra Penyerapan Kerja & Magang
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Lulusan Telkom Schools dipercaya berkarier di ekosistem Telkom Group dan perusahaan teknologi terkemuka.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {hiringPartners.map((partner, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-white p-4 text-center shadow-sm"
            >
              <Building2 className="h-6 w-6 text-neutral-400 mb-2" />
              <div className="text-xs font-bold text-neutral-900">{partner.name}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5">{partner.type}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
