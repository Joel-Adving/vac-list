import { getJSON } from '@/utils/helpers'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing id' })
  const data = await getJSON(
    `${process.env.STEAM_API_URL2}GetUserStatsForGame/v0002/?appid=730&key=${process.env.STEAM_API_KEY}&steamid=${id}`
  )
  res.json(data)
}
