"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
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
  const [currentUser, setCurrentUser] = React.useState<AuthUser | null>(null)

  React.useEffect(() => {
    setCurrentUser(getStoredUser())
    const handleChange = () => setCurrentUser(getStoredUser())
    window.addEventListener("auth_state_changed", handleChange)
    return () => window.removeEventListener("auth_state_changed", handleChange)
  }, [])
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/img/image.png"
            alt="Logo SMK Telkom"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-neutral-900 leading-none">
              SMK Telkom <span className="text-primary">Jakarta</span>
            </span>
            <span className="text-[11px] font-medium text-neutral-500 tracking-wider uppercase mt-1">
              Pelopor Pendidikan Vokasi Digital
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary rounded-lg hover:bg-neutral-50 transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

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
                <SheetTitle className="flex items-center gap-2.5 text-base font-bold text-neutral-900">
                  <Image
                    src="/img/image.png"
                    alt="Logo SMK Telkom"
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                  <span>SMK Telkom Jakarta</span>
                </SheetTitle>
              </SheetHeader>

              <Separator className="my-5 bg-neutral-100" />

              <div className="flex flex-col space-y-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-red-50 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
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
