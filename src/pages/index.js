import { useEffect, useState } from 'react'
import { steamProfilesState } from '../atoms/steamProfilesAtom'
import Card from '../components/Card'
import TopNav from '../components/layout/TopNav'
import { useSteamProfiles } from '../hooks/useSteamProfiles'
import { useRecoilState } from 'recoil'
import { filterByState } from '../atoms/filterByAtom'
import { searchUserNameState } from '../atoms/searchUsernameAtom'

export default function Home() {
    const { loading } = useSteamProfiles()
    const [steamProfiles, setSteamProfiles] = useRecoilState(steamProfilesState)
    const [searchUserName, setSearchUserName] = useRecoilState(searchUserNameState)
    const [filteredProfiles, setFilteredProfiles] = useState(null)
    const [filter, setFilter] = useRecoilState(filterByState)

    useEffect(() => {
        if (!steamProfiles) return
        if (filter === 'all') setFilteredProfiles(steamProfiles)
        if (filter === 'suspects')
            setFilteredProfiles(steamProfiles.filter(acc => !acc.VACBanned && acc.NumberOfGameBans < 1))
        if (filter === 'banned')
            setFilteredProfiles(steamProfiles.filter(acc => acc.VACBanned || acc.NumberOfGameBans > 0))
        if (filter === 'vac banned') setFilteredProfiles(steamProfiles.filter(acc => acc.VACBanned))
        if (filter === 'game banned') setFilteredProfiles(steamProfiles.filter(acc => acc.NumberOfGameBans > 0))
    }, [steamProfiles, filter])

    useEffect(() => {
        if (!searchUserName) return setFilteredProfiles(steamProfiles)
        setFilteredProfiles(
            steamProfiles.filter(el => el.personaname.toLowerCase().includes(searchUserName.toLowerCase()))
        )
    }, [searchUserName])

    return (
        <div>
            <TopNav />
            <main className="max-w-5xl mx-auto my-10 text-text-lighter">
                <section className="grid gap-3 responsive-grid">
                    {filteredProfiles &&
                        filteredProfiles
                            .slice()
                            .sort((a, b) => a?.DaysSinceLastBan - b?.DaysSinceLastBan)
                            .map(profile => <Card key={profile.steamid} profile={profile} />)}
                </section>
                {loading && <p className="py-12 pb-24 text-4xl font-thin text-cyan-400">Loading...</p>}
            </main>
        </div>
    )
}
