import { z } from 'zod'

export const createAppointmentSchema = z.object({
  date: z.string().datetime(),
  kind: z.string().min(1, 'Le type de rendez-vous est requis'),
  location: z.string().optional(),
  doctor: z.string().optional(),
  notes: z.string().optional(),
})

export const updateAppointmentSchema = z.object({
  appointmentId: z.string().cuid(),
  date: z.string().datetime().optional(),
  kind: z.string().min(1).optional(),
  location: z.string().optional(),
  doctor: z.string().optional(),
  notes: z.string().optional(),
})

export const deleteAppointmentSchema = z.object({
  appointmentId: z.string().cuid(),
})

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>
export type UpdateAppointmentInput = z.infer<typeof updateAppointmentSchema>
export type DeleteAppointmentInput = z.infer<typeof deleteAppointmentSchema>
