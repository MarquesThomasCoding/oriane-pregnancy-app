"use client"

import { useState } from "react"
import {
  User,
  Calendar,
  Baby,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComptePage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 border-b">
        <h1 className="text-3xl font-bold text-foreground text-balance">Mon Compte</h1>
        <p className="text-muted-foreground mt-2 text-pretty">Gérez vos informations et préférences</p>
      </div>

      <main id="main-content" className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="profil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto gap-2 bg-transparent">
            <TabsTrigger
              value="profil"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground py-3"
            >
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger
              value="grossesse"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground py-3"
            >
              <Baby className="h-4 w-4 mr-2" />
              Grossesse
            </TabsTrigger>
            <TabsTrigger
              value="parametres"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-primary-foreground py-3"
            >
              <Bell className="h-4 w-4 mr-2" />
              Réglages
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profil" className="space-y-4">
            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Informations personnelles</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="Votre nom" className="mt-1" defaultValue="Marie Dupont" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="mt-1"
                    defaultValue="marie.dupont@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    className="mt-1"
                    defaultValue="06 12 34 56 78"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Enregistrer les modifications
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact d'urgence</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emergency-name">Nom du contact</Label>
                  <Input id="emergency-name" placeholder="Nom du contact" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="emergency-phone">Téléphone</Label>
                  <Input id="emergency-phone" type="tel" placeholder="06 12 34 56 78" className="mt-1" />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">Enregistrer</Button>
              </div>
            </div>
          </TabsContent>

          {/* Pregnancy Tab */}
          <TabsContent value="grossesse" className="space-y-4">
            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Informations grossesse</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dpa">Date Prévue d'Accouchement (DPA)</Label>
                  <Input id="dpa" type="date" className="mt-1" defaultValue="2025-08-15" />
                </div>
                <div>
                  <Label htmlFor="doctor">Gynécologue / Sage-femme</Label>
                  <Input id="doctor" placeholder="Dr. Nom du praticien" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="hospital">Maternité choisie</Label>
                  <Input id="hospital" placeholder="Nom de la maternité" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="blood-type">Groupe sanguin</Label>
                  <Input id="blood-type" placeholder="A+, O-, etc." className="mt-1" />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Mettre à jour
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Prochains rendez-vous</h3>
              <div className="space-y-3">
                {[
                  { date: "15 Jan 2025", type: "Consultation prénatale", doctor: "Dr. Martin" },
                  { date: "22 Jan 2025", type: "Échographie T2", doctor: "Dr. Leroy" },
                  { date: "5 Fév 2025", type: "Analyse de sang", doctor: "Laboratoire" },
                ].map((rdv, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{rdv.type}</p>
                        <p className="text-sm text-muted-foreground">{rdv.doctor}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary">{rdv.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="parametres" className="space-y-4">
            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Activer les notifications</p>
                      <p className="text-sm text-muted-foreground">Recevoir des rappels et alertes</p>
                    </div>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Apparence</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Mode sombre</p>
                      <p className="text-sm text-muted-foreground">Thème sombre pour l'interface</p>
                    </div>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary/70 transition-colors">
                  <div className="flex items-center gap-3">
                    <Palette className="h-5 w-5 text-muted-foreground" />
                    <p className="font-medium text-foreground">Personnaliser les couleurs</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { icon: Lock, label: "Sécurité et confidentialité", badge: null },
                { icon: HelpCircle, label: "Aide et support", badge: null },
                { icon: FileText, label: "Conditions d'utilisation", badge: null },
                { icon: FileText, label: "Politique de confidentialité", badge: null },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-4 bg-gradient-to-br from-card to-card/50 border rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                )
              })}
            </div>

            <Button
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
