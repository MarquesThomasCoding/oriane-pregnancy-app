"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChecklistItem } from "@/components/checklist-item"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { LucideIcon } from "lucide-react"

export interface ChecklistItemType {
  id: string
  label: string
  description?: string
  completed: boolean
}

interface ChecklistCategoryProps {
  id: string
  name: string
  icon?: LucideIcon
  items: ChecklistItemType[]
  onToggleItem: (itemId: string) => void
  defaultOpen?: boolean
}

export function ChecklistCategory({
  id,
  name,
  icon: Icon,
  items,
  onToggleItem,
  defaultOpen = false,
}: ChecklistCategoryProps) {
  const completedCount = items.filter((item) => item.completed).length
  const totalCount = items.length
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? id : undefined}>
      <AccordionItem value={id} className="border rounded-xl overflow-hidden">
        <AccordionTrigger className="px-6 hover:no-underline hover:bg-accent/50">
          <div className="flex items-center gap-3 w-full">
            {Icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-tertiary">
                <Icon className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">{name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {completedCount}/{totalCount}
                </Badge>
              </div>
              <Progress value={progress} className="h-1.5 w-full" />
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6">
          <div className="space-y-2 pt-2">
            {items.map((item) => (
              <ChecklistItem
                key={item.id}
                id={item.id}
                label={item.label}
                description={item.description}
                completed={item.completed}
                onToggle={onToggleItem}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
