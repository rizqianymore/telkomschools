import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/img/telkom.jpeg"
            alt="Logo SMK Telkom"
            width={38}
            height={38}
            className="h-9 w-auto object-contain rounded-md"
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 leading-none">
              SMK Telkom <span className="text-primary">Jakarta</span>
            </span>
            <span className="text-[10px] font-medium text-neutral-500 tracking-wider uppercase mt-1">
              Pelopor Pendidikan Vokasi Digital
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-0.5">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-primary rounded-md hover:bg-neutral-50 transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <nav className="hidden lg:flex xl:hidden items-center gap-0.5">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-2 py-1.5 text-[11px] font-medium text-neutral-600 hover:text-primary rounded-md hover:bg-neutral-50 transition-colors whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            render={<Link href="/login" />}
            className="rounded-lg px-3 text-xs font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50"
          >
            Masuk
          </Button>
          <Button
            size="sm"
            render={<Link href="/kontak" />}
            className="rounded-lg px-3.5 text-xs font-medium whitespace-nowrap"
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
                    src="/img/telkom.jpeg"
                    alt="Logo SMK Telkom"
                    width={32}
                    height={32}
                    className="h-8 w-auto object-contain rounded-md"
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
                <Button
                  render={<Link href="/kontak" />}
                  className="w-full rounded-xl py-2.5 text-sm font-medium"
                >
                  Daftar Sekarang
                </Button>
                <Button
                  variant="outline"
                  render={<Link href="/login" />}
                  className="w-full rounded-xl py-2.5 text-sm font-medium border-neutral-200 text-neutral-800"
                >
                  Masuk ke Akun
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
