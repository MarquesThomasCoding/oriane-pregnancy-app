"use client"

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, Scale } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const weightData = [
  { week: "Sem 12", weight: 62 },
  { week: "Sem 16", weight: 64 },
  { week: "Sem 20", weight: 66.5 },
  { week: "Sem 24", weight: 69 },
  { week: "Sem 28", weight: 71.5 },
]

const entries = [
  { date: "7 novembre 2025", week: 24, weight: 69.0, gain: "+7.0 kg" },
  { date: "31 octobre 2025", week: 23, weight: 68.2, gain: "+6.2 kg" },
  { date: "24 octobre 2025", week: 22, weight: 67.5, gain: "+5.5 kg" },
  { date: "17 octobre 2025", week: 21, weight: 66.8, gain: "+4.8 kg" },
]

export default function PoidsPage() {
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
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Suivi du poids</h1>
          <p className="text-muted-foreground text-pretty">
            Suivez l'évolution de votre poids tout au long de votre grossesse.
          </p>
        </section>

        <Card className="p-6 bg-gradient-to-br from-primary/10 via-tertiary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Poids actuel</p>
              <p className="text-3xl font-bold text-foreground">69.0 kg</p>
              <p className="text-sm text-success mt-1 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +7.0 kg depuis le début
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-tertiary">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
        </Card>

        <Tabs defaultValue="graphique">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="graphique">Graphique</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="graphique" className="space-y-4 mt-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Évolution du poids</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis domain={[60, 75]} className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-4 bg-accent/30">
              <p className="text-sm text-muted-foreground text-pretty">
                <strong className="text-foreground">Recommandation:</strong> Une prise de poids de 11-16 kg est
                considérée comme normale pour une grossesse. Consultez votre médecin pour un suivi personnalisé.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="historique" className="space-y-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Pesées enregistrées</h2>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-3">
              {entries.map((entry, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">
                        {entry.date} • Semaine {entry.week}
                      </p>
                      <p className="text-2xl font-bold text-foreground">{entry.weight} kg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-success">{entry.gain}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
