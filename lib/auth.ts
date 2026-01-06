import { cookies } from 'next/headers'
import { prisma } from './prisma'

export async function getCurrentUserId() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user-id')?.value

  if (!userId) {
    return null
  }

  // Vérifier que l'utilisateur existe toujours
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  })

  return user?.id || null
}

export async function getCurrentUser() {
  const userId = await getCurrentUserId()
  
  if (!userId) {
    return null
  }

  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      pregnancyStart: true,
      pregnancyDue: true,
    },
  })
}
