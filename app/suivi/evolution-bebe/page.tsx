"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Baby, Ruler, Weight } from "lucide-react"

const weeklyData = [
  {
    week: 24,
    trimester: 2,
    size: "30 cm",
    weight: "600 g",
    fruit: "Épi de maïs",
    development:
      "Les poumons de votre bébé continuent de se développer. Ses sens s'affinent et il commence à distinguer les sons.",
    tips: "Parlez à votre bébé, il reconnaît maintenant votre voix. Continuez à pratiquer une activité physique douce.",
  },
  {
    week: 23,
    trimester: 2,
    size: "28 cm",
    weight: "550 g",
    fruit: "Papaye",
    development: "Le bébé peut maintenant entendre votre voix et les battements de votre cœur.",
    tips: "Commencez à lire des histoires ou à chanter des berceuses.",
  },
  {
    week: 22,
    trimester: 2,
    size: "27 cm",
    weight: "500 g",
    fruit: "Courge spaghetti",
    development: "Les yeux sont formés mais l'iris n'a pas encore de pigmentation.",
    tips: "Reposez-vous suffisamment et évitez de rester debout trop longtemps.",
  },
]

export default function EvolutionBebePage() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
  const currentWeek = weeklyData[currentWeekIndex]

  const previousWeek = () => {
    if (currentWeekIndex < weeklyData.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1)
    }
  }

  const nextWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1)
    }
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <Header />

      <main className="container px-4 py-6 space-y-6">
        {/* <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Aller au contenu principal
        </a> */}

        <section id="main-content">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Évolution de bébé</h1>
          <p className="text-muted-foreground text-pretty">
            Découvrez le développement de votre bébé semaine après semaine.
          </p>
        </section>

        <Card className="p-6 bg-gradient-to-br from-primary/10 via-tertiary/10 to-secondary/10">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousWeek}
              disabled={currentWeekIndex >= weeklyData.length - 1}
              aria-label="Semaine précédente"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Trimestre {currentWeek.trimester}</p>
              <p className="text-3xl font-bold text-foreground">Semaine {currentWeek.week}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextWeek}
              disabled={currentWeekIndex <= 0}
              aria-label="Semaine suivante"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-tertiary">
              <Baby className="h-10 w-10 text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center">
              <Ruler className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{currentWeek.size}</p>
              <p className="text-xs text-muted-foreground mt-1">Taille</p>
            </Card>
            <Card className="p-4 text-center">
              <Weight className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">{currentWeek.weight}</p>
              <p className="text-xs text-muted-foreground mt-1">Poids</p>
            </Card>
          </div>

          <Card className="p-4 mt-4 bg-white/50">
            <p className="text-sm text-muted-foreground text-center">
              Taille d'un(e) <strong className="text-foreground">{currentWeek.fruit}</strong>
            </p>
          </Card>
        </Card>

        <Tabs defaultValue="developpement">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="developpement">Développement</TabsTrigger>
            <TabsTrigger value="conseils">Conseils</TabsTrigger>
          </TabsList>

          <TabsContent value="developpement" className="mt-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-3">Cette semaine</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">{currentWeek.development}</p>
            </Card>
          </TabsContent>

          <TabsContent value="conseils" className="mt-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-3">Conseils pour vous</h2>
              <p className="text-muted-foreground text-pretty leading-relaxed">{currentWeek.tips}</p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
