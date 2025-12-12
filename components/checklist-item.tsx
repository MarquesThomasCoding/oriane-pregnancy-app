"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface ChecklistItemProps {
  id: string
  label: string
  description?: string
  completed: boolean
  onToggle: (id: string) => void
  className?: string
}

export function ChecklistItem({ id, label, description, completed, onToggle, className }: ChecklistItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors group min-h-[44px]",
        completed && "opacity-70",
        className,
      )}
    >
      <Checkbox
        id={id}
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className="mt-0.5 h-5 w-5"
        aria-label={label}
      />
      <label htmlFor={id} className="flex-1 cursor-pointer">
        <div className={cn("text-sm font-medium text-foreground transition-all", completed && "line-through")}>
          {label}
        </div>
        {description && <div className="text-xs text-muted-foreground mt-1 text-pretty">{description}</div>}
      </label>
    </div>
  )
}
