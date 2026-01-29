"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Search } from "lucide-react"
import { useState } from "react"
import { AuthButton } from "@/components/auth-button"
import { useCompactMode } from "@/hooks/use-compact-mode"
import Image from "next/image"

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const isCompactMode = useCompactMode()

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // En mode compact, le header est intégré dans la MobileNav
  if (isCompactMode) {
    return null
  }

  return (
    <header className="sticky top-0 z-5 w-full h-17.5 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="container flex h-full items-center justify-between px-4 max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
            <Image src="/favicon-96x96.png" alt="Oriane Logo" width={44} height={44} className="rounded-2xl" />
          <span className="text-xl font-bold text-foreground hidden sm:inline">Oriane</span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* <Button size="icon" variant="ghost" className="h-11 w-11 rounded-full hover:bg-muted" aria-label="Recherche">
            <Search className="h-5 w-5" />
          </Button> */}

          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-full hover:bg-muted"
            onClick={toggleTheme}
            aria-label="Changer le thème"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <AuthButton />
        </div>
      </div>
    </header>
  )
}
