"use server"

import { getCurrentUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const userProfileSchema = z.object({
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").optional().or(z.literal("")),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères").optional().or(z.literal("")),
    emergencyContactName: z.string().optional().or(z.literal("")),
    emergencyContactPhone: z.string().optional().or(z.literal("")),
})

export type UserProfileInput = z.infer<typeof userProfileSchema>

export async function updateUserProfileAction(data: UserProfileInput) {
    const user = await getCurrentUser()

    if (!user) {
        throw new Error("Utilisateur non connecté")
    }

    const validatedData = userProfileSchema.parse(data)

    await prisma.user.update({
        where: { id: user.id },
        data: {
            firstName: validatedData.firstName || null,
            lastName: validatedData.lastName || null,
            emergencyContactName: validatedData.emergencyContactName || null,
            emergencyContactPhone: validatedData.emergencyContactPhone || null,
        },
    })

    revalidatePath("/compte")
    return { success: true }
}
