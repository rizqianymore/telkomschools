"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { SiswaSidebar } from "@/components/siswa-sidebar"
import { getStoredUser } from "@/lib/auth"

interface SiswaLayoutWrapperProps {
  children: React.ReactNode
  breadcrumbTitle?: string
}

export function SiswaLayoutWrapper({
  children,
  breadcrumbTitle,
}: SiswaLayoutWrapperProps) {
  const pathname = usePathname()
  const [user, setUser] = React.useState<{ name: string; email: string } | null>(null)
  const [counts, setCounts] = React.useState({ grades: 3, attendance: 5, bills: 0 })

  const pageTitle = breadcrumbTitle || (
    pathname === "/dashboard/siswa/ppdb" ? "Pendaftaran PPDB Online" :
    pathname === "/dashboard/siswa/nilai" ? "Nilai & Rapor" :
    pathname === "/dashboard/siswa/kehadiran" ? "Presensi & Kehadiran" :
    pathname === "/dashboard/siswa/tagihan" ? "Tagihan SPP & UKK" :
    pathname === "/dashboard/siswa/ortu" ? "Data Orang Tua / Wali" :
    "Ringkasan Akademik"
  )

  React.useEffect(() => {
    let isMounted = true

    Promise.all([
      (async () => {
        const stored = getStoredUser()
        if (stored) return { name: stored.name, email: stored.email }
        try {
          const res = await fetch("/api/auth/session")
          const json = await res.json()
          if (json.authenticated && json.user) {
            return { name: json.user.name, email: json.user.email }
          }
        } catch {}
        return null
      })(),
      fetch("/api/academic/nilai").then((r) => r.json()).catch(() => null),
      fetch("/api/academic/attendance").then((r) => r.json()).catch(() => null),
      fetch("/api/academic/bills").then((r) => r.json()).catch(() => null),
    ]).then(([userData, gradesJson, attJson, billsJson]) => {
      if (!isMounted) return
      if (userData) setUser(userData)
      setCounts({
        grades: gradesJson?.grades?.length || 3,
        attendance: attJson?.records?.length || 5,
        bills: billsJson?.bills?.filter((b: { status?: string }) => b.status === "belum_bayar")?.length || 0,
      })
    })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <SidebarProvider defaultOpen={true}>
      <SiswaSidebar user={user} counts={counts} />
      <SidebarInset className="bg-background flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-4">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-sm font-semibold text-foreground">
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/" />}
              className="text-xs h-8 text-muted-foreground hover:text-foreground"
            >
              Lihat Web Utama
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
