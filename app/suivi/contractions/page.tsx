"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Clock, AlertCircle } from "lucide-react"

interface Contraction {
  startTime: Date
  duration: number
}

export default function ContractionsPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [contractions, setContractions] = useState<Contraction[]>([])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000))
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, startTime])

  const startTimer = () => {
    setStartTime(new Date())
    setIsRunning(true)
    setElapsedTime(0)
  }

  const stopTimer = () => {
    if (startTime) {
      const duration = Math.floor((Date.now() - startTime.getTime()) / 1000)
      setContractions([{ startTime, duration }, ...contractions])
    }
    setIsRunning(false)
    setStartTime(null)
    setElapsedTime(0)
  }

  const resetAll = () => {
    setIsRunning(false)
    setStartTime(null)
    setElapsedTime(0)
    setContractions([])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getAverageInterval = () => {
    if (contractions.length < 2) return null
    const intervals = []
    for (let i = 0; i < contractions.length - 1; i++) {
      const interval = Math.floor(
        (contractions[i].startTime.getTime() - contractions[i + 1].startTime.getTime()) / 1000,
      )
      intervals.push(interval)
    }
    const avg = Math.floor(intervals.reduce((a, b) => a + b, 0) / intervals.length)
    return Math.floor(avg / 60)
  }

  const getAverageDuration = () => {
    if (contractions.length === 0) return null
    const avg = Math.floor(contractions.reduce((sum, c) => sum + c.duration, 0) / contractions.length)
    return avg
  }

  const averageInterval = getAverageInterval()
  const averageDuration = getAverageDuration()

  return (
    <div className="min-h-screen pt-14 2sm:pt-0 pb-20 md:pb-8">
      <Header />

      <main className="container px-4 py-6 space-y-6">
        {/* <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Aller au contenu principal
        </a> */}

        <section id="main-content">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Chronomètre de contractions</h1>
          <p className="text-muted-foreground text-pretty">
            Suivez la fréquence et la durée de vos contractions pour savoir quand partir à la maternité.
          </p>
        </section>

        <Card className="p-8 bg-gradient-to-br from-primary/5 via-tertiary/5 to-secondary/5">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-tertiary">
              <Clock className="h-12 w-12 text-white" />
            </div>
            <div className="text-center">
              <p className="text-6xl font-bold text-foreground tabular-nums">{formatTime(elapsedTime)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {isRunning ? "Contraction en cours" : "Appuyez pour démarrer"}
              </p>
            </div>
            <div className="flex gap-3 w-full max-w-xs">
              {!isRunning ? (
                <Button onClick={startTimer} size="lg" className="flex-1 h-14 text-lg">
                  <Play className="h-5 w-5 mr-2" />
                  Démarrer
                </Button>
              ) : (
                <Button onClick={stopTimer} size="lg" variant="destructive" className="flex-1 h-14 text-lg">
                  <Pause className="h-5 w-5 mr-2" />
                  Arrêter
                </Button>
              )}
              <Button onClick={resetAll} size="lg" variant="outline" className="h-14 bg-transparent">
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {contractions.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Intervalle moyen</p>
                <p className="text-2xl font-bold text-foreground">{averageInterval ? `${averageInterval} min` : "-"}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Durée moyenne</p>
                <p className="text-2xl font-bold text-foreground">{averageDuration ? `${averageDuration} sec` : "-"}</p>
              </Card>
            </div>

            <Card className="p-4 bg-[oklch(0.91_0.06_60)]/30 border-[oklch(0.79_0.13_60)]/30">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-[oklch(0.79_0.13_60)] shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Quand partir à la maternité ?</p>
                  <p className="text-muted-foreground text-pretty">
                    Généralement, partez quand les contractions sont régulières, toutes les 5 minutes, durant 1 minute,
                    pendant au moins 1 heure (règle du 5-1-1).
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Historique</h2>
                <Badge variant="secondary">{contractions.length} contractions</Badge>
              </div>

              <div className="space-y-2">
                {contractions.slice(0, 10).map((contraction, index) => (
                  <Card key={index} className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">
                          {contraction.startTime.toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground">Durée: {contraction.duration} secondes</p>
                      </div>
                      {index < contractions.length - 1 && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Intervalle:{" "}
                            {Math.floor(
                              (contraction.startTime.getTime() - contractions[index + 1].startTime.getTime()) /
                                1000 /
                                60,
                            )}{" "}
                            min
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
