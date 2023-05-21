import { env } from '@/utils/env'
import { getJSON } from '@/utils/helpers'
import { NextApiRequest, NextApiResponse } from 'next'

const { STEAM_API_URL, STEAM_API_KEY } = env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing id' })
  const data = await getJSON(`${STEAM_API_URL}GetPlayerBans/v1//?key=${STEAM_API_KEY}&steamids=${id}&format=json`)
  res.json(data)
}
