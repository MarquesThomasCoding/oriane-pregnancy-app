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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PregnancyProfileForm } from "@/components/pregnancy-profile-form"
import { getPregnancyProfile } from "@/app/actions/pregnancy-profile"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { CompteClientWrapper } from "@/components/compte-client-wrapper"

export default async function ComptePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login?callbackUrl=/compte")
  }

  const pregnancyProfile = await getPregnancyProfile()

  return (
    <div className="min-h-screen pt-14 2sm:pt-0 pb-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-4 md:p-6 border-b">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-balance">Mon Compte</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2 text-pretty">Gérez vos informations et préférences</p>
      </div>

      <main id="main-content" className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="grossesse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto gap-2 bg-transparent">
            <TabsTrigger
              value="profil"
              className="data-[state=active]:border-primary border-2 py-3 flex-col sm:flex-row gap-1 sm:gap-2"
            >
              <User className="h-4 w-4 sm:mr-2 mr-0" />
              <span className="text-xs sm:text-sm">Profil</span>
            </TabsTrigger>
            <TabsTrigger
              value="grossesse"
              className="data-[state=active]:border-primary border-2 py-3 flex-col sm:flex-row gap-1 sm:gap-2"
            >
              <Baby className="h-4 w-4 sm:mr-2 mr-0" />
              <span className="text-xs sm:text-sm">Grossesse</span>
            </TabsTrigger>
            <TabsTrigger
              value="parametres"
              className="data-[state=active]:border-primary border-2 py-3 flex-col sm:flex-row gap-1 sm:gap-2"
            >
              <Bell className="h-4 w-4 sm:mr-2 mr-0" />
              <span className="text-xs sm:text-sm">Réglages</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profil" className="space-y-4">
            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Informations personnelles</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Votre nom"
                    className="mt-1"
                    defaultValue={`${user.firstName || ""} ${user.lastName || ""}`.trim() || undefined}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="mt-1"
                    defaultValue={user.email}
                    disabled
                    aria-readonly
                  />
                </div>
                <Button className="w-full btn-primary hover:opacity-90">
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
                  <Input id="emergency-phone" type="tel" placeholder="Numéro de téléphone du contact" className="mt-1" />
                </div>
                <Button className="w-full btn-primary hover:opacity-90">Enregistrer</Button>
              </div>
            </div>
          </TabsContent>

          {/* Pregnancy Tab */}
          <TabsContent value="grossesse" className="space-y-4">
            <div className="bg-gradient-to-br from-card to-card/50 border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Informations grossesse</h3>
              <PregnancyProfileForm initialProfile={pregnancyProfile} />
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="parametres" className="space-y-4">
            <CompteClientWrapper />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
