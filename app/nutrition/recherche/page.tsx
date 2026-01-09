"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import Image from "next/image"

interface Food {
  name: string
  category: string
  status: "safe" | "caution" | "avoid"
  info: string
}

const foodDatabase: Food[] = [
  { name: "Pomme", category: "Fruits", status: "safe", info: "Riche en fibres et vitamines" },
  { name: "Banane", category: "Fruits", status: "safe", info: "Excellente source de potassium" },
  { name: "Fromage pasteurisé", category: "Produits laitiers", status: "safe", info: "Source de calcium" },
  { name: "Fromage au lait cru", category: "Produits laitiers", status: "avoid", info: "Risque de listériose" },
  { name: "Saumon cuit", category: "Poissons", status: "safe", info: "Riche en oméga-3" },
  { name: "Sushi", category: "Poissons", status: "avoid", info: "Poisson cru à éviter" },
  { name: "Thon", category: "Poissons", status: "caution", info: "Limiter la consommation (mercure)" },
  { name: "Œufs bien cuits", category: "Protéines", status: "safe", info: "Excellente source de protéines" },
  { name: "Œufs crus", category: "Protéines", status: "avoid", info: "Risque de salmonellose" },
  { name: "Épinards", category: "Légumes", status: "safe", info: "Riche en fer et acide folique" },
  { name: "Café", category: "Boissons", status: "caution", info: "Max 200mg de caféine par jour" },
  { name: "Alcool", category: "Boissons", status: "avoid", info: "Strictement interdit pendant la grossesse" },
  { name: "Lait pasteurisé", category: "Produits laitiers", status: "safe", info: "Excellente source de calcium" },
  { name: "Yaourt", category: "Produits laitiers", status: "safe", info: "Probiotiques et calcium" },
  { name: "Brie", category: "Fromages", status: "avoid", info: "Fromage à pâte molle à éviter" },
  { name: "Camembert", category: "Fromages", status: "avoid", info: "Risque de listériose" },
]

export default function RecherchePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    if (value.length >= 2) {
      const results = foodDatabase.filter((food) => food.name.toLowerCase().includes(value.toLowerCase()))
      setFilteredFoods(results)
    } else {
      setFilteredFoods([])
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-success" />
      case "caution":
        return <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-warning" />
      case "avoid":
        return <XCircle className="h-5 w-5 md:h-6 md:w-6 text-error" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return (
          <Badge className="bg-success/20 text-success border-success/30 text-[10px] md:text-xs" variant="outline">
            Sûr
          </Badge>
        )
      case "caution":
        return (
          <Badge className="bg-warning/20 text-warning border-warning/30 text-[10px] md:text-xs" variant="outline">
            Modération
          </Badge>
        )
      case "avoid":
        return (
          <Badge className="bg-error/20 text-error border-error/30 text-[10px] md:text-xs" variant="outline">
            À éviter
          </Badge>
        )
      default:
        return null
    }
  }

  const recentSearches = ["Saumon", "Fromage", "Café", "Sushi"]

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

        <section id="main-content" className="relative">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">
                Recherche alimentaire
              </h1>
              <p className="text-sm md:text-base text-muted-foreground text-pretty">
                Vérifiez si un aliment est sûr pendant votre grossesse.
              </p>
            </div>
            <div className="flex-shrink-0 hidden sm:block">
              <Image
                src="/images/mascotte-nutrition.png"
                alt="Mascotte nutrition avec lait et fromage"
                width={100}
                height={100}
                className="drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Mobile mascot - smaller and positioned differently */}
          <div className="sm:hidden flex justify-center mb-4">
            <Image
              src="/images/mascotte-nutrition.png"
              alt="Mascotte nutrition avec lait et fromage"
              width={80}
              height={80}
              className="drop-shadow-xl"
              priority
            />
          </div>
        </section>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un aliment..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full h-12 md:h-14 pl-10 md:pl-12 pr-4 rounded-xl md:rounded-2xl border-2 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm md:text-base transition-all"
            aria-label="Rechercher un aliment"
          />
        </div>

        {filteredFoods.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base md:text-lg font-semibold">Résultats de recherche</h2>
            {filteredFoods.map((food, index) => (
              <Card key={index} className="p-3 md:p-4 hover-lift">
                <div className="flex items-start gap-2 md:gap-3">
                  <div className="flex-shrink-0 mt-0.5">{getStatusIcon(food.status)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-sm md:text-base">{food.name}</h3>
                      {getStatusBadge(food.status)}
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">{food.category}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{food.info}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {searchTerm.length > 0 && filteredFoods.length === 0 && (
          <Card className="p-6 md:p-8 text-center">
            <p className="text-sm md:text-base text-muted-foreground">Aucun résultat trouvé pour "{searchTerm}"</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-2">Essayez une autre recherche</p>
          </Card>
        )}

        {searchTerm.length === 0 && (
          <>
            <div>
              <h2 className="text-base md:text-lg font-semibold mb-3">Recherches récentes</h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSearch(term)}
                    className="rounded-full text-xs md:text-sm"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
              <Button
                variant="outline"
                className="h-auto py-4 md:py-5 flex-col gap-2 bg-card hover:bg-accent/50 rounded-xl md:rounded-2xl border-2"
                asChild
              >
                <a href="/nutrition/recommandes">
                  <CheckCircle2 className="h-7 w-7 md:h-8 md:w-8 text-success" />
                  <span className="text-xs md:text-sm font-semibold">Aliments recommandés</span>
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 md:py-5 flex-col gap-2 bg-card hover:bg-accent/50 rounded-xl md:rounded-2xl border-2"
                asChild
              >
                <a href="/nutrition/a-eviter">
                  <XCircle className="h-7 w-7 md:h-8 md:w-8 text-error" />
                  <span className="text-xs md:text-sm font-semibold">À éviter</span>
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 md:py-5 flex-col gap-2 bg-card hover:bg-accent/50 rounded-xl md:rounded-2xl border-2"
                asChild
              >
                <a href="/nutrition/conseils">
                  <AlertCircle className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                  <span className="text-xs md:text-sm font-semibold">Conseils</span>
                </a>
              </Button>
            </div>

            <Card className="p-4 md:p-5 bg-accent/30 border-2 border-primary/20">
              <p className="text-xs md:text-sm text-muted-foreground text-pretty">
                <strong className="text-foreground">Important:</strong> Ces informations sont générales. Consultez
                toujours votre médecin ou sage-femme pour des conseils personnalisés.
              </p>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}
