import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/libs/firebase/config'
import { FirestoreProfileType, SuspectType } from '@/types'
import { mapFirestoreSuspectToSqlite } from '@/utils/dataMappers'
import { revalidateTag } from 'next/cache'
import { pb } from '@/libs/pocketbase'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret')
  if (secret !== process.env.SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  const suspects = await pb.collection('suspects').getFullList({ next: { revalidate: 0 } })
  if (suspects.length > 0) {
    return new Response(JSON.stringify({ message: 'Already migrated', suspects }), { status: 200 })
  }

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

  const _suspects: SuspectType[] = profiles.map(mapFirestoreSuspectToSqlite)
  for (const suspect of _suspects) {
    await pb.collection('suspects').create(suspect)
  }

  revalidateTag('cache')

  return new Response(JSON.stringify(_suspects), { status: 200 })
}
