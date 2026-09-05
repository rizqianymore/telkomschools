"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { removeStoredUser } from "@/lib/auth"
import {
  BookOpen,
  CalendarCheck,
  CreditCard,
  FileCheck,
  Users,
  Compass,
  HelpCircle,
  LogOut,
  School,
  LayoutDashboard,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarRail,
} from "@/components/ui/sidebar"

interface SiswaSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeTab?: string
  user: { name: string; email: string } | null
  counts?: {
    grades: number
    attendance: number
    bills: number
  }
}

export function SiswaSidebar({
  user,
  counts = { grades: 3, attendance: 5, bills: 0 },
  ...props
}: SiswaSidebarProps) {
  const pathname = usePathname()

  const navMain = [
    {
      title: "Ringkasan Akademik",
      href: "/dashboard/siswa",
      icon: LayoutDashboard,
    },
    {
      title: "Pendaftaran PPDB",
      href: "/dashboard/siswa/ppdb",
      icon: FileCheck,
    },
    {
      title: "Nilai & Rapor",
      href: "/dashboard/siswa/nilai",
      icon: BookOpen,
      badge: `${counts.grades}`,
    },
    {
      title: "Presensi & Kehadiran",
      href: "/dashboard/siswa/kehadiran",
      icon: CalendarCheck,
      badge: `${counts.attendance}`,
    },
    {
      title: "Tagihan SPP",
      href: "/dashboard/siswa/tagihan",
      icon: CreditCard,
      badge: counts.bills > 0 ? `${counts.bills}` : undefined,
    },
    {
      title: "Data Orang Tua",
      href: "/dashboard/siswa/ortu",
      icon: Users,
    },
  ]

  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } catch {}
    removeStoredUser()
    router.push("/")
    router.refresh()
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* SidebarHeader */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard/siswa" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <School className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">SMK Telkom</span>
                <span className="truncate text-xs text-muted-foreground">Portal Siswa</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* SidebarContent */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => {
                const isActive = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Layanan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/quiz" />} tooltip="Quiz Minat Jurusan">
                  <Compass />
                  <span>Quiz Minat Jurusan</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/kontak" />} tooltip="Bantuan / Kontak">
                  <HelpCircle />
                  <span>Bantuan CS</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* SidebarFooter */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-foreground font-semibold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name || "Muhammad Fadhil"}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.email || "siswa@smktelkom-jkt.sch.id"}</span>
              </div>
            </SidebarMenuButton>
            <SidebarMenuAction
              showOnHover={false}
              title="Keluar"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
