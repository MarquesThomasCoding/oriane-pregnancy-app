"use client"

import { useOptimistic, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Baby, Download, FileText, RotateCcw, ShieldCheck } from "lucide-react"

import {
  resetChecklistAction,
  toggleChecklistItemAction,
  type ChecklistPayload,
  type ChecklistSectionPayload,
} from "@/app/actions/checklists"
import { ChecklistCategory } from "@/components/checklist-category"
import { ProgressCard } from "@/components/progress-card"
import { Button } from "@/components/ui/button"

const sectionIcons: Record<string, typeof FileText> = {
  "Avant la naissance": FileText,
  "À apporter à la maternité": ShieldCheck,
  "Après la naissance": Baby,
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

export function DocumentsChecklistClient({ checklist }: { checklist: ChecklistPayload }) {
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
    toggleChecklistItemAction({ checklistId: checklist.id, itemId }).finally(() => router.refresh())
  }

  const handleReset = () => {
    const resetSections = sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({ ...item, completed: false })),
    }))
    startTransition(() => applyOptimistic({ type: "reset", sections: resetSections }))
    resetChecklistAction({ checklistId: checklist.id }).finally(() => router.refresh())
  }

  const handleExport = () => {
    const completed = sections.flatMap((cat) => cat.items.filter((item) => item.completed))
    const pending = sections.flatMap((cat) => cat.items.filter((item) => !item.completed))

    let text = "DOCUMENTS ADMINISTRATIFS - GROSSESSE\n\n"
    text += `✓ Documents complétés: ${completed.length}\n`
    text += `○ Documents restants: ${pending.length}\n\n`

    sections.forEach((category) => {
      text += `\n${category.title.toUpperCase()}\n`
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

  return (
    <>
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
        <Button onClick={handleExport} variant="outline" className="flex-1 bg-transparent" disabled={isPending}>
          <Download className="h-4 w-4 mr-2" />
          Exporter la liste
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent" disabled={isPending}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>
      </div>

      <section className="space-y-4" aria-label="Catégories de documents">
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
