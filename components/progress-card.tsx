"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProgressCardProps {
  title: string
  progress: number
  subtitle?: string
  className?: string
  variant?: "primary" | "secondary" | "success"
}

export function ProgressCard({ title, progress, subtitle, className, variant = "primary" }: ProgressCardProps) {
  const variantStyles = {
    primary: "from-primary via-tertiary to-tertiary",
    secondary: "from-secondary via-tertiary to-primary",
    success: "from-success via-[oklch(0.75_0.11_195)] to-[oklch(0.75_0.11_195)]",
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <span className="text-2xl font-bold text-primary">{progress}%</span>
      </div>

      {subtitle && <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>}

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary/30">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out relative overflow-hidden",
            variantStyles[variant],
          )}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 shimmer" />
        </div>
      </div>
    </Card>
  )
}
