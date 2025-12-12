"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { ChecklistCategory, type ChecklistItemType } from "@/components/checklist-category"
import { ProgressCard } from "@/components/progress-card"
import { Button } from "@/components/ui/button"
import { FileText, ShieldCheck, Baby, Download, RotateCcw } from "lucide-react"

interface CategoryData {
  id: string
  name: string
  icon: typeof FileText
  items: ChecklistItemType[]
}

const initialData: CategoryData[] = [
  {
    id: "avant-naissance",
    name: "Avant la naissance",
    icon: FileText,
    items: [
      {
        id: "doc-1",
        label: "Déclaration de grossesse",
        description: "À envoyer avant la 14ème semaine",
        completed: true,
      },
      {
        id: "doc-2",
        label: "Reconnaissance anticipée",
        description: "Si parents non mariés",
        completed: true,
      },
      {
        id: "doc-3",
        label: "Inscription à la maternité",
        description: "Confirmation reçue",
        completed: true,
      },
      {
        id: "doc-4",
        label: "Cours de préparation",
        description: "8 séances prises en charge",
        completed: false,
      },
      {
        id: "doc-5",
        label: "Congé maternité",
        description: "Déclaration employeur",
        completed: true,
      },
    ],
  },
  {
    id: "a-la-maternite",
    name: "À apporter à la maternité",
    icon: ShieldCheck,
    items: [
      {
        id: "hosp-1",
        label: "Carte d'identité",
        description: "Les deux parents",
        completed: true,
      },
      {
        id: "hosp-2",
        label: "Carte vitale",
        description: "À jour",
        completed: true,
      },
      {
        id: "hosp-3",
        label: "Carnet de maternité",
        description: "Avec tous les résultats",
        completed: true,
      },
      {
        id: "hosp-4",
        label: "Carte de groupe sanguin",
        description: "Les deux parents",
        completed: false,
      },
      {
        id: "hosp-5",
        label: "Mutuelle",
        description: "Attestation à jour",
        completed: false,
      },
    ],
  },
  {
    id: "apres-naissance",
    name: "Après la naissance",
    icon: Baby,
    items: [
      {
        id: "after-1",
        label: "Déclaration de naissance",
        description: "Dans les 5 jours à la mairie",
        completed: false,
      },
      {
        id: "after-2",
        label: "Livret de famille",
        description: "Demande ou mise à jour",
        completed: false,
      },
      {
        id: "after-3",
        label: "Acte de naissance",
        description: "Copies à demander",
        completed: false,
      },
      {
        id: "after-4",
        label: "Déclaration CAF",
        description: "Pour les allocations",
        completed: false,
      },
      {
        id: "after-5",
        label: "Assurance maladie",
        description: "Rattachement du bébé",
        completed: false,
      },
      {
        id: "after-6",
        label: "Mutuelle",
        description: "Ajout du bébé",
        completed: false,
      },
      {
        id: "after-7",
        label: "Employeur",
        description: "Copie acte de naissance",
        completed: false,
      },
    ],
  },
]

export default function DocumentsPage() {
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
    const completed = categories.flatMap((cat) => cat.items.filter((item) => item.completed))
    const pending = categories.flatMap((cat) => cat.items.filter((item) => !item.completed))

    let text = "DOCUMENTS ADMINISTRATIFS - GROSSESSE\n\n"
    text += `✓ Documents complétés: ${completed.length}\n`
    text += `○ Documents restants: ${pending.length}\n\n`

    categories.forEach((category) => {
      text += `\n${category.name.toUpperCase()}\n`
      category.items.forEach((item) => {
        text += `${item.completed ? "✓" : "○"} ${item.label}\n`
        if (item.description) text += `  ${item.description}\n`
      })
    })

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "documents-administratifs.txt"
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
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Documents administratifs</h1>
          <p className="text-muted-foreground text-pretty">
            Suivez toutes les démarches administratives liées à votre grossesse et la naissance de votre bébé.
          </p>
        </section>

        <ProgressCard
          title="Progression totale"
          progress={progress}
          subtitle={`${completedItems} sur ${totalItems} documents complétés`}
          variant="secondary"
        />

        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline" className="flex-1 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Exporter la liste
          </Button>
          <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
        </div>

        <section className="space-y-4" aria-label="Catégories de documents">
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
