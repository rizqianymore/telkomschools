import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SiswaStatCardProps {
  label: string
  value: string | number
  subtext: string
  icon: LucideIcon
}

export function SiswaStatCard({
  label,
  value,
  subtext,
  icon: Icon,
}: SiswaStatCardProps) {
  return (
    <Card className="rounded-lg border-border shadow-none">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold tracking-tight text-foreground">{value}</p>
          <p className="text-[11px] text-muted-foreground">{subtext}</p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  )
}
