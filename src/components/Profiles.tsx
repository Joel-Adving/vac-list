'use client'

import { useFilter } from '@/hooks/useFilter'
import Card from './Card'
import { useFilterState } from '@/libs/redux/slices/filterSlice'
import { useGetFullProfilesQuery } from '@/libs/redux/query/nextApi'

export default function Profiles() {
  const { isLoading } = useGetFullProfilesQuery()
  const [filter] = useFilterState()
  const { filteredProfiles } = useFilter()

  return (
    <div className="max-w-5xl px-3 mx-auto my-1 md:my-10 text-text-lighter lg:px-0">
      {filteredProfiles && (
        <section className="flex flex-col gap-3 pt-3 sm:grid md:pt-0 sm:gap-3 responsive-grid">
          {filter !== 'all' &&
            filteredProfiles
              ?.slice()
              ?.sort((a, b) => a?.days_since_last_ban - b?.days_since_last_ban)
              ?.map((profile) => <Card key={profile.steam_id} profile={profile} />)}

          {filter === 'all' && filteredProfiles.map((profile) => <Card key={profile.steam_id} profile={profile} />)}
        </section>
      )}

      {isLoading && (
        <div className="flex flex-col gap-3 pt-3 sm:grid md:pt-0 sm:gap-3 responsive-grid">
          {Array.from(Array(10).keys()).map((i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-5 p-5 sm:h-[13.5rem] h-[25rem] bg-background rounded-sm animate-pulse"
            >
              <div className="bg-gray-700 rounded-sm w-full sm:max-w-[11.5rem] h-full"></div>
              <div className="flex flex-col justify-between w-full gap-6 sm:gap-0">
                <div className="w-3/5 h-6 mt-2 bg-gray-700 rounded-sm"></div>
                <div className="flex justify-between mb-2">
                  <div className="w-2/5 h-4 bg-gray-700 rounded-sm"></div>
                  <div className="w-10 h-4 mr-4 bg-gray-700 rounded-sm"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
