import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AiSupportWidget } from "@/components/layout/AiSupportWidget";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SMK Telkom Jakarta - Pelopor Pendidikan Vokasi Digital Unggul",
  description:
    "Portal resmi pendaftaran dan informasi SMK Telkom Jakarta. Sekolah kejuruan teknologi berkualitas berstandar nasional dan industri dengan keunggulan akademik, teknologi digital, dan karakter integritas.",
  keywords: [
    "SMK Telkom Jakarta",
    "Telkom Jakarta",
    "Sekolah Telkom",
    "Pendidikan Vokasi",
    "SMK Telkom",
    "Rekayasa Perangkat Lunak",
    "Teknik Komputer dan Jaringan",
    "Desain Komunikasi Visual",
    "Pendidikan Digital",
  ],
};

import { TooltipProvider } from "@/components/ui/tooltip";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-white font-sans text-neutral-900 antialiased">
        <TooltipProvider>
          <PageTransition>{children}</PageTransition>
          <AiSupportWidget />
        </TooltipProvider>
      </body>
    </html>
  );
}

