"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateUserProfileAction } from "@/app/actions/user"
import { AlertCircle, Check, Loader2 } from "lucide-react"

type UserData = {
    firstName: string | null
    lastName: string | null
    email: string | null
    emergencyContactName: string | null
    emergencyContactPhone: string | null
}

export function UserProfileForm({ user }: { user: UserData }) {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        emergencyContactName: user.emergencyContactName || "",
        emergencyContactPhone: user.emergencyContactPhone || "",
    })

    // Gestionnaire générique de changement
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    // Sauvegarde globale (ou par section si on veut)
    // Ici je fais une fonction de sauvegarde qui envoie tout le state
    const handleSave = () => {
        setMessage(null)
        startTransition(async () => {
            try {
                await updateUserProfileAction(formData)
                setMessage({ type: "success", text: "Modifications enregistrées" })
                setTimeout(() => setMessage(null), 3000)
            } catch (error) {
                setMessage({ type: "error", text: "Erreur lors de l'enregistrement" })
            }
        })
    }

    return (
        <div className="space-y-6">
            {/* Feedback Message (Toast-like) */}
            {message && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg border flex items-center gap-3 animate-in slide-in-from-bottom-5 z-50 ${message.type === "success"
                            ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400"
                            : "bg-destructive/10 border-destructive/20 text-destructive"
                        }`}
                >
                    {message.type === "success" ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    <p className="font-medium">{message.text}</p>
                </div>
            )}

            {/* Section Infos Personnelles */}
            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Informations personnelles</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input
                                id="firstName"
                                placeholder="Votre prénom"
                                className="mt-1"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName">Nom</Label>
                            <Input
                                id="lastName"
                                placeholder="Votre nom"
                                className="mt-1"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={user.email || ""}
                            className="mt-1 bg-muted/50"
                            disabled
                            aria-readonly
                        />
                        <p className="text-xs text-muted-foreground mt-1">L'adresse email ne peut pas être modifiée.</p>
                    </div>
                    <Button
                        className="w-full btn-primary hover:opacity-90"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Enregistrer les modifications
                    </Button>
                </div>
            </div>

            {/* Section Contact d'urgence */}
            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact d'urgence</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Personne à contacter en cas de besoin lors de votre accouchement.
                </p>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="emergencyContactName">Nom du contact</Label>
                        <Input
                            id="emergencyContactName"
                            placeholder="Ex: Pierre Martin (Conjoint)"
                            className="mt-1"
                            value={formData.emergencyContactName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="emergencyContactPhone">Téléphone</Label>
                        <Input
                            id="emergencyContactPhone"
                            type="tel"
                            placeholder="Ex: 06 12 34 56 78"
                            className="mt-1"
                            value={formData.emergencyContactPhone}
                            onChange={handleChange}
                        />
                    </div>
                    <Button
                        className="w-full btn-primary hover:opacity-90"
                        onClick={handleSave}
                        disabled={isPending}
                    >
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        Enregistrer
                    </Button>
                </div>
            </div>
        </div>
    )
}
