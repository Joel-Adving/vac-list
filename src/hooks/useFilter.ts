import { useMemo } from 'react'
import { useFilterState } from '@/libs/redux/slices/filterSlice'
import { useSearchState } from '@/libs/redux/slices/searchSlice'
import { useGetFullProfilesQuery } from '@/libs/redux/query/nextApi'

export const useFilter = () => {
  const { data: steamProfiles } = useGetFullProfilesQuery()
  const [filter] = useFilterState()
  const [searchUserName] = useSearchState()

  const filteredProfiles = useMemo(() => {
    if (!steamProfiles) {
      return []
    }
    if (searchUserName) {
      return steamProfiles.filter((el) => el.persona_name.toLowerCase().includes(searchUserName.toLowerCase()))
    }
    switch (filter) {
      case 'all':
        return steamProfiles
      case 'suspects':
        return steamProfiles.filter((acc) => !acc.vac_banned && acc.number_of_game_bans < 1)
      case 'banned':
        return steamProfiles.filter((acc) => acc.vac_banned || acc.number_of_game_bans > 0)
      case 'vac banned':
        return steamProfiles.filter((acc) => acc.vac_banned)
      case 'game banned':
        return steamProfiles.filter((acc) => acc.number_of_game_bans > 0)
      default:
        return steamProfiles
    }
  }, [steamProfiles, searchUserName, filter])

  return { filteredProfiles }
}
