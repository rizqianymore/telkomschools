import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function LoginHeader() {
  return (
    <div className="flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-3 cursor-pointer group focus:outline-none"
        title="Kembali ke Halaman Utama"
      >
        <Image
          src="/img/image.png"
          alt="Logo SMK Telkom"
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
          priority
        />
        <span className="text-base font-bold tracking-tight text-neutral-900 leading-none">
          SMK Telkom <span className="text-primary">Jakarta</span>
        </span>
      </Link>

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  )
}
