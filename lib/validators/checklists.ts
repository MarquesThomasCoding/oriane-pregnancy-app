import { z } from "zod"

export const checklistTypeSchema = z.enum(["trousseau", "documents", "projet-naissance"])

export const toggleChecklistItemSchema = z.object({
  checklistId: z.string().cuid().or(z.string().min(1)),
  itemId: z.string().cuid().or(z.string().min(1)),
})

export const resetChecklistSchema = z.object({
  checklistId: z.string().cuid().or(z.string().min(1)),
})

export type ChecklistTypeInput = z.infer<typeof checklistTypeSchema>
export type ToggleChecklistItemInput = z.infer<typeof toggleChecklistItemSchema>
export type ResetChecklistInput = z.infer<typeof resetChecklistSchema>
