import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Telkom Schools - Membangun Generasi Unggul & Berkarakter Digital",
  description:
    "Portal resmi pendaftaran dan informasi Telkom Schools. Lembaga pendidikan berkualitas berstandar nasional dengan keunggulan akademik, teknologi digital, dan karakter integritas.",
  keywords: [
    "Telkom Schools",
    "Sekolah Telkom",
    "Pendidikan Vokasi",
    "SMK Telkom",
    "SMP Telkom",
    "Pendidikan Digital",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white font-sans text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
