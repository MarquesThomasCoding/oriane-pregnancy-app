import { Header } from "@/components/header"
import {
  ClipboardCheck,
  FileText,
  Calendar,
  Activity,
  Apple,
  Baby,
  Heart,
  Bell,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-secondary/30 via-background to-tertiary/20 pb-20 md:pb-8">
      {/* Skip to content for accessibility */}
      {/* <a
        href="#main-content"
        className="fixed top-0 left-0 z-100 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Aller au contenu principal
      </a> */}

      {/* Skip to navbar for accessibility */}
      {/* <a
        href="#navbar"
        className="fixed top-0 left-0 z-100 sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Aller à la barre de navigation principale
      </a> */}

      <Header />

      <main id="main-content" className="container px-4 py-6 space-y-6 max-w-6xl mx-auto">

        <div className="flex justify-end -mb-4">
          <Button size="icon" variant="ghost" className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20">
            <Bell className="h-5 w-5 text-primary" />
          </Button>
        </div>

        <section className="animate-slide-up" aria-labelledby="welcome-heading">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/images/mascotte.png"
                alt="Mascotte Oriane - Femme enceinte souriante"
                width={180}
                height={180}
                className="drop-shadow-xl"
                priority
              />
            </div>
            <div className="flex-1">
              <h1
                id="welcome-heading"
                className="text-2xl md:text-3xl font-bold text-foreground flex items-baseline gap-2"
              >
                Bonjour, {user.firstName}{" "}
                <span className="text-2xl animate-wave inline-block" role="img" aria-label="Main qui fait coucou">
                  👋
                </span>
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1">Bon après-midi</p>
            </div>
          </div>
        </section>

        <section className="animate-scale-in">
          <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-tertiary p-6 md:p-8 text-white shadow-xl hover-lift overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <p className="text-white/90 text-sm mb-1">Votre grossesse</p>
              <h2 className="text-2xl md:text-3xl font-bold">Semaine 24</h2>
              <p className="text-white/80 text-sm mt-1">Trimestre 2 • 16 semaines restantes</p>

              <div className="space-y-2 mt-6">
                <div className="flex justify-between text-sm">
                  <span>Progression globale</span>
                  <span className="font-semibold">60%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full w-[60%] shimmer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-2 md:gap-3 animate-slide-up">
          <div className="bg-card rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm border border-border hover-lift">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-success" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">72%</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Trousseau</p>
          </div>

          <div className="bg-card rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm border border-border hover-lift">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">7/10</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Documents</p>
          </div>

          <div className="bg-card rounded-xl md:rounded-2xl p-3 md:p-4 shadow-sm border border-border hover-lift">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-tertiary/10 flex items-center justify-center">
                <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 text-tertiary" />
              </div>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">3j</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Prochain RDV</p>
          </div>
        </section>

        {/* <section>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            <Button className="rounded-full bg-primary text-white hover:bg-primary/90 shadow-sm text-sm whitespace-nowrap">
              Tout
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-2 hover:border-primary hover:text-primary bg-transparent text-sm whitespace-nowrap"
            >
              Rendez-vous
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-2 hover:border-primary hover:text-primary bg-transparent text-sm whitespace-nowrap"
            >
              Nutrition
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-2 hover:border-primary hover:text-primary bg-transparent text-sm whitespace-nowrap"
            >
              Bien-être
            </Button>
          </div>
        </section> */}

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-foreground">Actions rapides</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 text-xs md:text-sm">
              Voir tout <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-3 sm:grid-cols-4">
            <Link href="/checklists/trousseau" prefetch={false} className="group">
              <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-success/10 to-success/5 p-4 md:p-6 hover-lift border border-success/20">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-success/20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <ClipboardCheck className="h-5 w-5 md:h-6 md:w-6 text-success" />
                </div>
                <p className="font-semibold text-foreground text-xs md:text-sm">Trousseau</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">18/25 articles</p>
              </div>
            </Link>

            <Link href="/checklists/documents" prefetch={false} className="group">
              <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 md:p-6 hover-lift border border-primary/20">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground text-xs md:text-sm">Documents</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">7/10 complétés</p>
              </div>
            </Link>

            <Link href="/suivi/calendrier" prefetch={false} className="group">
              <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-tertiary/10 to-tertiary/5 p-4 md:p-6 hover-lift border border-tertiary/20">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-tertiary/20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-5 w-5 md:h-6 md:w-6 text-tertiary" />
                </div>
                <p className="font-semibold text-foreground text-xs md:text-sm">Calendrier</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">3 RDV ce mois</p>
              </div>
            </Link>

            <Link href="/suivi/symptomes" prefetch={false} className="group">
              <div className="rounded-xl md:rounded-2xl bg-gradient-to-br from-warning/10 to-warning/5 p-4 md:p-6 hover-lift border border-warning/20">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-warning/20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <Activity className="h-5 w-5 md:h-6 md:w-6 text-warning" />
                </div>
                <p className="font-semibold text-foreground text-xs md:text-sm">Symptômes</p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Journal</p>
              </div>
            </Link>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-foreground">Conseils du jour</h2>
            <Link href="/faq" prefetch={false} className="text-xs md:text-sm text-primary hover:text-primary/80 underline font-medium" aria-label="Voir la foire aux questions">
              Voir la foire aux questions
            </Link>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl md:rounded-2xl bg-card p-4 md:p-5 shadow-sm border border-border hover-lift">
              <div className="flex gap-3 md:gap-4">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-tertiary/20 to-tertiary/10 flex items-center justify-center flex-shrink-0">
                  <Apple className="h-6 w-6 md:h-8 md:w-8 text-tertiary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[10px] md:text-xs">
                      Nutrition
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-xs md:text-sm mb-1">Aliments riches en fer</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">
                    Privilégiez les épinards, lentilles et viande rouge pour maintenir un bon niveau de fer
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl md:rounded-2xl bg-card p-4 md:p-5 shadow-sm border border-border hover-lift">
              <div className="flex gap-3 md:gap-4">
                <div className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 text-success" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[10px] md:text-xs">
                      Bien-être
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-xs md:text-sm mb-1">Exercices de respiration</h3>
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2">
                    Pratiquez 10 minutes de respiration profonde pour réduire le stress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Link href="/suivi/evolution-bebe" prefetch={false}>
            <div className="rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/10 to-tertiary/5 p-5 md:p-6 border-2 border-primary/20 hover-lift">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-foreground">Développement de bébé</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">Semaine 24</p>
                </div>
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center animate-float">
                  <Baby className="h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
              </div>
              <p className="text-xs md:text-sm text-foreground/80 mb-3">
                Votre bébé mesure environ 30 cm et pèse 600g. Ses sens continuent de se développer.
              </p>
              <Button className="w-full rounded-xl bg-primary hover:bg-primary/90 text-sm">En savoir plus</Button>
            </div>
          </Link>
        </section>
      </main>
    </div>
  )
}
