import FilterBar from '@/components/FilterBar'
import Profiles from '@/components/Profiles'
import { api } from '@/services/api'
import { Suspense } from 'react'

export const revalidate = 3600

export default async function Home() {
  const profiles = await api.getProfiles().catch(() => [])

  return (
    <main className="px-4">
      <Suspense>
        <FilterBar />
        <Profiles profiles={profiles} />
      </Suspense>
    </main>
  )
}
