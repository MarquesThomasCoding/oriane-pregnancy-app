'use client'

import { useState, useOptimistic } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Calendar as CalendarIcon, MapPin, User, Pencil, Trash2 } from 'lucide-react'
import {
  createAppointmentAction,
  updateAppointmentAction,
  deleteAppointmentAction,
} from '@/app/actions/appointments'
import { cn } from '@/lib/utils'

type Appointment = {
  id: string
  date: Date
  kind: string
  location: string | null
  doctor: string | null
  notes: string | null
}

type AppointmentsClientProps = {
  upcoming: Appointment[]
  past: Appointment[]
}

const appointmentTypes = [
  { value: 'Échographie', label: 'Échographie' },
  { value: 'Consultation', label: 'Consultation' },
  { value: 'Analyse de sang', label: 'Analyse de sang' },
  { value: 'Visite prénatale', label: 'Visite prénatale' },
  { value: 'Autre', label: 'Autre' },
]

export function AppointmentsClient({ upcoming, past }: AppointmentsClientProps) {
  const [optimisticUpcoming, setOptimisticUpcoming] = useOptimistic(upcoming)
  const [optimisticPast, setOptimisticPast] = useOptimistic(past)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

  const [formData, setFormData] = useState({
    kind: 'Consultation',
    location: '',
    doctor: '',
    notes: '',
    date: '',
    time: '',
  })

  const resetForm = () => {
    setFormData({
      kind: 'Consultation',
      location: '',
      doctor: '',
      notes: '',
      date: '',
      time: '',
    })
    setSelectedDate(undefined)
  }

  const handleCreate = async () => {
    if (!selectedDate || !formData.time || !formData.kind) return

    const dateTime = new Date(selectedDate)
    const [hours, minutes] = formData.time.split(':')
    dateTime.setHours(parseInt(hours), parseInt(minutes))

    await createAppointmentAction({
      date: dateTime.toISOString(),
      kind: formData.kind,
      location: formData.location || undefined,
      doctor: formData.doctor || undefined,
      notes: formData.notes || undefined,
    })

    setIsAddOpen(false)
    resetForm()
  }

  const handleUpdate = async () => {
    if (!editingAppointment) return

    let dateTime: Date | undefined
    if (selectedDate && formData.time) {
      dateTime = new Date(selectedDate)
      const [hours, minutes] = formData.time.split(':')
      dateTime.setHours(parseInt(hours), parseInt(minutes))
    }

    await updateAppointmentAction({
      appointmentId: editingAppointment.id,
      ...(dateTime && { date: dateTime.toISOString() }),
      ...(formData.kind && { kind: formData.kind }),
      location: formData.location || undefined,
      doctor: formData.doctor || undefined,
      notes: formData.notes || undefined,
    })

    setIsEditOpen(false)
    setEditingAppointment(null)
    resetForm()
  }

  const handleDelete = async (appointmentId: string) => {
    if (!confirm('Êtes-vous sûre de vouloir supprimer ce rendez-vous ?')) return

    await deleteAppointmentAction({ appointmentId })
  }

  const openEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setSelectedDate(new Date(appointment.date))
    setFormData({
      kind: appointment.kind,
      location: appointment.location || '',
      doctor: appointment.doctor || '',
      notes: appointment.notes || '',
      date: new Date(appointment.date).toISOString().split('T')[0],
      time: new Date(appointment.date).toTimeString().slice(0, 5),
    })
    setIsEditOpen(true)
  }

  const hasAppointmentOnDate = (date: Date) => {
    return [...optimisticUpcoming, ...optimisticPast].some(
      (apt) =>
        new Date(apt.date).toDateString() === date.toDateString()
    )
  }

  return (
    <div className="space-y-6">
      {/* Calendrier avec indicateurs */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Calendrier</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md"
          modifiers={{
            hasAppointment: (date) => hasAppointmentOnDate(date),
          }}
          modifiersClassNames={{
            hasAppointment: 'bg-primary/20 font-bold',
          }}
        />
      </Card>

      {/* Bouton Ajouter */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un rendez-vous
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nouveau rendez-vous</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="kind">Type de rendez-vous</Label>
              <select
                id="kind"
                value={formData.kind}
                onChange={(e) => setFormData({ ...formData, kind: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border bg-background text-foreground"
              >
                {appointmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Heure</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lieu</Label>
              <Input
                id="location"
                placeholder="Ex: Cabinet Dr. Martin"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor">Médecin / Sage-femme</Label>
              <Input
                id="doctor"
                placeholder="Ex: Dr. Martin"
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Informations complémentaires..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <Button
              onClick={handleCreate}
              className="w-full"
              disabled={!selectedDate || !formData.time || !formData.kind}
            >
              Créer le rendez-vous
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog d'édition */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le rendez-vous</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-kind">Type de rendez-vous</Label>
              <select
                id="edit-kind"
                value={formData.kind}
                onChange={(e) => setFormData({ ...formData, kind: e.target.value })}
                className="w-full h-10 px-3 rounded-lg border bg-background text-foreground"
              >
                {appointmentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-time">Heure</Label>
              <Input
                id="edit-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-location">Lieu</Label>
              <Input
                id="edit-location"
                placeholder="Ex: Cabinet Dr. Martin"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-doctor">Médecin / Sage-femme</Label>
              <Input
                id="edit-doctor"
                placeholder="Ex: Dr. Martin"
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                placeholder="Informations complémentaires..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>

            <Button onClick={handleUpdate} className="w-full">
              Enregistrer les modifications
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rendez-vous à venir */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Rendez-vous à venir</h2>
        {optimisticUpcoming.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            Aucun rendez-vous à venir
          </Card>
        ) : (
          optimisticUpcoming.map((apt) => (
            <Card key={apt.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge>{apt.kind}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(apt.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                      {' à '}
                      {new Date(apt.date).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  
                  {apt.location && (
                    <p className="text-sm flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {apt.location}
                    </p>
                  )}
                  
                  {apt.doctor && (
                    <p className="text-sm flex items-center gap-1 text-muted-foreground">
                      <User className="h-3 w-3" />
                      {apt.doctor}
                    </p>
                  )}
                  
                  {apt.notes && (
                    <p className="text-sm text-muted-foreground mt-2">{apt.notes}</p>
                  )}
                </div>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(apt)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(apt.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Rendez-vous passés */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Rendez-vous passés</h2>
        {optimisticPast.length === 0 ? (
          <Card className="p-6 text-center text-muted-foreground">
            Aucun rendez-vous passé
          </Card>
        ) : (
          optimisticPast.map((apt) => (
            <Card key={apt.id} className="p-4 opacity-70">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">{apt.kind}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(apt.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  
                  {apt.location && (
                    <p className="text-sm flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {apt.location}
                    </p>
                  )}
                  
                  {apt.doctor && (
                    <p className="text-sm flex items-center gap-1 text-muted-foreground">
                      <User className="h-3 w-3" />
                      {apt.doctor}
                    </p>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(apt.id)}
                  className="h-8 w-8 text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
