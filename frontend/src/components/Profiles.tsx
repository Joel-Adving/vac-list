'use client'
import Card from './Card'
import { SteamProfileSuspectType } from '@/types'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

export default function Profiles({ profiles }: { profiles: SteamProfileSuspectType[] }) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const filter = searchParams.get('filter')

  const filteredProfiles = useMemo(() => {
    let _profiles = profiles.slice().sort((a, b) => {
      const bTime = b?.created_old?.seconds ? b?.created_old?.seconds * 1000 : new Date(b.created).getTime()
      const aTime = a?.created_old?.seconds ? a?.created_old?.seconds * 1000 : new Date(a.created).getTime()
      return bTime - aTime
    })
    switch (filter) {
      case '':
        break
      case 'suspects':
        _profiles = _profiles.filter((acc) => !acc.vac_banned && acc.number_of_game_bans < 1)
        break
      case 'banned':
        _profiles = _profiles.filter((acc) => acc.vac_banned || acc.number_of_game_bans > 0)
        break
      case 'vac-banned':
        _profiles = _profiles.filter((acc) => acc.vac_banned)
        break
      case 'game-banned':
        _profiles = _profiles.filter((acc) => acc.number_of_game_bans > 0)
    }
    if (search) {
      _profiles = _profiles.filter((el) => el.persona_name.toLowerCase().includes(search.toLowerCase()))
    }
    return _profiles
  }, [profiles, search, filter])

  return (
    <div className="pb-5 mx-auto max-w-7xl text-text-lighter">
      <section className="flex flex-col items-center gap-3 sm:grid responsive-grid">
        {filteredProfiles?.map((profile) => (
          <Card key={profile.steam_id} profile={profile} />
        ))}
      </section>
    </div>
  )
}
