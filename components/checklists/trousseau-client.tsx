"use client"

import { useOptimistic, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Baby, ChevronDown, Download, Heart, RotateCcw, Shirt, Stethoscope } from "lucide-react"

import {
  resetChecklistAction,
  toggleChecklistItemAction,
  type ChecklistPayload,
  type ChecklistSectionPayload,
} from "@/app/actions/checklists"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const sectionMeta: Record<
  string,
  {
    icon: typeof Baby
    color: string
  }
> = {
  "Pour bébé": { icon: Baby, color: "from-primary/20 to-primary/10" },
  "Pour maman": { icon: Heart, color: "from-tertiary/20 to-tertiary/10" },
  "Soins et hygiène": { icon: Stethoscope, color: "from-success/20 to-success/10" },
  Divers: { icon: Shirt, color: "from-secondary/20 to-secondary/10" },
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

export function TrousseauChecklistClient({ checklist }: { checklist: ChecklistPayload }) {
  const router = useRouter()
  const [expandedCategories, setExpandedCategories] = useState<string[]>([checklist.sections[0]?.id ?? ""])
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

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

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

    let text = "TROUSSEAU DE MATERNITÉ\n\n"
    text += `✓ Articles complétés: ${completed.length}\n`
    text += `○ Articles restants: ${pending.length}\n\n`

    sections.forEach((category) => {
      text += `\n${category.title.toUpperCase()}\n`
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

  return (
    <>
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
        <Button onClick={handleExport} variant="outline" className="flex-1 bg-transparent rounded-xl" disabled={isPending}>
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent rounded-xl" disabled={isPending}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Réinitialiser
        </Button>
      </div>

      <section className="space-y-3" aria-label="Catégories du trousseau">
        {sections.map((category) => {
          const meta = sectionMeta[category.title] ?? { icon: Baby, color: "from-primary/20 to-primary/10" }
          const Icon = meta.icon
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
                  <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center", meta.color)}>
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground">{category.title}</h3>
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
                        aria-label={`${item.label} - ${item.description ?? ""}`}
                        disabled={isPending}
                      />
                      <label htmlFor={item.id} className="flex-1 cursor-pointer">
                        <p className={cn("font-medium text-foreground", item.completed && "line-through opacity-60")}>
                          {item.label}
                        </p>
                        {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
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
    </>
  )
}
