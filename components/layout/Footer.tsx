import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/img/telkom.jpeg"
                alt="Logo SMK Telkom"
                width={48}
                height={48}
                className="h-10 w-auto object-contain rounded-md"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-neutral-900 leading-tight">
                  SMK Telkom <span className="text-primary">Jakarta</span>
                </span>
                <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                  Yayasan Pendidikan Telkom
                </span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
              Pelopor pendidikan vokasi teknologi berkarakter digital di Jakarta. Menyiapkan talenta kejuruan masa depan yang kompeten, berakhlak mulia, dan berdaya saing global.
            </p>

            {/* Social Media Links with Minimal Neutral SVGs */}
            <div className="mt-6 flex items-center gap-2.5 text-neutral-500">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 transition-colors hover:border-primary hover:bg-red-50 hover:text-primary"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 transition-colors hover:border-primary hover:bg-red-50 hover:text-primary"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Youtube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 transition-colors hover:border-primary hover:bg-red-50 hover:text-primary"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 transition-colors hover:border-primary hover:bg-red-50 hover:text-primary"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Navigasi</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">Beranda</Link>
              </li>
              <li>
                <Link href="/tentang" className="transition-colors hover:text-primary">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/keunggulan" className="transition-colors hover:text-primary">Keunggulan</Link>
              </li>
              <li>
                <Link href="/program" className="transition-colors hover:text-primary">Program Pendidikan</Link>
              </li>
              <li>
                <Link href="/testimoni" className="transition-colors hover:text-primary">Testimoni</Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-primary">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Program List */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Program</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/program" className="transition-colors hover:text-primary">TK & PAUD</Link>
              </li>
              <li>
                <Link href="/program" className="transition-colors hover:text-primary">Sekolah Dasar (SD)</Link>
              </li>
              <li>
                <Link href="/program" className="transition-colors hover:text-primary">SMP Telkom</Link>
              </li>
              <li>
                <Link href="/program" className="transition-colors hover:text-primary">SMK / SMA Telkom</Link>
              </li>
              <li>
                <Link href="/program" className="transition-colors hover:text-primary">Kursus & Pelatihan</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900">Kontak</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Jl. Daan Mogot KM. 11, Cengkareng Timur, Jakarta Barat, DKI Jakarta</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>(021) 5451-697 / (021) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>info@smktelkom-jkt.sch.id</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-neutral-200" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-500 sm:flex-row">
          <p>© {new Date().getFullYear()} SMK Telkom Jakarta. Hak Cipta Dilindungi.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary transition-colors">Pusat Bantuan</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
