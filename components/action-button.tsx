import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActionButtonProps {
  href: string
  icon: LucideIcon
  label: string
  className?: string
}

export function ActionButton({ href, icon: Icon, label, className }: ActionButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        className={cn(
          "h-auto min-h-[88px] w-full flex-col gap-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
          className,
        )}
      >
        <Icon className="h-6 w-6" />
        <span className="text-sm font-medium text-center">{label}</span>
      </Button>
    </Link>
  )
}
