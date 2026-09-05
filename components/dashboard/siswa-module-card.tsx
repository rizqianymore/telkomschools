import * as React from "react"
import Link from "next/link"
import { LucideIcon, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface SiswaModuleCardProps {
  title: string
  description: string
  href: string
  buttonLabel: string
  icon: LucideIcon
  badgeText: string
  badgeVariant?: "outline" | "destructive"
}

export function SiswaModuleCard({
  title,
  description,
  href,
  buttonLabel,
  icon: Icon,
  badgeText,
  badgeVariant = "outline",
}: SiswaModuleCardProps) {
  return (
    <Card className="rounded-lg border-border shadow-none flex flex-col justify-between">
      <CardHeader className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground">
            <Icon className="h-4 w-4" />
          </div>
          <Badge variant={badgeVariant} className="text-[10px] px-1.5 py-0 font-normal">
            {badgeText}
          </Badge>
        </div>
        <CardTitle className="text-sm font-semibold text-foreground mt-2.5">
          {title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-0.5">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          render={<Link href={href} />}
          className="w-full text-xs justify-between h-8 rounded-md font-medium"
        >
          <span>{buttonLabel}</span>
          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </CardContent>
    </Card>
  )
}
