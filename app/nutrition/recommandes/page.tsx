"use client"

import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"
import { Apple, Milk, Fish, Egg, Carrot, Droplet, CheckCircle2 } from "lucide-react"

const categories = [
  {
    id: "fruits",
    name: "Fruits et légumes",
    icon: Apple,
    description: "5 portions par jour minimum",
    color: "from-success/20 to-success/10",
    iconBg: "bg-success/20",
    iconColor: "text-success",
    foods: [
      { name: "Pommes", benefit: "Riches en fibres et vitamines C" },
      { name: "Bananes", benefit: "Source de potassium et énergie" },
      { name: "Oranges", benefit: "Vitamine C pour l'absorption du fer" },
      { name: "Épinards", benefit: "Acide folique essentiel" },
      { name: "Brocolis", benefit: "Calcium et vitamines" },
      { name: "Carottes", benefit: "Bêta-carotène pour la vision" },
    ],
  },
  {
    id: "laitiers",
    name: "Produits laitiers",
    icon: Milk,
    description: "3-4 portions par jour",
    color: "from-primary/20 to-primary/10",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    foods: [
      { name: "Lait pasteurisé", benefit: "Calcium pour les os de bébé" },
      { name: "Yaourts", benefit: "Probiotiques et calcium" },
      { name: "Fromages à pâte dure", benefit: "Protéines et calcium (pasteurisés uniquement)" },
      { name: "Fromage blanc", benefit: "Protéines et peu de matières grasses" },
    ],
  },
  {
    id: "proteines",
    name: "Protéines",
    icon: Egg,
    description: "2 portions par jour",
    color: "from-tertiary/20 to-tertiary/10",
    iconBg: "bg-tertiary/20",
    iconColor: "text-tertiary",
    foods: [
      { name: "Œufs bien cuits", benefit: "Protéines complètes et choline" },
      { name: "Poulet", benefit: "Protéines maigres" },
      { name: "Légumineuses", benefit: "Protéines végétales et fibres" },
      { name: "Tofu", benefit: "Alternative protéinée végétale" },
    ],
  },
  {
    id: "poissons",
    name: "Poissons",
    icon: Fish,
    description: "2 fois par semaine",
    color: "from-secondary/20 to-secondary/10",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    foods: [
      { name: "Saumon", benefit: "Oméga-3 pour le développement cérébral" },
      { name: "Sardines", benefit: "Calcium et oméga-3" },
      { name: "Maquereau", benefit: "Vitamine D et oméga-3" },
      { name: "Cabillaud", benefit: "Protéines maigres" },
    ],
  },
  {
    id: "cereales",
    name: "Céréales complètes",
    icon: Carrot,
    description: "À chaque repas",
    color: "from-warning/20 to-warning/10",
    iconBg: "bg-warning/20",
    iconColor: "text-warning",
    foods: [
      { name: "Pain complet", benefit: "Fibres et énergie durable" },
      { name: "Riz complet", benefit: "Glucides complexes" },
      { name: "Pâtes complètes", benefit: "Énergie et vitamines B" },
      { name: "Flocons d'avoine", benefit: "Fibres solubles" },
    ],
  },
  {
    id: "hydratation",
    name: "Hydratation",
    icon: Droplet,
    description: "1.5 à 2 litres par jour",
    color: "from-blue-500/20 to-blue-500/10",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-600",
    foods: [
      { name: "Eau", benefit: "Essentielle pour le volume sanguin" },
      { name: "Tisanes sans caféine", benefit: "Hydratation variée" },
      { name: "Lait", benefit: "Hydratation + calcium" },
      { name: "Jus de fruits 100%", benefit: "Vitamines (avec modération)" },
    ],
  },
]

export default function RecommandesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-tertiary/20 pb-20 md:pb-8">
      <Header />

      <main className="container px-4 py-6 space-y-6 max-w-6xl mx-auto">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Aller au contenu principal
        </a>

        <section id="main-content">
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Aliments recommandés</h1>
          <p className="text-muted-foreground text-pretty">
            Une alimentation équilibrée est essentielle pour votre santé et celle de votre bébé.
          </p>
        </section>

        <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <div className="flex gap-3">
            <Apple className="h-6 w-6 text-success shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">Alimentation variée et équilibrée</p>
              <p className="text-sm text-muted-foreground text-pretty">
                Privilégiez les aliments frais et variés pour couvrir tous vos besoins nutritionnels et ceux de votre
                bébé.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <section key={category.id} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl ${category.iconBg} flex items-center justify-center`}>
                    <Icon className={`h-6 w-6 ${category.iconColor}`} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{category.name}</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {category.foods.map((food, index) => (
                    <Card
                      key={index}
                      className={`p-4 hover-lift bg-gradient-to-br ${category.color} border border-border/50`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-1">{food.name}</h3>
                          <p className="text-sm text-muted-foreground">{food.benefit}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        <Card className="p-4 bg-accent/30">
          <p className="text-sm text-muted-foreground text-pretty">
            <strong className="text-foreground">Astuce:</strong> Lavez soigneusement tous les fruits et légumes avant
            consommation pour éliminer les bactéries et résidus de pesticides.
          </p>
        </Card>
      </main>

      <MobileNav />
    </div>
  )
}
