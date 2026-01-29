import { getChecklist } from "@/app/actions/checklists"
import { Header } from "@/components/header"
import { DocumentsChecklistClient } from "@/components/checklists/documents-client"

export default async function DocumentsPage() {
  const checklist = await getChecklist("documents")

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20 pb-20">
      <Header />
      <main id="main-content" className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        <DocumentsChecklistClient checklist={checklist} />
      </main>
    </div>
  )
}
