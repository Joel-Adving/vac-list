import { useEffect, useState } from 'react'
import { useFilterState } from '@/redux/slices/filterSlice'
import { useSearchState } from '@/redux/slices/searchSlice'
import { ProfileType, useProfilesState } from '@/redux/slices/profilesSlice'

export const useFilter = () => {
  const [filter] = useFilterState()
  const [steamProfiles] = useProfilesState()
  const [searchUserName] = useSearchState()
  const [filteredProfiles, setFilteredProfiles] = useState<ProfileType[]>([])

  useEffect(() => {
    if (!steamProfiles) return

    if (filter === 'all') {
      setFilteredProfiles(steamProfiles)
    }
    if (filter === 'suspects') {
      setFilteredProfiles(steamProfiles.filter((acc) => !acc.VACBanned && acc.NumberOfGameBans < 1))
    }
    if (filter === 'banned') {
      setFilteredProfiles(steamProfiles.filter((acc) => acc.VACBanned || acc.NumberOfGameBans > 0))
    }
    if (filter === 'vac banned') {
      setFilteredProfiles(steamProfiles.filter((acc) => acc.VACBanned))
    }
    if (filter === 'game banned') {
      setFilteredProfiles(steamProfiles.filter((acc) => acc.NumberOfGameBans > 0))
    }

    if (searchUserName) {
      setFilteredProfiles(steamProfiles.filter((el) => el.personaname.toLowerCase().includes(searchUserName.toLowerCase())))
    }
  }, [steamProfiles, filter, searchUserName])

  return { filteredProfiles }
}
