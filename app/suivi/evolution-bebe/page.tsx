import { Header } from "@/components/header"
import { getPregnancyProfile } from "@/app/actions/pregnancy-profile"
import { EvolutionBebeClient } from "@/components/evolution-bebe-client"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Baby } from "lucide-react"

export default async function EvolutionBebePage() {
  const profile = await getPregnancyProfile()

  // Si pas de profil, on peut soit rediriger, soit afficher un écran "vide"
  // Ici, je choisis d'afficher un écran incitatif pour rester sur la page mais bloquer le contenu
  const hasPregnancyData = !!profile?.progress

  const initialWeek = profile?.progress?.weeksElapsed || 4

  return (
    <div className="min-h-screen pt-14 2sm:pt-0 pb-20 md:pb-8">
      <Header />

      <main className="container px-4 py-6 space-y-6 max-w-6xl mx-auto">
        {hasPregnancyData ? (
          <EvolutionBebeClient initialWeek={initialWeek} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <Baby className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2 max-w-md">
              <h1 className="text-2xl font-bold">Configurez votre grossesse</h1>
              <p className="text-muted-foreground">
                Pour suivre l'évolution de votre bébé semaine par semaine, nous avons besoin de connaître la date de début de votre grossesse.
              </p>
            </div>
            <Link href="/compte">
              <Button size="lg" className="font-semibold">
                Configurer ma grossesse
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
