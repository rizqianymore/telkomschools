"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, UserCheck, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { getStoredUser, removeStoredUser, AuthUser } from "@/lib/auth"

const navLinks = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/tentang" },
  { name: "Keunggulan", href: "/keunggulan" },
  { name: "Program", href: "/program" },
  { name: "Quiz Jurusan", href: "/quiz" },
  { name: "Testimoni", href: "/testimoni" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontak", href: "/kontak" },
]

export function Navbar() {
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = React.useState<AuthUser | null>(() => getStoredUser())
  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleChange = () => setCurrentUser(getStoredUser())
    window.addEventListener("auth_state_changed", handleChange)
    return () => window.removeEventListener("auth_state_changed", handleChange)
  }, [])
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/75 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 cursor-pointer group focus:outline-none"
          title="Kembali ke Halaman Utama"
        >
          <Image
            src="/img/image.png"
            alt="Logo SMK Telkom"
            width={40}
            height={40}
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-neutral-900 leading-none">
            SMK Telkom <span className="text-primary">Jakarta</span>
          </span>
        </Link>

        {/* Desktop Links with Apple-style Liquid Glass Floating Indicator */}
        <nav
          className="hidden lg:flex items-center p-1.5 rounded-full bg-neutral-100/70 backdrop-blur-md border border-neutral-200/50 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] relative"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.name}
                href={item.href}
                onMouseEnter={() => setHoveredPath(item.href)}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors whitespace-nowrap z-10 select-none ${
                  isActive
                    ? "text-red-700 font-bold"
                    : "text-neutral-600 hover:text-neutral-950"
                }`}
              >
                {/* Sliding Liquid Glass Bubble on Active */}
                {isActive && (
                  <motion.div
                    layoutId="active-glass-bubble"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-full bg-white/90 backdrop-blur-xl border border-white/80 shadow-[0_2px_12px_rgba(239,68,68,0.12),0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] -z-10"
                  >
                    {/* Subtle red tint glow at the bottom */}
                    <span className="absolute inset-x-2 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
                  </motion.div>
                )}

                {/* Hover glass hover state (when not active) */}
                {hoveredPath === item.href && !isActive && (
                  <motion.div
                    layoutId="hover-glass-pill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-full bg-white/50 backdrop-blur-sm -z-20 border border-white/40 shadow-[0_1px_4px_rgba(0,0,0,0.03)]"
                  />
                )}

                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Pembatas Vertikal antara Navigasi & Tombol Masuk/Daftar */}
        <div className="hidden lg:block h-6 w-px bg-neutral-200" />

        {/* CTA Button with standard button size */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-100 text-sm font-medium text-neutral-800 border border-neutral-200/70">
                <UserCheck className="h-4 w-4 text-primary" />
                <span className="max-w-[130px] truncate">{currentUser.name}</span>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  removeStoredUser()
                  setCurrentUser(null)
                }}
                className="h-9 px-2.5 text-neutral-500 hover:text-red-600 rounded-md"
                title="Keluar"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              render={<Link href="/login" />}
              className="h-9 px-4 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-100 rounded-md"
            >
              Masuk
            </Button>
          )}
          <Button
            render={<Link href="/kontak" />}
            className="h-9 px-4 text-sm font-medium rounded-md shadow-sm"
          >
            Daftar Sekarang
          </Button>
        </div>

        {/* Mobile Sheet Menu */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl border-neutral-200"
                  aria-label="Buka Menu Navigasi"
                />
              }
            >
              <Menu className="h-5 w-5 text-neutral-700" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px] p-6 bg-white">
              <SheetHeader className="p-0 text-left">
                <SheetTitle className="p-0 text-base font-bold text-neutral-900">
                  <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                      src="/img/image.png"
                      alt="Logo SMK Telkom"
                      width={36}
                      height={36}
                      className="h-9 w-9 object-contain"
                    />
                    <span>SMK Telkom Jakarta</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <Separator className="my-5 bg-neutral-100" />

              <div className="flex flex-col space-y-1">
                {navLinks.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`)

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors flex items-center justify-between ${
                        isActive
                          ? "bg-red-50 text-primary font-bold border-l-4 border-primary pl-3"
                          : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      <span>{item.name}</span>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </Link>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-col gap-2.5">
                {currentUser ? (
                  <div className="p-3.5 rounded-md bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-100 text-primary">
                        <UserCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 leading-tight">{currentUser.name}</div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">{currentUser.role_label}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeStoredUser()
                        setCurrentUser(null)
                      }}
                      className="text-red-600 hover:text-red-700 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <LogOut className="h-3 w-3" />
                      <span>Keluar</span>
                    </button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    render={<Link href="/login" />}
                    className="w-full h-10 rounded-md text-sm font-medium border-neutral-200 text-neutral-800"
                  >
                    Masuk ke Akun
                  </Button>
                )}
                <Button
                  render={<Link href="/kontak" />}
                  className="w-full h-10 rounded-md text-sm font-medium"
                >
                  Daftar Sekarang
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
