import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/libs/firebase/config'
import { FirestoreProfileType, SuspectType } from '@/types'
import { mapFirestoreSuspectToSqlite } from '@/utils/dataMappers'
import { sqlite } from '@/libs/sqlite'
import { insertSuspect } from '@/libs/sqlite/queries'

export async function GET(request: Request) {
  const secret = new URLSearchParams(request.url).get('secret')
  if (secret !== process.env.SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

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
      })
    })

    if (!profiles) {
      return new Response('No profiles found', { status: 404 })
    }

    const suspects: SuspectType[] = profiles.map(mapFirestoreSuspectToSqlite)

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
