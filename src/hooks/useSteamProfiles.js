import { useEffect, useState } from 'react'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'
import { getBanStatus, getSteamProfiles } from '../util/helpers'

export const useSteamProfiles = () => {
    const [steamProfiles, setSteamProfiles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const q = query(collection(db, `/steam-profiles/`), orderBy('created', 'desc'))
        const unsub = onSnapshot(q, async snapShot => {
            const docs = []
            if (snapShot.empty) return
            else {
                snapShot.forEach(doc => docs.push(doc.id))
            }

            const steamProfiles = await getSteamProfiles(docs)
            const banStatus = await getBanStatus(docs)
            const merged = steamProfiles.map((el, i) => ({
                ...steamProfiles[i],
                ...banStatus.find(el => el.SteamId === steamProfiles[i].steamid),
            }))

            console.log(merged)
            setSteamProfiles(merged)
            setLoading(false)
            return unsub
        })
    }, [])

    return { steamProfiles, loading }
}
