'use server'

import { prisma } from '@/lib/prisma'
import { loginSchema, registerSchema } from '@/lib/validators/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Helper pour importer bcryptjs de manière compatible
async function getBcrypt() {
  const bcrypt = await import('bcryptjs')
  return bcrypt.default || bcrypt
}

export async function loginAction(formData: FormData) {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    callbackUrl: formData.get('callbackUrl') as string | null,
  }

  const result = loginSchema.safeParse(rawData)
  
  if (!result.success) {
    return {
      error: result.error.errors[0]?.message || 'Données invalides',
    }
  }

  const { email, password } = result.data

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.passwordHash) {
      return {
        error: 'Email ou mot de passe incorrect',
      }
    }

    const bcrypt = await getBcrypt()
    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (!isValid) {
      return {
        error: 'Email ou mot de passe incorrect',
      }
    }

    // Créer la session
    const cookieStore = await cookies()
    cookieStore.set('user-id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    })

    redirect(rawData.callbackUrl || '/')
  } catch (error) {
    // Next.js redirect() lance une exception spéciale, on ne doit pas la capturer
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error // Relancer la redirection
    }
    
    console.error('Login error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
    return {
      error: errorMessage.includes('bcrypt') 
        ? 'Erreur de hachage du mot de passe' 
        : 'Une erreur est survenue lors de la connexion',
    }
  }
}

export async function registerAction(formData: FormData) {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    firstName: formData.get('firstName') as string | null,
    lastName: formData.get('lastName') as string | null,
  }

  const result = registerSchema.safeParse(rawData)
  
  if (!result.success) {
    return {
      error: result.error.errors[0]?.message || 'Données invalides',
    }
  }

  const { email, password, firstName, lastName } = result.data

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        error: 'Cet email est déjà utilisé',
      }
    }

    // Hasher le mot de passe
    const bcrypt = await getBcrypt()
    const passwordHash = await bcrypt.hash(password, 10)

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName: firstName || null,
        lastName: lastName || null,
      },
    })

    // Créer la session
    const cookieStore = await cookies()
    cookieStore.set('user-id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    })

    redirect('/')
  } catch (error) {
    // Next.js redirect() lance une exception spéciale, on ne doit pas la capturer
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT')) {
      throw error // Relancer la redirection
    }
    
    console.error('Register error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
    return {
      error: errorMessage.includes('bcrypt') 
        ? 'Erreur de hachage du mot de passe' 
        : 'Une erreur est survenue lors de l\'inscription',
    }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('user-id')
  redirect('/login')
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user-id')?.value

  if (!userId) {
    return null
  }

  try {
    const user = await prisma.user.findUnique({
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

    return user
  } catch (error) {
    return null
  }
}

