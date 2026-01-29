"use client"

import { useState } from "react"
import {
    Bell,
    Moon,
    Palette,
    Lock,
    HelpCircle,
    FileText,
    LogOut,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { logoutAction } from "@/app/actions/auth"
import { useRouter } from "next/navigation"

export function CompteClientWrapper() {
    const [notifications, setNotifications] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    const router = useRouter()

    const handleLogout = async () => {
        await logoutAction()
        router.push("/login")
    }

    const toggleDarkMode = (enabled: boolean) => {
        setDarkMode(enabled)
        document.documentElement.classList.toggle("dark", enabled)
    }

    return (
        <>
            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <Bell className="h-5 w-5 text-muted-foreground shrink-0" />
                            <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">Activer les notifications</p>
                                <p className="text-sm text-muted-foreground truncate">Recevoir des rappels et alertes</p>
                            </div>
                        </div>
                        <Switch checked={notifications} onCheckedChange={setNotifications} className="shrink-0" />
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-4">Apparence</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                            <Moon className="h-5 w-5 text-muted-foreground shrink-0" />
                            <div className="min-w-0">
                                <p className="font-medium text-foreground truncate">Mode sombre</p>
                                <p className="text-sm text-muted-foreground truncate">Thème sombre pour l'interface</p>
                            </div>
                        </div>
                        <Switch checked={darkMode} onCheckedChange={toggleDarkMode} className="shrink-0" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg cursor-not-allowed hover:bg-secondary/70 transition-colors">
                        <div className="flex items-center gap-3">
                            <Palette className="h-5 w-5 text-muted-foreground" />
                            <p className="font-medium text-muted-foreground">Personnaliser les couleurs</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                {[
                    { icon: Lock, label: "Sécurité et confidentialité" },
                    { icon: HelpCircle, label: "Aide et support" },
                    { icon: FileText, label: "Conditions d'utilisation" },
                    { icon: FileText, label: "Politique de confidentialité" },
                ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                        <button
                            key={idx}
                            className="w-full flex items-center justify-between p-4 bg-gradient-to-br from-card to-card/50 border rounded-xl hover:shadow-md transition-shadow cursor-not-allowed"
                            disabled
                            aria-disabled
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5 text-muted-foreground" />
                                <span className="font-medium text-muted-foreground">{item.label}</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </button>
                    )
                })}
            </div>

            <Button
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                onClick={handleLogout}
            >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
            </Button>
        </>
    )
}
