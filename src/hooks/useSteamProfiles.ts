import { useEffect, useState } from 'react'
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { getBanStatus, getSteamProfiles } from '@/utils/helpers'
import { useRecoilState } from 'recoil'
import { steamProfilesState } from '@/atoms/steamProfilesAtom'

export const useSteamProfiles = () => {
  const [steamProfiles, setSteamProfiles] = useRecoilState<any>(steamProfilesState)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (steamProfiles.length) return

    setLoading(true)
    const q = query(collection(db, `/steam-profiles/`), orderBy('created', 'desc'))

    const cleanup = onSnapshot(q, async (snapShot) => {
      if (snapShot.empty) return
      const docs: any[] = []
      snapShot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id })
      })

      const steamProfiles = await getSteamProfiles(docs.map((el) => el.id))
      const banStatus = await getBanStatus(docs.map((el) => el.id))
      const merged: any[] = docs.map((el, i) => ({
        ...el,
        ...steamProfiles.find((el: any) => el.steamid === docs[i].id),
        ...banStatus.find((el: any) => el.SteamId === docs[i].id)
      }))

      setSteamProfiles(merged)
      setLoading(false)
    })

    return () => cleanup()
  }, [setSteamProfiles, steamProfiles.length])

  return { loading }
}
