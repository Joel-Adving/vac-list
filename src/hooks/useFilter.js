import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { filterByState } from '../atoms/filterByAtom'

export const useFilter = steamProfiles => {
    const [filter, setFilter] = useRecoilState(filterByState)
    const [filteredProfiles, setFilteredProfiles] = useState(null)

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
    }, [steamProfiles, filter])

    return { filteredProfiles, setFilteredProfiles, filter }
}
