"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Baby, Shirt, Heart, Stethoscope, Download, RotateCcw, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChecklistItemType {
  id: string
  label: string
  description: string
  completed: boolean
}

interface CategoryData {
  id: string
  name: string
  icon: typeof Baby
  color: string
  items: ChecklistItemType[]
}

const initialData: CategoryData[] = [
  {
    id: "bebe",
    name: "Pour bébé",
    icon: Baby,
    color: "from-primary/20 to-primary/10",
    items: [
      { id: "bebe-1", label: "6 bodies manches courtes", description: "Taille naissance", completed: false },
      { id: "bebe-2", label: "6 bodies manches longues", description: "Taille naissance", completed: false },
      { id: "bebe-3", label: "4 pyjamas", description: "En coton doux", completed: true },
      { id: "bebe-4", label: "2 bonnets", description: "Un fin, un chaud", completed: true },
      { id: "bebe-5", label: "2 paires de chaussettes", description: "Anti-dérapantes", completed: false },
      { id: "bebe-6", label: "1 couverture", description: "Pour la sortie", completed: true },
      { id: "bebe-7", label: "Couches nouveau-né", description: "Paquet de 30", completed: false },
      { id: "bebe-8", label: "Lingettes pour bébé", description: "Sans parfum", completed: false },
      { id: "bebe-9", label: "1 tenue de sortie", description: "Selon la saison", completed: false },
    ],
  },
  {
    id: "maman",
    name: "Pour maman",
    icon: Heart,
    color: "from-tertiary/20 to-tertiary/10",
    items: [
      { id: "maman-1", label: "2 chemises de nuit ouvrables", description: "Pour l'allaitement", completed: true },
      { id: "maman-2", label: "Soutiens-gorge d'allaitement", description: "2 pièces", completed: true },
      { id: "maman-3", label: "Coussinets d'allaitement", description: "Jetables ou lavables", completed: false },
      { id: "maman-4", label: "1 robe de chambre", description: "Confortable", completed: true },
      { id: "maman-5", label: "Pantoufles", description: "Antidérapantes", completed: true },
      { id: "maman-6", label: "3 culottes post-partum", description: "Taille haute", completed: false },
      { id: "maman-7", label: "Serviettes hygiéniques maternité", description: "Ultra-absorbantes", completed: false },
      { id: "maman-8", label: "Trousse de toilette", description: "Produits habituels", completed: true },
    ],
  },
  {
    id: "soins",
    name: "Soins et hygiène",
    icon: Stethoscope,
    color: "from-success/20 to-success/10",
    items: [
      { id: "soins-1", label: "Thermomètre", description: "Digital frontal", completed: false },
      { id: "soins-2", label: "Sérum physiologique", description: "Doses individuelles", completed: false },
      { id: "soins-3", label: "Compresses stériles", description: "Pour le cordon", completed: true },
      { id: "soins-4", label: "Crème pour le change", description: "Contre l'érythème", completed: false },
      { id: "soins-5", label: "Gel lavant bébé", description: "Doux et hypoallergénique", completed: true },
    ],
  },
  {
    id: "divers",
    name: "Divers",
    icon: Shirt,
    color: "from-secondary/20 to-secondary/10",
    items: [
      { id: "divers-1", label: "Carte d'identité", description: "Et carte vitale", completed: true },
      { id: "divers-2", label: "Carnet de maternité", description: "Avec tous les documents", completed: true },
      { id: "divers-3", label: "Téléphone et chargeur", description: "Pour rester connectée", completed: true },
      {
        id: "divers-4",
        label: "Appareil photo",
        description: "Pour immortaliser les premiers moments",
        completed: false,
      },
      { id: "divers-5", label: "Siège auto", description: "Obligatoire pour la sortie", completed: false },
    ],
  },
]

export default function TrousseauPage() {
  const [categories, setCategories] = useState<CategoryData[]>(initialData)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["bebe"])

  const handleToggleItem = (itemId: string) => {
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        items: category.items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
      })),
    )
  }

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleReset = () => {
    setCategories(initialData)
  }

  const handleExport = () => {
    const completed = categories.flatMap((cat) => cat.items.filter((item) => item.completed))
    const pending = categories.flatMap((cat) => cat.items.filter((item) => !item.completed))

    let text = "TROUSSEAU DE MATERNITÉ\n\n"
    text += `✓ Articles complétés: ${completed.length}\n`
    text += `○ Articles restants: ${pending.length}\n\n`

    categories.forEach((category) => {
      text += `\n${category.name.toUpperCase()}\n`
      category.items.forEach((item) => {
        text += `${item.completed ? "✓" : "○"} ${item.label}\n`
      })
    })

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "trousseau-maternite.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = categories.reduce((sum, cat) => sum + cat.items.filter((item) => item.completed).length, 0)
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

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
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Trousseau de maternité</h1>
          <p className="text-muted-foreground text-pretty">
            Préparez votre sac pour la maternité en cochant les articles au fur et à mesure.
          </p>
        </section>

        <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-tertiary p-6 text-white shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{progress}%</h2>
              <p className="text-white/80 text-sm">
                {completedItems} sur {totalItems} articles
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Baby className="h-8 w-8" />
            </div>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" className="flex-1 bg-transparent rounded-xl">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent rounded-xl">
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        </div>

        <section className="space-y-3" aria-label="Catégories du trousseau">
          {categories.map((category) => {
            const Icon = category.icon
            const categoryCompleted = category.items.filter((item) => item.completed).length
            const categoryTotal = category.items.length
            const categoryProgress = Math.round((categoryCompleted / categoryTotal) * 100)
            const isExpanded = expandedCategories.includes(category.id)

            return (
              <Card key={category.id} className="overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                  aria-expanded={isExpanded}
                  aria-controls={`category-${category.id}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                        category.color,
                      )}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {categoryCompleted}/{categoryTotal} • {categoryProgress}%
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn("h-5 w-5 text-muted-foreground transition-transform", isExpanded && "rotate-180")}
                  />
                </button>

                {isExpanded && (
                  <div id={`category-${category.id}`} className="px-4 pb-4 space-y-2">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/30 transition-colors"
                      >
                        <Checkbox
                          id={item.id}
                          checked={item.completed}
                          onCheckedChange={() => handleToggleItem(item.id)}
                          className="mt-1"
                          aria-label={`${item.label} - ${item.description}`}
                        />
                        <label htmlFor={item.id} className="flex-1 cursor-pointer">
                          <p className={cn("font-medium text-foreground", item.completed && "line-through opacity-60")}>
                            {item.label}
                          </p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </label>
                        {item.completed && (
                          <Badge className="bg-success/20 text-success border-success/30 mt-1">Fait</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
