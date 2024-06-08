import { insertSuspect, sqliteService } from '@/libs/sqlite/queries'
import { api } from '@/services/api'
import { SuspectType } from '@/types'
import { revalidateTag } from 'next/cache'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const suspect = await sqliteService.getSuspect(params.id)
    if (!suspect) {
      return new Response(JSON.stringify({ error: 'No suspect found' }), { status: 404 })
    }
    return new Response(JSON.stringify(suspect), { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const suspect = await api.getSuspect(params.id)
    if (suspect && !suspect.error) {
      return new Response(JSON.stringify({ error: 'User already in database' }), { status: 400 })
    }

    const reqBody = (await request.json()) as SuspectType
    if (!reqBody) {
      return new Response('Missing suspect data', { status: 400 })
    }

    if (!reqBody.steam_id || !reqBody.added_by.email || !reqBody.suspect_type || !reqBody.created) {
      return new Response('Missing required fields', { status: 400 })
    }

    const res = await insertSuspect(reqBody)
    if (res.success) {
      revalidateTag('suspects')
      return new Response('Suspect added successfully', { status: 201 })
    }
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await sqliteService.deleteSuspect(params.id)
    revalidateTag('suspects')
    return new Response('Deleted profile', { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}
