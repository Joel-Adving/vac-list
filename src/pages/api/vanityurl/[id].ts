import { getJSON } from '@/utils/helpers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing id' })
  const data = await getJSON(
    `${process.env.STEAM_API_URL}ResolveVanityURL/v0001/?key=${process.env.STEAM_API_KEY}&vanityurl=${id}`
  )
  res.json(data)
}
