import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/libs/firebase/config'
import { FirestoreProfileType, SuspectType } from '@/types'
import { mapFirestoreProfileToSqlite } from '@/utils/dataMappers'
import { sqlite } from '@/libs/sqlite'
import { insertSuspect } from '@/libs/sqlite/queries'

export async function GET() {
  try {
    const profiles: FirestoreProfileType[] | null = await new Promise((resolve) => {
      onSnapshot(query(collection(db, `/steam-profiles/`), orderBy('created', 'desc')), async (snapShot) => {
        if (snapShot.empty) {
          resolve(null)
        }

        const docs: any[] = []
        snapShot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id })
        })

        resolve(docs)

        // const steamProfiles = await getSteamProfiles(docs.map((el) => el.id))
        // const banStatus = await getBanStatus(docs.map((el) => el.id))
        // const merged = docs.map((el, i) => ({
        //   ...el,
        //   ...steamProfiles.find((el: any) => el.steamid === docs[i].id),
        //   ...banStatus.find((el: any) => el.SteamId === docs[i].id)
        // }))
        // resolve(merged)
      })
    })

    if (!profiles) {
      return new Response('No profiles found', { status: 404 })
    }

    const suspects: SuspectType[] = profiles.map(mapFirestoreProfileToSqlite)

    try {
      await sqlite.exec('BEGIN TRANSACTION')
      for (const suspect of suspects) {
        await insertSuspect(suspect)
      }
      await sqlite.exec('COMMIT')
      console.log('All profiles inserted successfully')
    } catch (err) {
      await sqlite.exec('ROLLBACK')
      console.error('Error inserting profiles:', err)
    }
    return new Response(JSON.stringify(suspects), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response('Internal server error', { status: 500 })
  }
}
