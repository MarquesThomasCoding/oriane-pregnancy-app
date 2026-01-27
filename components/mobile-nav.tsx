"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ClipboardList, HeartPulse, Apple, Info } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/",
    label: "Accueil",
    icon: Home,
  },
  {
    href: "/checklists/trousseau",
    label: "Checklists",
    icon: ClipboardList,
  },
  {
    href: "/suivi/calendrier",
    label: "Médical",
    icon: HeartPulse,
  },
  {
    href: "/nutrition/recherche",
    label: "Nutrition",
    icon: Apple,
  },
  // {
  //   href: "/infos/maternite",
  //   label: "Infos",
  //   icon: Info,
  // },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      id="navbar"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
    >
      <div className="mx-auto flex min-h-17 max-w-7xl items-center justify-around px-3">
        {navItems.map((item) => {
          const [, firstSegment] = item.href.split("/")
          const isActive = pathname === item.href || (firstSegment && pathname?.startsWith(`/${firstSegment}`))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={cn(
                "flex min-w-13 flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring",
                isActive && "text-primary",
              )}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
