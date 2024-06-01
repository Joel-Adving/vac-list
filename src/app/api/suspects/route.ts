import { getProfiles, getSuspects } from '@/libs/sqlite/queries'

export async function GET(request: Request) {
  try {
    const suspects = await getSuspects()
    if (!suspects) {
      return new Response('No suspects found', { status: 404 })
    }
    return new Response(JSON.stringify(suspects), { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}
