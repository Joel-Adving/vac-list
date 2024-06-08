import { pb } from '@/libs/pocketbase'
import { SuspectType } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const suspects = await pb.collection<SuspectType>('suspects').getFullList()
    return new Response(JSON.stringify(suspects), { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}
