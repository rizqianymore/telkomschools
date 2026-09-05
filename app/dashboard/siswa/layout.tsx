import * as React from "react"
import { SiswaLayoutWrapper } from "@/components/siswa-layout-wrapper"

export default function SiswaDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SiswaLayoutWrapper>{children}</SiswaLayoutWrapper>
}
