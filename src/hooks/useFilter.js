import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { filterByState } from '../atoms/filterByAtom'
import { searchUserNameState } from '../atoms/searchUsernameAtom'
import { steamProfilesState } from '../atoms/steamProfilesAtom'

export const useFilter = () => {
    const [filter, setFilter] = useRecoilState(filterByState)
    const [filteredProfiles, setFilteredProfiles] = useState(null)
    const [steamProfiles, setSteamProfiles] = useRecoilState(steamProfilesState)
    const [searchUserName] = useRecoilState(searchUserNameState)

    useEffect(() => {
        if (!steamProfiles) return

        if (filter === 'all') {
            setFilteredProfiles(steamProfiles)
        }
        if (filter === 'suspects') {
            setFilteredProfiles(steamProfiles.filter(acc => !acc.VACBanned && acc.NumberOfGameBans < 1))
        }
        if (filter === 'banned') {
            setFilteredProfiles(steamProfiles.filter(acc => acc.VACBanned || acc.NumberOfGameBans > 0))
        }
        if (filter === 'vac banned') {
            setFilteredProfiles(steamProfiles.filter(acc => acc.VACBanned))
        }
        if (filter === 'game banned') {
            setFilteredProfiles(steamProfiles.filter(acc => acc.NumberOfGameBans > 0))
        }

        if (searchUserName) {
            setFilteredProfiles(
                steamProfiles.filter(el => el.personaname.toLowerCase().includes(searchUserName.toLowerCase()))
            )
        }
    }, [steamProfiles, filter, searchUserName])

    return { filteredProfiles }
}
