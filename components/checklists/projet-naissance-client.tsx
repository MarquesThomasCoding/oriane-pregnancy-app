"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Baby, Briefcase, Download, Heart, Home, RotateCcw, Users } from "lucide-react"

import {
  resetChecklistAction,
  toggleChecklistItemAction,
  type ChecklistPayload,
  type ChecklistSectionPayload,
} from "@/app/actions/checklists"
import { ChecklistCategory } from "@/components/checklist-category"
import { ProgressCard } from "@/components/progress-card"
import { Button } from "@/components/ui/button"

const sectionIcons: Record<string, typeof Heart> = {
  "Déroulement de l'accouchement": Heart,
  Accompagnement: Users,
  "Soins du bébé": Briefcase,
  "Post-partum": Home,
}

type OptimisticAction =
  | { type: "toggle"; itemId: string }
  | { type: "reset"; sections: ChecklistSectionPayload[] }

function computeProgress(sections: ChecklistSectionPayload[]) {
  const totalItems = sections.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = sections.reduce((sum, cat) => sum + cat.items.filter((item) => item.completed).length, 0)
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0
  return { totalItems, completedItems, progress }
}

export function ProjetNaissanceChecklistClient({ checklist }: { checklist: ChecklistPayload }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [sections, applyOptimistic] = useOptimistic(checklist.sections, (state, action: OptimisticAction) => {
    if (action.type === "reset") return action.sections
    return state.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.id === action.itemId ? { ...item, completed: !item.completed } : item,
      ),
    }))
  })

  const { totalItems, completedItems, progress } = computeProgress(sections)

  const handleToggleItem = (itemId: string) => {
    startTransition(() => applyOptimistic({ type: "toggle", itemId }))
    toggleChecklistItemAction({ checklistId: checklist.id, itemId })
  }

  const handleReset = () => {
    const resetSections = sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({ ...item, completed: false })),
    }))
    startTransition(() => applyOptimistic({ type: "reset", sections: resetSections }))
    resetChecklistAction({ checklistId: checklist.id })
  }

  const handleExport = () => {
    let text = "PROJET DE NAISSANCE\n\n"
    text += "Ce document exprime mes souhaits pour l'accouchement et les soins de mon bébé.\n"
    text += "Il s'agit de préférences qui pourront être adaptées selon la situation médicale.\n\n"

    sections.forEach((category) => {
      text += `\n${category.title.toUpperCase()}\n`
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

  return (
    <>
      <section id="main-content">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">Projet de naissance</h1>
        <p className="text-muted-foreground text-pretty">
          Exprimez vos souhaits pour l'accouchement et les premiers moments avec votre bébé. Ce document peut être
          partagé avec l'équipe médicale.
        </p>
      </section>

      <div className="rounded-xl bg-accent/50 border p-4">
        <p className="text-sm text-muted-foreground text-pretty">
          <strong>Note:</strong> Le projet de naissance est un outil de communication avec l'équipe médicale. Il exprime
          vos préférences, mais reste flexible selon l'évolution de l'accouchement et les nécessités médicales.
        </p>
      </div>

      <ProgressCard
        title="Souhaits définis"
        progress={progress}
        subtitle={`${completedItems} sur ${totalItems} préférences sélectionnées`}
        variant="success"
      />

      <div className="flex gap-2">
        <Button onClick={handleExport} variant="outline" className="flex-1 bg-transparent" disabled={isPending}>
          <Download className="h-4 w-4 mr-2" />
          Exporter le projet
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent" disabled={isPending}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>
      </div>

      <section className="space-y-4" aria-label="Catégories du projet de naissance">
        {sections.map((category, index) => (
          <ChecklistCategory
            key={category.id}
            id={category.id}
            name={category.title}
            icon={sectionIcons[category.title]}
            items={category.items.map((item) => ({
              id: item.id,
              label: item.label,
              description: item.description ?? undefined,
              completed: item.completed,
            }))}
            onToggleItem={handleToggleItem}
            defaultOpen={index === 0}
          />
        ))}
      </section>
    </>
  )
}
