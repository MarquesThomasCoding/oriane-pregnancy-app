import { Card } from "@/components/ui/card"
import { Bell, Calendar, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationCardProps {
  type: "info" | "success" | "warning" | "appointment"
  title: string
  message: string
  time: string
  className?: string
}

const iconMap = {
  info: Bell,
  success: CheckCircle2,
  warning: AlertCircle,
  appointment: Calendar,
}

const colorMap = {
  info: "text-primary",
  success: "text-[oklch(0.75_0.11_195)]",
  warning: "text-[oklch(0.79_0.13_60)]",
  appointment: "text-tertiary",
}

export function NotificationCard({ type, title, message, time, className }: NotificationCardProps) {
  const Icon = iconMap[type]

  return (
    <Card className={cn("p-4 hover:shadow-md transition-shadow", className)}>
      <div className="flex gap-3">
        <div className={cn("mt-1", colorMap[type])}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="text-sm font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{message}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </div>
    </Card>
  )
}
