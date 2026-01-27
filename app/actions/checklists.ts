"use server"

import { ChecklistType, Role, type ChecklistSection, type ChecklistItem } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { prisma } from "@/lib/prisma"
import { getCurrentUserId } from "@/lib/auth"
import {
  checklistTypeSchema,
  resetChecklistSchema,
  toggleChecklistItemSchema,
  type ChecklistTypeInput,
  type ResetChecklistInput,
  type ToggleChecklistItemInput,
} from "@/lib/validators/checklists"

export type ChecklistItemPayload = {
  id: string
  label: string
  description?: string | null
  completed: boolean
  custom: boolean
}

export type ChecklistSectionPayload = {
  id: string
  title: string
  items: ChecklistItemPayload[]
}

export type ChecklistPayload = {
  id: string
  type: ChecklistTypeInput
  progress: number
  sections: ChecklistSectionPayload[]
}

type DefaultChecklist = {
  title: string
  items: Array<{ label: string; description?: string; completed?: boolean }>
}

const defaultChecklists: Record<ChecklistTypeInput, DefaultChecklist[]> = {
  trousseau: [
    {
      title: "Pour bébé",
      items: [
        { label: "6 bodies manches courtes", description: "Taille naissance" },
        { label: "6 bodies manches longues", description: "Taille naissance" },
        { label: "4 pyjamas", description: "En coton doux", completed: true },
        { label: "2 bonnets", description: "Un fin, un chaud", completed: true },
        { label: "2 paires de chaussettes", description: "Anti-dérapantes" },
        { label: "1 couverture", description: "Pour la sortie", completed: true },
        { label: "Couches nouveau-né", description: "Paquet de 30" },
        { label: "Lingettes pour bébé", description: "Sans parfum" },
        { label: "1 tenue de sortie", description: "Selon la saison" },
      ],
    },
    {
      title: "Pour maman",
      items: [
        { label: "2 chemises de nuit ouvrables", description: "Pour l'allaitement", completed: true },
        { label: "Soutiens-gorge d'allaitement", description: "2 pièces", completed: true },
        { label: "Coussinets d'allaitement", description: "Jetables ou lavables" },
        { label: "1 robe de chambre", description: "Confortable", completed: true },
        { label: "Pantoufles", description: "Antidérapantes", completed: true },
        { label: "3 culottes post-partum", description: "Taille haute" },
        { label: "Serviettes hygiéniques maternité", description: "Ultra-absorbantes" },
        { label: "Trousse de toilette", description: "Produits habituels", completed: true },
      ],
    },
    {
      title: "Soins et hygiène",
      items: [
        { label: "Thermomètre", description: "Digital frontal" },
        { label: "Sérum physiologique", description: "Doses individuelles" },
        { label: "Compresses stériles", description: "Pour le cordon", completed: true },
        { label: "Crème pour le change", description: "Contre l'érythème" },
        { label: "Gel lavant bébé", description: "Doux et hypoallergénique", completed: true },
      ],
    },
    {
      title: "Divers",
      items: [
        { label: "Carte d'identité", description: "Et carte vitale", completed: true },
        { label: "Carnet de maternité", description: "Avec tous les documents", completed: true },
        { label: "Téléphone et chargeur", description: "Pour rester connectée", completed: true },
        { label: "Appareil photo", description: "Pour immortaliser les premiers moments" },
        { label: "Siège auto", description: "Obligatoire pour la sortie" },
      ],
    },
  ],
  documents: [
    {
      title: "Avant la naissance",
      items: [
        { label: "Déclaration de grossesse", description: "À envoyer avant la 14ème semaine", completed: true },
        { label: "Reconnaissance anticipée", description: "Si parents non mariés", completed: true },
        { label: "Inscription à la maternité", description: "Confirmation reçue", completed: true },
        { label: "Cours de préparation", description: "8 séances prises en charge" },
        { label: "Congé maternité", description: "Déclaration employeur", completed: true },
      ],
    },
    {
      title: "À apporter à la maternité",
      items: [
        { label: "Carte d'identité", description: "Les deux parents", completed: true },
        { label: "Carte vitale", description: "À jour", completed: true },
        { label: "Carnet de maternité", description: "Avec tous les résultats", completed: true },
        { label: "Carte de groupe sanguin", description: "Les deux parents" },
        { label: "Mutuelle", description: "Attestation à jour" },
      ],
    },
    {
      title: "Après la naissance",
      items: [
        { label: "Déclaration de naissance", description: "Dans les 5 jours à la mairie" },
        { label: "Livret de famille", description: "Demande ou mise à jour" },
        { label: "Acte de naissance", description: "Copies à demander" },
        { label: "Déclaration CAF", description: "Pour les allocations" },
        { label: "Assurance maladie", description: "Rattachement du bébé" },
        { label: "Mutuelle", description: "Ajout du bébé" },
        { label: "Employeur", description: "Copie acte de naissance" },
      ],
    },
  ],
  "projet-naissance": [
    {
      title: "Déroulement de l'accouchement",
      items: [
        { label: "Péridurale souhaitée", description: "Analgésie péridurale" },
        { label: "Position d'accouchement", description: "Définir vos préférences" },
        { label: "Musique pendant le travail", description: "Préparer une playlist" },
        { label: "Éclairage tamisé", description: "Ambiance apaisante" },
        { label: "Liberté de mouvement", description: "Bouger pendant le travail" },
        { label: "Peau à peau immédiat", description: "Dès la naissance" },
      ],
    },
    {
      title: "Accompagnement",
      items: [
        { label: "Présence du partenaire", description: "Pendant tout le travail" },
        { label: "Doula ou accompagnante", description: "Soutien supplémentaire" },
        { label: "Photos/vidéos autorisées", description: "Immortaliser les moments" },
        { label: "Présence lors des soins", description: "Premier examen du bébé" },
      ],
    },
    {
      title: "Soins du bébé",
      items: [
        { label: "Allaitement maternel", description: "Mise au sein précoce" },
        { label: "Vitamine K", description: "Administration systématique" },
        { label: "Collyre oculaire", description: "Prévention infections" },
        { label: "Don du cordon", description: "Conservation cellules souches" },
        { label: "Bain de bébé", description: "Préférence pour le timing" },
      ],
    },
    {
      title: "Post-partum",
      items: [
        { label: "Cohabitation", description: "Bébé dans la chambre" },
        { label: "Durée de séjour", description: "Sortie précoce ou standard" },
        { label: "Visites limitées", description: "Intimité familiale" },
        { label: "Suivi sage-femme", description: "À domicile après sortie" },
      ],
    },
  ],
}

function toChecklistEnum(type: ChecklistTypeInput): ChecklistType {
  switch (type) {
    case "trousseau":
      return ChecklistType.TROUSSEAU
    case "documents":
      return ChecklistType.DOCUMENTS
    case "projet-naissance":
      return ChecklistType.PROJET_NAISSANCE
    default:
      throw new Error("Checklist type non supporté")
  }
}

function toSlugFromEnum(type: ChecklistType) {
  switch (type) {
    case ChecklistType.TROUSSEAU:
      return "/checklists/trousseau"
    case ChecklistType.DOCUMENTS:
      return "/checklists/documents"
    case ChecklistType.PROJET_NAISSANCE:
      return "/checklists/projet-naissance"
    default:
      return "/"
  }
}

function toInputFromEnum(type: ChecklistType): ChecklistTypeInput {
  switch (type) {
    case ChecklistType.TROUSSEAU:
      return "trousseau"
    case ChecklistType.DOCUMENTS:
      return "documents"
    case ChecklistType.PROJET_NAISSANCE:
      return "projet-naissance"
    default:
      throw new Error("Checklist type inconnu")
  }
}

function computeProgress(sections: Array<ChecklistSection & { items: ChecklistItem[] }>) {
  const total = sections.reduce((sum, section) => sum + section.items.length, 0)
  const completed = sections.reduce((sum, section) => sum + section.items.filter((item) => item.checked).length, 0)
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { total, completed, progress }
}

function toPayload(checklist: Awaited<ReturnType<typeof fetchChecklistById>>): ChecklistPayload {
  if (!checklist) {
    throw new Error("Checklist introuvable")
  }

  return {
    id: checklist.id,
    type: toInputFromEnum(checklist.type),
    progress: checklist.progression,
    sections: checklist.sections
      .sort((a, b) => a.order - b.order)
      .map((section) => ({
        id: section.id,
        title: section.title,
        items: section.items.map((item) => ({
          id: item.id,
          label: item.label,
          description: item.description,
          completed: item.checked,
          custom: item.custom,
        })),
      })),
  }
}

async function fetchChecklistById(id: string) {
  return prisma.checklist.findUnique({
    where: { id },
    include: {
      sections: {
        include: { items: true },
      },
    },
  })
}

async function ensureDemoUser(userId: string) {
  // Check if user exists by ID first
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (existingUser) {
    return existingUser
  }

  // Try to find by email or create new
  return prisma.user.upsert({
    where: { email: `${userId}@demo.local` },
    update: {},
    create: {
      id: userId,
      email: `${userId}@demo.local`,
      role: Role.MAMAN,
    },
  })
}

async function bootstrapChecklist(type: ChecklistTypeInput, userId: string) {
  const existing = await prisma.checklist.findFirst({
    where: { userId, type: toChecklistEnum(type) },
    include: { sections: { include: { items: true } } },
  })

  if (existing) {
    const { total, completed, progress } = computeProgress(existing.sections)
    if (existing.progression !== progress) {
      await prisma.checklist.update({
        where: { id: existing.id },
        data: { progression: progress, lastUpdated: new Date() },
      })
    }
    return existing
  }

  const defaults = defaultChecklists[type]
  const created = await prisma.checklist.create({
    data: {
      userId,
      type: toChecklistEnum(type),
      sections: {
        create: defaults.map((section, index) => ({
          title: section.title,
          order: index,
          items: {
            create: section.items.map((item) => ({
              label: item.label,
              description: item.description,
              checked: item.completed ?? false,
              custom: false,
            })),
          },
        })),
      },
    },
    include: { sections: { include: { items: true } } },
  })

  const { progress } = computeProgress(created.sections)
  await prisma.checklist.update({
    where: { id: created.id },
    data: { progression: progress },
  })

  return fetchChecklistById(created.id)
}

async function guardOwnership(checklistId: string, userId: string) {
  const checklist = await prisma.checklist.findFirst({
    where: { id: checklistId, userId },
  })
  if (!checklist) {
    throw new Error("Checklist inaccessible ou inexistante")
  }
  return checklist
}

async function recomputeProgress(checklistId: string) {
  const checklist = await prisma.checklist.findUnique({
    where: { id: checklistId },
    include: { sections: { include: { items: true } } },
  })

  if (!checklist) return null

  const { progress } = computeProgress(checklist.sections)
  await prisma.checklist.update({
    where: { id: checklistId },
    data: { progression: progress, lastUpdated: new Date() },
  })

  return progress
}

export async function getChecklist(rawType: ChecklistTypeInput) {
  const type = checklistTypeSchema.parse(rawType)
  const userId = await getCurrentUserId()

  if (!userId) {
    throw new Error('Non authentifié')
  }

  await ensureDemoUser(userId)
  const checklist = await bootstrapChecklist(type, userId)
  if (!checklist) {
    throw new Error("Impossible d'initialiser la checklist")
  }
  return toPayload(await fetchChecklistById(checklist.id))
}

export async function toggleChecklistItemAction(rawInput: ToggleChecklistItemInput) {
  const input = toggleChecklistItemSchema.parse(rawInput)
  const userId = await getCurrentUserId()

  if (!userId) {
    throw new Error('Non authentifié')
  }

  const item = await prisma.checklistItem.findFirst({
    where: { id: input.itemId, section: { checklist: { userId } } },
    include: { section: { include: { checklist: true } } },
  })

  if (!item) {
    throw new Error("Élément non trouvé ou non autorisé")
  }

  await prisma.checklistItem.update({
    where: { id: item.id },
    data: { checked: !item.checked },
  })

  await recomputeProgress(item.section.checklistId)
  revalidatePath(toSlugFromEnum(item.section.checklist.type))

  return toPayload(await fetchChecklistById(item.section.checklistId))
}

export async function resetChecklistAction(rawInput: ResetChecklistInput) {
  const input = resetChecklistSchema.parse(rawInput)
  const userId = await getCurrentUserId()

  if (!userId) {
    throw new Error('Non authentifié')
  }

  const checklist = await guardOwnership(input.checklistId, userId)

  await prisma.checklistItem.updateMany({
    where: { section: { checklistId: input.checklistId } },
    data: { checked: false },
  })

  await recomputeProgress(checklist.id)
  revalidatePath(toSlugFromEnum(checklist.type))

  return toPayload(await fetchChecklistById(checklist.id))
}
