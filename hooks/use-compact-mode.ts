"use client"

import { useState, useEffect, useCallback } from "react"

const MIN_WIDTH_PER_NAV_ITEM = 140
const NAV_ITEMS_COUNT = 4
const ZOOM_THRESHOLD = 1.5

export function useCompactMode() {
  const [isCompactMode, setIsCompactMode] = useState(false)

  const checkCompactMode = useCallback(() => {
    const containerWidth = window.innerWidth
    const requiredWidth = NAV_ITEMS_COUNT * MIN_WIDTH_PER_NAV_ITEM
    
    // Utilise également le ratio de zoom via visualViewport si disponible
    const zoomLevel = window.visualViewport?.scale ?? 1
    const effectiveWidth = containerWidth / zoomLevel

    setIsCompactMode(effectiveWidth < requiredWidth || zoomLevel > ZOOM_THRESHOLD)
  }, [])

  useEffect(() => {
    checkCompactMode()

    // Écoute les changements de taille et de zoom
    window.addEventListener("resize", checkCompactMode)
    window.visualViewport?.addEventListener("resize", checkCompactMode)

    return () => {
      window.removeEventListener("resize", checkCompactMode)
      window.visualViewport?.removeEventListener("resize", checkCompactMode)
    }
  }, [checkCompactMode])

  return isCompactMode
}
