"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Search } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full h-[70px] bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="container flex h-full items-center justify-between px-4 max-w-6xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-tertiary to-secondary shadow-lg">
            <span className="text-xl font-bold text-white">O</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">Oriane</span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" className="h-11 w-11 rounded-full hover:bg-muted" aria-label="Recherche">
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 rounded-full hover:bg-muted"
            onClick={toggleTheme}
            aria-label="Changer le thème"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  )
}
