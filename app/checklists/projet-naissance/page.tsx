"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { ChecklistCategory, type ChecklistItemType } from "@/components/checklist-category"
import { ProgressCard } from "@/components/progress-card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Briefcase, Home, Download, RotateCcw } from "lucide-react"

interface CategoryData {
  id: string
  name: string
  icon: typeof Heart
  items: ChecklistItemType[]
}

const initialData: CategoryData[] = [
  {
    id: "accouchement",
    name: "Déroulement de l'accouchement",
    icon: Heart,
    items: [
      {
        id: "acc-1",
        label: "Péridurale souhaitée",
        description: "Analgésie péridurale",
        completed: false,
      },
      {
        id: "acc-2",
        label: "Position d'accouchement",
        description: "Définir vos préférences",
        completed: false,
      },
      {
        id: "acc-3",
        label: "Musique pendant le travail",
        description: "Préparer une playlist",
        completed: false,
      },
      {
        id: "acc-4",
        label: "Éclairage tamisé",
        description: "Ambiance apaisante",
        completed: false,
      },
      {
        id: "acc-5",
        label: "Liberté de mouvement",
        description: "Bouger pendant le travail",
        completed: false,
      },
      {
        id: "acc-6",
        label: "Peau à peau immédiat",
        description: "Dès la naissance",
        completed: false,
      },
    ],
  },
  {
    id: "accompagnement",
    name: "Accompagnement",
    icon: Users,
    items: [
      {
        id: "comp-1",
        label: "Présence du partenaire",
        description: "Pendant tout le travail",
        completed: false,
      },
      {
        id: "comp-2",
        label: "Doula ou accompagnante",
        description: "Soutien supplémentaire",
        completed: false,
      },
      {
        id: "comp-3",
        label: "Photos/vidéos autorisées",
        description: "Immortaliser les moments",
        completed: false,
      },
      {
        id: "comp-4",
        label: "Présence lors des soins",
        description: "Premier examen du bébé",
        completed: false,
      },
    ],
  },
  {
    id: "soins-bebe",
    name: "Soins du bébé",
    icon: Briefcase,
    items: [
      {
        id: "soin-1",
        label: "Allaitement maternel",
        description: "Mise au sein précoce",
        completed: false,
      },
      {
        id: "soin-2",
        label: "Vitamine K",
        description: "Administration systématique",
        completed: false,
      },
      {
        id: "soin-3",
        label: "Collyre oculaire",
        description: "Prévention infections",
        completed: false,
      },
      {
        id: "soin-4",
        label: "Don du cordon",
        description: "Conservation cellules souches",
        completed: false,
      },
      {
        id: "soin-5",
        label: "Bain de bébé",
        description: "Préférence pour le timing",
        completed: false,
      },
    ],
  },
  {
    id: "post-partum",
    name: "Post-partum",
    icon: Home,
    items: [
      {
        id: "post-1",
        label: "Cohabitation",
        description: "Bébé dans la chambre",
        completed: false,
      },
      {
        id: "post-2",
        label: "Durée de séjour",
        description: "Sortie précoce ou standard",
        completed: false,
      },
      {
        id: "post-3",
        label: "Visites limitées",
        description: "Intimité familiale",
        completed: false,
      },
      {
        id: "post-4",
        label: "Suivi sage-femme",
        description: "À domicile après sortie",
        completed: false,
      },
    ],
  },
]

export default function ProjetNaissancePage() {
  const [categories, setCategories] = useState<CategoryData[]>(initialData)

  const handleToggleItem = (itemId: string) => {
    setCategories((prev) =>
      prev.map((category) => ({
        ...category,
        items: category.items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
      })),
    )
  }

  const handleReset = () => {
    setCategories(initialData)
  }

  const handleExport = () => {
    let text = "PROJET DE NAISSANCE\n\n"
    text += "Ce document exprime mes souhaits pour l'accouchement et les soins de mon bébé.\n"
    text += "Il s'agit de préférences qui pourront être adaptées selon la situation médicale.\n\n"

    categories.forEach((category) => {
      text += `\n${category.name.toUpperCase()}\n`
      const selectedItems = category.items.filter((item) => item.completed)
      if (selectedItems.length > 0) {
        selectedItems.forEach((item) => {
          text += `• ${item.label}\n`
          if (item.description) text += `  ${item.description}\n`
        })
      } else {
        text += "Aucune préférence spécifique pour cette catégorie.\n"
      }
    })

    text += "\n\nDate: " + new Date().toLocaleDateString("fr-FR")
    text += "\nSignature: __________________\n"

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "projet-de-naissance.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = categories.reduce((sum, cat) => sum + cat.items.filter((item) => item.completed).length, 0)
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

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
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Projet de naissance</h1>
          <p className="text-muted-foreground text-pretty">
            Exprimez vos souhaits pour l'accouchement et les premiers moments avec votre bébé. Ce document peut être
            partagé avec l'équipe médicale.
          </p>
        </section>

        <div className="rounded-xl bg-accent/50 border p-4">
          <p className="text-sm text-muted-foreground text-pretty">
            <strong>Note:</strong> Le projet de naissance est un outil de communication avec l'équipe médicale. Il
            exprime vos préférences, mais reste flexible selon l'évolution de l'accouchement et les nécessités
            médicales.
          </p>
        </div>

        <ProgressCard
          title="Souhaits définis"
          progress={progress}
          subtitle={`${completedItems} sur ${totalItems} préférences sélectionnées`}
          variant="success"
        />

        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" className="flex-1 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Exporter le projet
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        </div>

        <section className="space-y-4" aria-label="Catégories du projet de naissance">
          {categories.map((category, index) => (
            <ChecklistCategory
              key={category.id}
              id={category.id}
              name={category.name}
              icon={category.icon}
              items={category.items}
              onToggleItem={handleToggleItem}
              defaultOpen={index === 0}
            />
          ))}
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
