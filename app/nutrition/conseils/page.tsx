"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Apple, Heart, Flame } from "lucide-react"

const trimesterTips = {
  1: {
    title: "Premier trimestre (1-13 semaines)",
    tips: [
      {
        title: "Nausées matinales",
        content:
          "Mangez de petites quantités fréquemment. Privilégiez les aliments secs (crackers, biscottes) le matin avant de vous lever.",
      },
      {
        title: "Acide folique",
        content: "400 µg par jour minimum. Consommez des légumes verts à feuilles, légumineuses et céréales enrichies.",
      },
      {
        title: "Hydratation",
        content: "Buvez au moins 1.5L d'eau par jour. Le thé au gingembre peut aider contre les nausées.",
      },
      {
        title: "Vitamine B6",
        content: "Aide à réduire les nausées. Trouvée dans les bananes, poulet, poisson et pommes de terre.",
      },
    ],
  },
  2: {
    title: "Deuxième trimestre (14-27 semaines)",
    tips: [
      {
        title: "Fer",
        content:
          "Augmentez votre apport en fer (viande rouge maigre, légumineuses, épinards). Associez-le à de la vitamine C pour une meilleure absorption.",
      },
      {
        title: "Calcium",
        content: "1000-1200 mg par jour. 3-4 portions de produits laitiers. Alternatives: sardines, brocolis, amandes.",
      },
      {
        title: "Protéines",
        content: "Augmentez progressivement votre apport à 70-100g par jour. Variez les sources animales et végétales.",
      },
      {
        title: "Oméga-3",
        content: "2 portions de poisson gras par semaine (saumon, sardines, maquereau) pour le développement cérébral.",
      },
    ],
  },
  3: {
    title: "Troisième trimestre (28-40 semaines)",
    tips: [
      {
        title: "Repas fractionnés",
        content:
          "Mangez 5-6 petits repas par jour plutôt que 3 gros. Cela aide à réduire les reflux et l'inconfort digestif.",
      },
      {
        title: "Fibres",
        content:
          "25-30g par jour pour prévenir la constipation. Céréales complètes, fruits, légumes et beaucoup d'eau.",
      },
      {
        title: "Énergie",
        content:
          "+300-500 calories par jour supplémentaires. Privilégiez les aliments nutritifs plutôt que caloriques.",
      },
      {
        title: "Vitamine K",
        content: "Légumes verts pour la coagulation. Important en préparation de l'accouchement.",
      },
    ],
  },
}

const generalTips = [
  {
    title: "Préparez vos repas",
    content:
      "La préparation à l'avance vous aide à maintenir une alimentation équilibrée même quand vous êtes fatiguée.",
    icon: Apple,
  },
  {
    title: "Écoutez votre corps",
    content: "Mangez quand vous avez faim, mais choisissez des aliments nutritifs. Les fringales sont normales.",
    icon: Heart,
  },
  {
    title: "Activité physique",
    content: "Une marche de 30 minutes après les repas aide à la digestion et régule la glycémie.",
    icon: Flame,
  },
  {
    title: "Collations saines",
    content: "Ayez toujours des fruits secs, yaourts et fruits frais à portée de main.",
    icon: Lightbulb,
  },
]

export default function ConseilsPage() {
  const [selectedTrimester, setSelectedTrimester] = useState("2")

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
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Conseils nutritionnels</h1>
          <p className="text-muted-foreground text-pretty">
            Des recommandations adaptées à chaque trimestre de votre grossesse.
          </p>
        </section>

        <Tabs value={selectedTrimester} onValueChange={setSelectedTrimester}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1">T1</TabsTrigger>
            <TabsTrigger value="2">T2</TabsTrigger>
            <TabsTrigger value="3">T3</TabsTrigger>
          </TabsList>

          {Object.entries(trimesterTips).map(([trimester, data]) => (
            <TabsContent key={trimester} value={trimester} className="space-y-4 mt-6">
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-tertiary/10">
                <h2 className="text-xl font-semibold text-foreground mb-1">{data.title}</h2>
                <p className="text-sm text-muted-foreground">Conseils spécifiques à cette période</p>
              </Card>

              <div className="space-y-3">
                {data.tips.map((tip, index) => (
                  <Card key={index} className="p-4">
                    <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{tip.content}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-4">Conseils généraux</h2>

          <div className="space-y-3">
            {generalTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card key={index} className="p-4">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-tertiary">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground text-pretty">{tip.content}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <Card className="p-4 bg-accent/30">
          <p className="text-sm text-muted-foreground text-pretty">
            <strong className="text-foreground">Rappel:</strong> Ces conseils sont généraux. Demandez toujours l'avis de
            votre professionnel de santé pour des recommandations personnalisées selon votre situation.
          </p>
        </Card>
      </main>
    </div>
  )
}
