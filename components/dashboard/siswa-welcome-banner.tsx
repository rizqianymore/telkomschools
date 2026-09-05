import * as React from "react"
import Link from "next/link"
import { Compass, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SiswaWelcomeBannerProps {
  name: string
  nis: string
}

export function SiswaWelcomeBanner({ name, nis }: SiswaWelcomeBannerProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Selamat Datang, {name}
            </h1>
            <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
              NIS {nis}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Akses perkembangan akademik, rekap presensi, status PPDB, dan administrasi sekolah.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            render={<Link href="/quiz" />}
            size="sm"
            className="text-xs h-8 px-3 rounded-md font-medium"
          >
            <Compass className="h-3.5 w-3.5 mr-1.5" />
            Quiz Minat
          </Button>
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/kontak" />}
            className="text-xs h-8 px-3 rounded-md font-medium"
          >
            <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
            Bantuan CS
          </Button>
        </div>
      </div>
    </div>
  )
}
