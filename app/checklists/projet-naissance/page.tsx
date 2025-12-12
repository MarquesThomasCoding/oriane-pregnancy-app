import { getChecklist } from "@/app/actions/checklists"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { ProjetNaissanceChecklistClient } from "@/components/checklists/projet-naissance-client"

export default async function ProjetNaissancePage() {
  const checklist = await getChecklist("projet-naissance")

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 pb-20">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <ProjetNaissanceChecklistClient checklist={checklist} />
      </main>
      <MobileNav />
    </div>
  )
}
