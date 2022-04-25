import { useEffect, useState } from 'react'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'
import { getBanStatus, getSteamProfiles } from '../util/helpers'
import { useRecoilState } from 'recoil'
import { steamProfilesState } from '../atoms/steamProfilesAtom'

export const useSteamProfiles = () => {
    const [steamProfiles, setSteamProfiles] = useRecoilState(steamProfilesState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (steamProfiles.length) return setLoading(false)
        setLoading(true)
        const q = query(collection(db, `/steam-profiles/`), orderBy('created', 'desc'))
        const unsub = onSnapshot(q, async snapShot => {
            const docs = []
            if (snapShot.empty) return
            else {
                snapShot.forEach(doc => docs.push({ ...doc.data(), id: doc.id }))
            }
            const steamProfiles = await getSteamProfiles(docs.map(el => el.id))
            const banStatus = await getBanStatus(docs.map(el => el.id))
            const merged = docs.map((el, i) => ({
                ...el,
                ...steamProfiles.find(el => el.steamid === docs[i].id),
                ...banStatus.find(el => el.SteamId === docs[i].id),
            }))

            setSteamProfiles(merged)
            setLoading(false)
        })

        return () => unsub()
    }, [])

    return { loading }
}
