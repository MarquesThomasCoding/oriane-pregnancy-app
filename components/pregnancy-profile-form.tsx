"use client"

import { useState, useTransition } from "react"
import { Calendar, Baby, AlertCircle, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    updatePregnancyProfile,
    resetPregnancyDates,
    type PregnancyProfileInput
} from "@/app/actions/pregnancy-profile"

type PregnancyProgress = {
    startDate: Date
    endDate: Date
    totalDays: number
    daysElapsed: number
    daysRemaining: number
    weeksElapsed: number
    daysInCurrentWeek: number
    trimester: number
    progressPercent: number
} | null

type PregnancyProfile = {
    pregnancyStart: Date | null
    pregnancyDue: Date | null
    pregnancyRisk: string | null
    progress: PregnancyProgress
} | null

type Props = {
    initialProfile: PregnancyProfile
}

function formatDateForInput(date: Date | null): string {
    if (!date) return ""
    return new Date(date).toISOString().split("T")[0]
}

export function PregnancyProfileForm({ initialProfile }: Props) {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const [dateMode, setDateMode] = useState<"conception" | "due">(
        initialProfile?.pregnancyStart ? "conception" : "due"
    )
    const [conceptionDate, setConceptionDate] = useState(
        formatDateForInput(initialProfile?.pregnancyStart ?? null)
    )
    const [dueDate, setDueDate] = useState(
        formatDateForInput(initialProfile?.pregnancyDue ?? null)
    )

    const progress = initialProfile?.progress

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        const input: PregnancyProfileInput = {
            pregnancyStart: dateMode === "conception" ? conceptionDate : null,
            pregnancyDue: dateMode === "due" ? dueDate : null,
        }

        startTransition(async () => {
            try {
                await updatePregnancyProfile(input)
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erreur lors de la mise à jour")
            }
        })
    }

    const handleReset = () => {
        setError(null)
        setSuccess(false)

        startTransition(async () => {
            try {
                await resetPregnancyDates()
                setConceptionDate("")
                setDueDate("")
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erreur lors de la réinitialisation")
            }
        })
    }

    return (
        <div className="space-y-6">
            {/* Affichage de la progression si disponible */}
            {progress && (
                <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-tertiary/10 border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Baby className="h-6 w-6 text-primary" />
                        <h4 className="text-lg font-semibold text-foreground">
                            Semaine {progress.weeksElapsed} + {progress.daysInCurrentWeek} jour{progress.daysInCurrentWeek > 1 ? "s" : ""}
                        </h4>
                        <span className="ml-auto text-sm font-medium text-muted-foreground">
                            Trimestre {progress.trimester}
                        </span>
                    </div>

                    {/* Barre de progression */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Conception</span>
                            <span>{progress.progressPercent}%</span>
                            <span>Terme</span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary via-accent to-tertiary transition-all duration-500"
                                style={{ width: `${progress.progressPercent}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>
                                {new Date(progress.startDate).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "short"
                                })}
                            </span>
                            <span className="font-medium text-primary">
                                {progress.daysRemaining} jour{progress.daysRemaining > 1 ? "s" : ""} restant{progress.daysRemaining > 1 ? "s" : ""}
                            </span>
                            <span>
                                {new Date(progress.endDate).toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "short"
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Formulaire de configuration */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                    <Label className="text-base font-medium">Comment souhaitez-vous renseigner votre grossesse ?</Label>
                    <RadioGroup
                        value={dateMode}
                        onValueChange={(v) => setDateMode(v as "conception" | "due")}
                        className="grid grid-cols-2 gap-3"
                    >
                        <Label
                            htmlFor="mode-conception"
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${dateMode === "conception"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                        >
                            <RadioGroupItem value="conception" id="mode-conception" />
                            <div>
                                <p className="font-medium">Date de conception</p>
                                <p className="text-xs text-muted-foreground">Premier jour des dernières règles</p>
                            </div>
                        </Label>
                        <Label
                            htmlFor="mode-due"
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${dateMode === "due"
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50"
                                }`}
                        >
                            <RadioGroupItem value="due" id="mode-due" />
                            <div>
                                <p className="font-medium">Terme prévu</p>
                                <p className="text-xs text-muted-foreground">Date prévue d'accouchement</p>
                            </div>
                        </Label>
                    </RadioGroup>
                </div>

                {dateMode === "conception" ? (
                    <div className="space-y-2">
                        <Label htmlFor="conception-date">
                            Date de conception (premier jour des dernières règles)
                        </Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="conception-date"
                                type="date"
                                value={conceptionDate}
                                onChange={(e) => setConceptionDate(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <Label htmlFor="due-date">Date prévue d'accouchement (DPA)</Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="due-date"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="pl-10"
                                required
                            />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm">
                        <Check className="h-4 w-4" />
                        Profil mis à jour avec succès !
                    </div>
                )}

                <div className="flex gap-3">
                    <Button
                        type="submit"
                        className="flex-1 btn-primary hover:opacity-90"
                        disabled={isPending}
                    >
                        {isPending ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                    {(initialProfile?.pregnancyStart || initialProfile?.pregnancyDue) && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            disabled={isPending}
                            className="gap-2 btn-outline"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Réinitialiser
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
