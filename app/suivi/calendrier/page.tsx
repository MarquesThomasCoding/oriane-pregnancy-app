import { Header } from "@/components/header"
import { getAppointmentsAction } from "@/app/actions/appointments"
import { AppointmentsClient } from "@/components/appointments/appointments-client"

export default async function CalendrierPage() {
  const { upcoming, past } = await getAppointmentsAction()

  return (
    <>
      <Header />
      <main id="main-content" className="pb-20 pt-14 2sm:pt-0">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Mes rendez-vous</h1>
          <AppointmentsClient upcoming={upcoming} past={past} />
        </div>
      </main>
    </>
  )
}
