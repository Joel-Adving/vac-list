import { pb } from '@/libs/pocketbase'
import { api } from '@/services/api'
import { SuspectType } from '@/types'
import { revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const suspect = await pb.collection('suspects').getList(1, 1, { filter: `steam_id = '${params.id}'` })
    if (suspect?.items?.length === 0) {
      return new Response(JSON.stringify({ error: 'error' }), { status: 404 })
    }
    return new Response(JSON.stringify(suspect.items[0]), { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const suspect = await pb.collection('suspects').getList(1, 1, { filter: `steam_id = '${params.id}'` })
    if (suspect?.items?.length > 0) {
      return new Response(JSON.stringify({ error: 'User already in database' }), { status: 400 })
    }

    const reqBody = (await request.json()) as SuspectType
    if (!reqBody) {
      return new Response('Missing suspect data', { status: 400 })
    }

    if (!reqBody.steam_id || !reqBody.added_by.email || !reqBody.suspect_type) {
      return new Response('Missing required fields', { status: 400 })
    }

    const res = await pb.collection('suspects').create(reqBody)
    if (res.id) {
      revalidateTag('cache')
      return new Response('Suspect added successfully', { status: 201 })
    }
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const suspect = await pb.collection('suspects').getList(1, 1, { filter: `steam_id = '${params.id}'` })
    if (!suspect.items[0]) {
      return new Response(JSON.stringify({ error: 'No suspect found' }), { status: 404 })
    }
    await pb.collection('suspects').delete(suspect.items[0].id)
    revalidateTag('cache')
    return new Response('Deleted profile', { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}
