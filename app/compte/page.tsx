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
    <div className="min-h-screen pb-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 border-b">
        <h1 className="text-3xl font-bold text-foreground text-balance">Mon Compte</h1>
        <p className="text-muted-foreground mt-2 text-pretty">Gérez vos informations et préférences</p>
      </div>

      <main id="main-content" className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="grossesse" className="space-y-6">
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
