import { useEffect } from 'react'
import { steamProfilesState } from '../atoms/steamProfilesAtom'
import Card from '../components/Card'
import TopNav from '../components/layout/TopNav'
import { useSteamProfiles } from '../hooks/useSteamProfiles'
import { useRecoilState } from 'recoil'
import { searchUserNameState } from '../atoms/searchUsernameAtom'
import { useFilter } from '../hooks/useFilter'
import { filterByState } from '../atoms/filterByAtom'

export default function Home() {
    const { loading } = useSteamProfiles()
    const [steamProfiles] = useRecoilState(steamProfilesState)
    const [searchUserName] = useRecoilState(searchUserNameState)
    const [filter, setFilter] = useRecoilState(filterByState)
    const { filteredProfiles, setFilteredProfiles } = useFilter()

    return (
        <div>
            <TopNav />
            <main className="max-w-5xl mx-auto my-1 md:my-10 text-text-lighter">
                {filteredProfiles && (
                    <section className="grid gap-1 overflow-hidden md:gap-3 responsive-grid">
                        {filter !== 'all' &&
                            filteredProfiles
                                .slice()
                                .sort((a, b) => a?.DaysSinceLastBan - b?.DaysSinceLastBan)
                                .map(profile => <Card key={profile.steamid} profile={profile} />)}

                        {filter === 'all' &&
                            filteredProfiles.map(profile => <Card key={profile.steamid} profile={profile} />)}
                    </section>
                )}

                {loading && <p className="py-12 pb-24 text-4xl font-thin text-cyan-400">Loading...</p>}
            </main>
        </div>
    )
}
