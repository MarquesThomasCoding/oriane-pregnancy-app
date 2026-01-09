"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, AlertCircle } from "lucide-react"

interface Symptom {
  id: string
  date: Date
  type: string
  severity: "Léger" | "Modéré" | "Sévère"
  description: string
}

const symptoms: Symptom[] = [
  {
    id: "1",
    date: new Date(2025, 10, 7),
    type: "Nausées",
    severity: "Modéré",
    description: "Nausées matinales, mieux après petit-déjeuner",
  },
  {
    id: "2",
    date: new Date(2025, 10, 6),
    type: "Fatigue",
    severity: "Léger",
    description: "Fatigue en fin de journée",
  },
  {
    id: "3",
    date: new Date(2025, 10, 5),
    type: "Contractions",
    severity: "Léger",
    description: "Quelques contractions de Braxton Hicks",
  },
  {
    id: "4",
    date: new Date(2025, 10, 3),
    type: "Douleurs dorsales",
    severity: "Modéré",
    description: "Douleurs lombaires après station debout prolongée",
  },
]

const commonSymptoms = [
  "Nausées",
  "Fatigue",
  "Contractions",
  "Douleurs dorsales",
  "Reflux",
  "Insomnie",
  "Jambes lourdes",
  "Maux de tête",
]

export default function SymptomesPage() {
  const [selectedTab, setSelectedTab] = useState("journal")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Léger":
        return "bg-success/20 text-success border-success/30"
      case "Modéré":
        return "bg-[oklch(0.91_0.06_60)]/50 text-[oklch(0.79_0.13_60)] border-[oklch(0.79_0.13_60)]/30"
      case "Sévère":
        return "bg-[oklch(0.91_0.06_25)]/50 text-[oklch(0.79_0.13_25)] border-[oklch(0.79_0.13_25)]/30"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <Header />

      <main className="container px-4 py-6 space-y-6">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Aller au contenu principal
        </a>

        <section id="main-content">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Journal des symptômes</h1>
          <p className="text-muted-foreground text-pretty">
            Suivez vos symptômes quotidiens pour mieux les comprendre et en parler avec votre équipe médicale.
          </p>
        </section>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Symptômes récents</h2>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {symptoms.map((symptom) => (
                <Card key={symptom.id} className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{symptom.type}</h3>
                    <Badge className={getSeverityColor(symptom.severity)} variant="outline">
                      {symptom.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{symptom.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {symptom.date.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-accent/30 border-primary/20">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Conseil</p>
                  <p className="text-muted-foreground text-pretty">
                    Notez régulièrement vos symptômes pour identifier des tendances et en discuter avec votre
                    professionnel de santé lors des consultations.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="statistiques" className="space-y-4 mt-6">
            <h2 className="text-lg font-semibold">Symptômes les plus fréquents</h2>

            <Card className="p-6">
              <div className="flex items-center justify-center gap-3 py-8 text-muted-foreground">
                <TrendingUp className="h-12 w-12" />
                <div>
                  <p className="font-medium">Analyse statistique</p>
                  <p className="text-sm">Graphiques et tendances disponibles prochainement</p>
                </div>
              </div>
            </Card>

            <h2 className="text-lg font-semibold">Symptômes courants</h2>

            <div className="grid grid-cols-2 gap-2">
              {commonSymptoms.map((symptom) => (
                <Button key={symptom} variant="outline" className="h-auto py-3 justify-start bg-transparent">
                  {symptom}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
