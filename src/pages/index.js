import { useEffect } from 'react'
import Card from '../components/Card'
import TopNav from '../components/layout/TopNav'
import { useSteamProfiles } from '../hooks/useSteamProfiles'

export default function Home() {
    const { steamProfiles, loading } = useSteamProfiles()

    return (
        <div>
            <TopNav />
            <main className="max-w-5xl mx-auto my-10 text-text-lighter">
                <section className="grid gap-4 p-4 responsive-grid">
                    {steamProfiles && steamProfiles.map(profile => <Card key={profile.steamid} profile={profile} />)}
                </section>
                {loading && <p className="py-12 pb-24 text-4xl font-thin text-cyan-400">Loading...</p>}
            </main>
        </div>
    )
}
