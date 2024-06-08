import FilterBar from '@/components/FilterBar'
import Profiles from '@/components/Profiles'
import { api } from '@/services/api'

export const revalidate = 3600

export default async function Home() {
  const profiles = await api.getProfiles()

  return (
    <main className="px-4">
      <FilterBar />
      <Profiles profiles={profiles} />
    </main>
  )
}
