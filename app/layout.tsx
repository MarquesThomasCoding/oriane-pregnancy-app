import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MobileNav } from "@/components/mobile-nav"
import { FocusManager } from "@/components/focus-manager"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Oriane - Suivi de Grossesse",
  description: "Application moderne et accessible pour suivre votre grossesse",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased min-h-screen pb-[calc(80px+env(safe-area-inset-bottom))]`}
      >
        {/* Skip to content - premier élément focusable pour l'accessibilité */}
        <a
          href="#main-content"
          className="fixed top-0 left-0 z-[100] sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Aller au contenu principal
        </a>
        {/* Navigation en second pour l'ordre de tabulation */}
        <MobileNav />
        <FocusManager />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
