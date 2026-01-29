"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import { Home, ClipboardList, HeartPulse, Apple, Menu, X, Moon, Sun, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCompactMode } from "@/hooks/use-compact-mode"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth-button"

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
    label: "Rendez-vous",
    icon: HeartPulse,
  },
  {
    href: "/nutrition/recherche",
    label: "Nutrition",
    icon: Apple,
  },
]

export function MobileNav() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const isCompactMode = useCompactMode()
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerButtonRef = useRef<HTMLButtonElement>(null)

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // Ferme le menu lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Focus trap et gestion du clavier
  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return

    const menuElement = menuRef.current
    const focusableElements = menuElement.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus sur le premier élément du menu à l'ouverture
    firstElement?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false)
        burgerButtonRef.current?.focus()
        return
      }

      if (e.key !== "Tab") return

      // Focus trap: empêche la tabulation de sortir du menu
      if (e.shiftKey) {
        // Shift + Tab: si on est sur le premier élément, aller au dernier
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab: si on est sur le dernier élément, aller au premier
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  return (
    <>
      {/* Overlay pour fermer le menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Menu burger déroulant */}
      {isCompactMode && isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed left-0 top-14 z-50 mx-4 mt-2 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur"
          role="menu"
          aria-label="Menu de navigation"
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const [, firstSegment] = item.href.split("/")
              const isActive = pathname === item.href || (firstSegment && pathname?.startsWith(`/${firstSegment}`))
              const Icon = item.icon

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive && "bg-primary/10 text-primary",
                    )}
                    role="menuitem"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Barre de navigation */}
      <nav
        id="navbar"
        className={cn(
          "fixed z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
          isCompactMode 
            ? "inset-x-0 top-0 border-b h-14" 
            : "inset-x-0 bottom-0 border-t"
        )}
        style={isCompactMode ? undefined : { paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
      >
        <div className={cn(
          "flex items-center px-3 h-full",
          isCompactMode 
            ? "justify-between" 
            : "mx-auto max-w-7xl justify-around min-h-17"
        )}>
          {isCompactMode ? (
            // Mode compact: header + burger combinés
            <>
              {/* Bouton burger à gauche */}
              <button
                ref={burgerButtonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-base font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isMenuOpen && "bg-accent text-accent-foreground",
                )}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
                <span>Menu</span>
              </button>

              {/* Logo au centre */}
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary via-tertiary to-secondary shadow-md">
                  <span className="text-lg font-bold text-white">O</span>
                </div>
              </Link>

              {/* Actions à droite */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full hover:bg-muted"
                  onClick={toggleTheme}
                  aria-label="Changer le thème"
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                <AuthButton />
              </div>
            </>
          ) : (
            // Mode navigation normale
            navItems.map((item) => {
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
            })
          )}
        </div>
      </nav>
    </>
  )
}
