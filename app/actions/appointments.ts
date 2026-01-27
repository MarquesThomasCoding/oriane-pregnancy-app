'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getCurrentUserId } from '@/lib/auth'
import {
  createAppointmentSchema,
  updateAppointmentSchema,
  deleteAppointmentSchema,
  type CreateAppointmentInput,
  type UpdateAppointmentInput,
  type DeleteAppointmentInput,
} from '@/lib/validators/appointments'

export async function createAppointmentAction(input: CreateAppointmentInput) {
  const parsed = createAppointmentSchema.parse(input)
  const userId = await getCurrentUserId()

  if (!userId) {
    throw new Error('Non authentifié')
  }

  const appointment = await prisma.appointment.create({
    data: {
      userId,
      date: new Date(parsed.date),
      kind: parsed.kind,
      location: parsed.location,
      doctor: parsed.doctor,
      notes: parsed.notes,
    },
  })

  revalidatePath('/suivi/calendrier')
  return { appointment }
}

export async function updateAppointmentAction(input: UpdateAppointmentInput) {
  const parsed = updateAppointmentSchema.parse(input)
  const userId = await getCurrentUserId()

  if (!userId) {
    throw new Error('Non authentifié')
  }

  const appointment = await prisma.appointment.update({
    where: {
      id: parsed.appointmentId,
      userId,
    },
    data: {
      ...(parsed.date && { date: new Date(parsed.date) }),
      ...(parsed.kind && { kind: parsed.kind }),
      ...(parsed.location !== undefined && { location: parsed.location }),
      ...(parsed.doctor !== undefined && { doctor: parsed.doctor }),
      ...(parsed.notes !== undefined && { notes: parsed.notes }),
    },
  })

  revalidatePath('/suivi/calendrier')
  return { appointment }
}

export async function deleteAppointmentAction(input: DeleteAppointmentInput) {
  const parsed = deleteAppointmentSchema.parse(input)
  const userId = await getCurrentUserId()

  if (!userId) {
    throw new Error('Non authentifié')
  }

  await prisma.appointment.delete({
    where: {
      id: parsed.appointmentId,
      userId,
    },
  })

  revalidatePath('/suivi/calendrier')
  return { success: true }
}

export async function getAppointmentsAction() {
  const userId = await getCurrentUserId()

  if (!userId) {
    return { upcoming: [], past: [] }
  }

  const appointments = await prisma.appointment.findMany({
    where: { userId },
    orderBy: { date: 'asc' },
  })

  const now = new Date()
  const upcoming = appointments.filter((apt) => apt.date >= now)
  const past = appointments.filter((apt) => apt.date < now)

  return { upcoming, past }
}
