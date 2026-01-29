"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { getCurrentUserId } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import {
    calculateConceptionFromDue,
    calculateDueFromConception,
    calculatePregnancyProgress
} from "@/lib/pregnancy-utils"

// Schéma de validation pour la mise à jour du profil grossesse
const pregnancyProfileSchema = z.object({
    pregnancyStart: z.string().nullable().optional(),
    pregnancyDue: z.string().nullable().optional(),
}).refine(data => data.pregnancyStart || data.pregnancyDue, {
    message: "Vous devez renseigner au moins une date (conception ou terme prévu)"
})

export type PregnancyProfileInput = z.infer<typeof pregnancyProfileSchema>

/**
 * Récupère le profil de grossesse de l'utilisateur
 */
export async function getPregnancyProfile() {
    const userId = await getCurrentUserId()

    if (!userId) {
        return null
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            pregnancyStart: true,
            pregnancyDue: true,
            pregnancyRisk: true,
        },
    })

    if (!user) {
        return null
    }

    const progress = calculatePregnancyProgress(user.pregnancyStart, user.pregnancyDue)

    return {
        pregnancyStart: user.pregnancyStart,
        pregnancyDue: user.pregnancyDue,
        pregnancyRisk: user.pregnancyRisk,
        progress,
    }
}

/**
 * Met à jour le profil de grossesse de l'utilisateur
 */
export async function updatePregnancyProfile(input: PregnancyProfileInput) {
    const userId = await getCurrentUserId()

    if (!userId) {
        throw new Error("Non authentifié")
    }

    const validated = pregnancyProfileSchema.parse(input)

    // Calculer les dates manquantes
    let pregnancyStart: Date | null = null
    let pregnancyDue: Date | null = null

    if (validated.pregnancyStart) {
        pregnancyStart = new Date(validated.pregnancyStart)
        pregnancyDue = validated.pregnancyDue
            ? new Date(validated.pregnancyDue)
            : calculateDueFromConception(pregnancyStart)
    } else if (validated.pregnancyDue) {
        pregnancyDue = new Date(validated.pregnancyDue)
        pregnancyStart = calculateConceptionFromDue(pregnancyDue)
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            pregnancyStart,
            pregnancyDue,
        },
    })

    revalidatePath("/compte")
    revalidatePath("/")

    return getPregnancyProfile()
}

/**
 * Réinitialise les dates de grossesse
 */
export async function resetPregnancyDates() {
    const userId = await getCurrentUserId()

    if (!userId) {
        throw new Error("Non authentifié")
    }

    await prisma.user.update({
        where: { id: userId },
        data: {
            pregnancyStart: null,
            pregnancyDue: null,
        },
    })

    revalidatePath("/compte")
    revalidatePath("/")

    return { success: true }
}
