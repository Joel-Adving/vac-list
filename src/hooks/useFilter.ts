import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { filterByState } from '../atoms/filterByAtom'
import { searchUserNameState } from '../atoms/searchUsernameAtom'
import { steamProfilesState } from '../atoms/steamProfilesAtom'

export const useFilter = () => {
  const filter = useRecoilValue(filterByState)
  const steamProfiles = useRecoilValue(steamProfilesState)
  const [searchUserName] = useRecoilState(searchUserNameState)

  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([])

  useEffect(() => {
    if (!steamProfiles) return

    if (filter === 'all') {
      setFilteredProfiles(steamProfiles)
    }
    if (filter === 'suspects') {
      setFilteredProfiles(steamProfiles.filter((acc: any) => !acc.VACBanned && acc.NumberOfGameBans < 1))
    }
    if (filter === 'banned') {
      setFilteredProfiles(steamProfiles.filter((acc: any) => acc.VACBanned || acc.NumberOfGameBans > 0))
    }
    if (filter === 'vac banned') {
      setFilteredProfiles(steamProfiles.filter((acc: any) => acc.VACBanned))
    }
    if (filter === 'game banned') {
      setFilteredProfiles(steamProfiles.filter((acc: any) => acc.NumberOfGameBans > 0))
    }

    if (searchUserName) {
      setFilteredProfiles(
        steamProfiles.filter((el: any) => el.personaname.toLowerCase().includes(searchUserName.toLowerCase()))
      )
    }
  }, [steamProfiles, filter, searchUserName])

  return { filteredProfiles }
}
