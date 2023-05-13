'use client'

import { filterByState } from '@/atoms/filterByAtom'
import { useFilter } from '@/hooks/useFilter'
import { useSteamProfiles } from '@/hooks/useSteamProfiles'
import { useRecoilState } from 'recoil'
import Card from './Card'

export default function Profiles() {
  const { loading } = useSteamProfiles()
  const [filter] = useRecoilState(filterByState)
  const { filteredProfiles } = useFilter()

  return (
    <div className="max-w-5xl px-4 mx-auto my-1 md:my-10 text-text-lighter lg:px-0">
      {filteredProfiles && (
        <section className="flex flex-col pt-6 sm:grid gap-14 md:pt-0 sm:gap-3 responsive-grid">
          {filter !== 'all' &&
            filteredProfiles
              ?.slice()
              ?.sort((a, b) => a?.DaysSinceLastBan - b?.DaysSinceLastBan)
              ?.map((profile) => <Card key={profile.steamid} profile={profile} />)}

          {filter === 'all' && filteredProfiles.map((profile) => <Card key={profile.steamid} profile={profile} />)}
        </section>
      )}

      {loading && (
        <p className="grid place-content-center h-[60vh] pb-24 mx-auto text-5xl font-thin w-fit text-cyan-400">Loading...</p>
      )}
    </div>
  )
}
