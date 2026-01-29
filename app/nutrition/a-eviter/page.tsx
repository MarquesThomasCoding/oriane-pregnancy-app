"use client"

import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { XCircle, AlertTriangle, Wine, Fish, Beef } from "lucide-react"

const categories = [
  {
    id: "strictement-interdits",
    name: "Strictement interdits",
    icon: XCircle,
    severity: "danger",
    foods: [
      {
        name: "Alcool",
        reason: "Passage direct dans le sang du bébé, risque de syndrome d'alcoolisation fœtale",
      },
      { name: "Fromages au lait cru", reason: "Risque de listériose" },
      { name: "Viande crue ou saignante", reason: "Risque de toxoplasmose et listériose" },
      { name: "Poisson cru (sushi, sashimi)", reason: "Risque de parasites et bactéries" },
      { name: "Œufs crus ou à la coque", reason: "Risque de salmonellose" },
      { name: "Charcuterie non cuite", reason: "Risque de toxoplasmose et listériose" },
      { name: "Pâtés et rillettes", reason: "Risque de listériose" },
    ],
  },
  {
    id: "limiter-consommation",
    name: "À consommer avec modération",
    icon: AlertTriangle,
    severity: "warning",
    foods: [
      { name: "Café et thé", reason: "Max 200mg de caféine par jour (2 tasses)" },
      { name: "Thon, espadon, requin", reason: "Teneur élevée en mercure, max 1 fois par semaine" },
      { name: "Foie", reason: "Trop riche en vitamine A" },
      { name: "Soja", reason: "Phyto-œstrogènes, limiter à 1 portion par jour" },
      { name: "Édulcorants artificiels", reason: "Privilégier le sucre naturel en petite quantité" },
      { name: "Aliments ultra-transformés", reason: "Pauvres en nutriments, riches en sel et additifs" },
    ],
  },
  {
    id: "boissons",
    name: "Boissons à éviter",
    icon: Wine,
    severity: "danger",
    foods: [
      { name: "Alcool (vin, bière, spiritueux)", reason: "Aucune quantité n'est sûre" },
      { name: "Boissons énergisantes", reason: "Trop de caféine et stimulants" },
      { name: "Sodas", reason: "Sucre excessif et calories vides" },
      { name: "Jus non pasteurisés", reason: "Risque de contamination bactérienne" },
    ],
  },
  {
    id: "poissons-mercure",
    name: "Poissons à haute teneur en mercure",
    icon: Fish,
    severity: "warning",
    foods: [
      { name: "Espadon", reason: "Mercure élevé" },
      { name: "Requin", reason: "Mercure très élevé" },
      { name: "Marlin", reason: "Mercure élevé" },
      { name: "Thon rouge", reason: "Limiter la consommation" },
    ],
  },
  {
    id: "autres",
    name: "Autres précautions",
    icon: Beef,
    severity: "warning",
    foods: [
      { name: "Graines germées crues", reason: "Risque de contamination bactérienne" },
      { name: "Miel pour bébé", reason: "Après naissance uniquement (>12 mois)" },
      { name: "Suppléments sans avis médical", reason: "Certains peuvent être dangereux" },
      { name: "Tisanes non recommandées", reason: "Certaines plantes sont déconseillées" },
    ],
  },
]

export default function AEviterPage() {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "danger":
        return "from-[oklch(0.79_0.13_25)] to-[oklch(0.69_0.13_25)]"
      case "warning":
        return "from-[oklch(0.79_0.13_60)] to-[oklch(0.69_0.13_60)]"
      default:
        return "from-primary to-tertiary"
    }
  }

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
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Aliments à éviter</h1>
          <p className="text-muted-foreground text-pretty">
            Certains aliments présentent des risques pendant la grossesse. Voici ce qu'il faut éviter ou limiter.
          </p>
        </section>

        <Card className="p-4 bg-[oklch(0.91_0.06_25)]/30 border-[oklch(0.79_0.13_25)]/30">
          <div className="flex gap-3">
            <XCircle className="h-6 w-6 text-[oklch(0.79_0.13_25)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">Prévention des infections</p>
              <p className="text-sm text-muted-foreground text-pretty">
                Ces restrictions visent à protéger votre bébé des infections alimentaires (listériose, toxoplasmose,
                salmonellose) qui peuvent être graves pendant la grossesse.
              </p>
            </div>
          </div>
        </Card>

        <Accordion type="single" collapsible className="space-y-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <AccordionItem key={category.id} value={category.id} className="border rounded-xl overflow-hidden">
                <AccordionTrigger className="px-6 hover:no-underline hover:bg-accent/50">
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${getSeverityStyles(category.severity)}`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6">
                  <div className="space-y-3 pt-2">
                    {category.foods.map((food, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                        <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{food.name}</p>
                          <p className="text-sm text-muted-foreground mt-1">{food.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        <Card className="p-4 bg-accent/30">
          <p className="text-sm text-muted-foreground text-pretty">
            <strong className="text-foreground">Important:</strong> En cas de doute sur un aliment, consultez votre
            médecin ou sage-femme. Il vaut mieux être prudent que de prendre des risques.
          </p>
        </Card>
      </main>
    </div>
  )
}
