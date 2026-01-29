"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

/**
 * Composant qui gère le focus après la navigation.
 * Place le focus sur le contenu principal après chaque changement de page
 * pour éviter à l'utilisateur de reparcourir la navbar.
 */
export function FocusManager() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Ne pas déplacer le focus au premier rendu (chargement initial)
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Attendre que le DOM soit mis à jour
    requestAnimationFrame(() => {
      const mainContent = document.getElementById("main-content")
      
      if (mainContent) {
        // Rendre l'élément focusable temporairement s'il ne l'est pas
        if (!mainContent.hasAttribute("tabindex")) {
          mainContent.setAttribute("tabindex", "-1")
        }
        
        mainContent.focus({ preventScroll: false })
      }
    })
  }, [pathname])

  return null
}
