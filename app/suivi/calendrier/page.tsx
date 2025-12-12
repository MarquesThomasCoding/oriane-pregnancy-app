"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Appointment {
  id: string
  date: Date
  type: string
  title: string
  location: string
  completed: boolean
}

export default function CalendrierPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      date: new Date(2025, 10, 10),
      type: "Échographie",
      title: "Échographie morphologique",
      location: "Cabinet Dr. Martin",
      completed: false,
    },
    {
      id: "2",
      date: new Date(2025, 10, 15),
      type: "Consultation",
      title: "Suivi mensuel",
      location: "Sage-femme Dupont",
      completed: false,
    },
    {
      id: "3",
      date: new Date(2025, 9, 20),
      type: "Analyse",
      title: "Prise de sang",
      location: "Laboratoire Centre",
      completed: true,
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    type: "Consultation",
    title: "",
    location: "",
    date: "",
  })

  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]

  const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7

    const days: (number | null)[] = []

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }

  const hasAppointment = (day: number) => {
    return appointments.some(
      (apt) =>
        apt.date.getDate() === day &&
        apt.date.getMonth() === currentDate.getMonth() &&
        apt.date.getFullYear() === currentDate.getFullYear(),
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const handleAddAppointment = () => {
    if (newAppointment.title && newAppointment.location && newAppointment.date) {
      const appointment: Appointment = {
        id: Date.now().toString(),
        date: new Date(newAppointment.date),
        type: newAppointment.type,
        title: newAppointment.title,
        location: newAppointment.location,
        completed: false,
      }
      setAppointments([...appointments, appointment])
      setNewAppointment({ type: "Consultation", title: "", location: "", date: "" })
      setShowAddForm(false)
    }
  }

  const days = getDaysInMonth(currentDate)

  const upcomingAppointments = appointments
    .filter((apt) => apt.date >= new Date() && !apt.completed)
    .sort((a, b) => a.date.getTime() - b.date.getTime())

  const pastAppointments = appointments
    .filter((apt) => apt.completed)
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/30 via-background to-tertiary/20 pb-20 md:pb-8">
      <Header />

      <main className="container px-4 py-6 space-y-6 max-w-6xl mx-auto">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Aller au contenu principal
        </a>

        <section id="main-content">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 text-balance">Calendrier médical</h1>
          <p className="text-sm md:text-base text-muted-foreground text-pretty">
            Suivez tous vos rendez-vous et examens médicaux.
          </p>
        </section>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={previousMonth}
              aria-label="Mois précédent"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-primary/10"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <h2 className="text-base md:text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              aria-label="Mois suivant"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-[10px] md:text-sm font-semibold text-muted-foreground py-1 md:py-2"
              >
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div
                key={index}
                className={cn(
                  "aspect-square flex items-center justify-center rounded-lg text-xs md:text-sm relative",
                  day === null && "invisible",
                  day !== null && "hover:bg-accent/50 cursor-pointer transition-colors",
                  isToday(day!) && "bg-primary text-white font-bold hover:bg-primary/90",
                  hasAppointment(day!) && !isToday(day!) && "bg-tertiary/20 font-semibold",
                )}
              >
                {day}
                {hasAppointment(day!) && (
                  <div className="absolute bottom-0.5 md:bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-3 md:mt-4 flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-primary" />
              <span>Aujourd'hui</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-tertiary/20 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              </div>
              <span>Rendez-vous</span>
            </div>
          </div>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold">Rendez-vous à venir</h2>
          <Button
            size="sm"
            className="gap-1 md:gap-2 rounded-xl text-xs md:text-sm h-8 md:h-9"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus className="h-3 w-3 md:h-4 md:w-4" />
            Ajouter
          </Button>
        </div>

        {showAddForm && (
          <Card className="p-4 md:p-5 space-y-3 md:space-y-4 animate-slide-up border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm md:text-base">Nouveau rendez-vous</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddForm(false)}
                className="h-7 w-7 md:h-8 md:w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs md:text-sm font-medium text-foreground block mb-1.5">Type</label>
                <select
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                  className="w-full h-10 md:h-11 px-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Échographie">Échographie</option>
                  <option value="Analyse">Analyse</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium text-foreground block mb-1.5">Titre</label>
                <input
                  type="text"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                  placeholder="Ex: Suivi mensuel"
                  className="w-full h-10 md:h-11 px-3 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium text-foreground block mb-1.5">Lieu</label>
                <input
                  type="text"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  placeholder="Ex: Cabinet médical"
                  className="w-full h-10 md:h-11 px-3 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs md:text-sm font-medium text-foreground block mb-1.5">Date et heure</label>
                <input
                  type="datetime-local"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  className="w-full h-10 md:h-11 px-3 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <Button
              onClick={handleAddAppointment}
              className="w-full rounded-xl bg-primary hover:bg-primary/90 h-10 md:h-11 text-sm"
              disabled={!newAppointment.title || !newAppointment.location || !newAppointment.date}
            >
              Confirmer le rendez-vous
            </Button>
          </Card>
        )}

        <div className="space-y-2 md:space-y-3">
          {upcomingAppointments.map((apt) => (
            <Card key={apt.id} className="p-3 md:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 md:gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="default" className="text-[10px] md:text-xs">
                      {apt.type}
                    </Badge>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {apt.date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">{apt.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{apt.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <h2 className="text-lg md:text-xl font-bold pt-4">Rendez-vous passés</h2>

        <div className="space-y-2 md:space-y-3">
          {pastAppointments.map((apt) => (
            <Card key={apt.id} className="p-3 md:p-4 opacity-70">
              <div className="flex items-start justify-between gap-2 md:gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="secondary" className="text-[10px] md:text-xs">
                      {apt.type}
                    </Badge>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {apt.date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base mb-1">{apt.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{apt.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
