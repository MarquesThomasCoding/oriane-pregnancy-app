import { getChecklist } from "@/app/actions/checklists"
import { Header } from "@/components/header"
import { TrousseauChecklistClient } from "@/components/checklists/trousseau-client"

export default async function TrousseauPage() {
  const checklist = await getChecklist("trousseau")

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 pt-14 2sm:pt-0 pb-20">
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Trousseau de maternité</h1>
          <p className="text-muted-foreground">
            Préparez votre valise pour le jour J. Cochez les éléments au fur et à mesure.
          </p>
        </div>
        <TrousseauChecklistClient checklist={checklist} />
      </main>
    </div>
  )
}
