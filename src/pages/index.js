import Card from '../components/Card'
import TopNav from '../components/layout/TopNav'
import { useSteamProfiles } from '../hooks/useSteamProfiles'
import { useRecoilState } from 'recoil'
import { useFilter } from '../hooks/useFilter'
import { filterByState } from '../atoms/filterByAtom'

export default function Home() {
  const { loading } = useSteamProfiles()
  const [filter] = useRecoilState(filterByState)
  const { filteredProfiles } = useFilter()

  return (
    <>
      <TopNav />
      <main className="max-w-5xl px-4 mx-auto my-1 md:my-10 text-text-lighter lg:px-0">
        {filteredProfiles && (
          <section className="flex flex-col pt-6 sm:grid gap-14 md:pt-0 sm:gap-3 responsive-grid">
            {filter !== 'all' &&
              filteredProfiles
                .slice()
                .sort((a, b) => a?.DaysSinceLastBan - b?.DaysSinceLastBan)
                .map((profile) => <Card key={profile.steamid} profile={profile} />)}

            {filter === 'all' && filteredProfiles.map((profile) => <Card key={profile.steamid} profile={profile} />)}
          </section>
        )}

        {loading && <p className="py-12 pb-24 text-4xl font-thin text-cyan-400">Loading...</p>}
      </main>
    </>
  )
}
