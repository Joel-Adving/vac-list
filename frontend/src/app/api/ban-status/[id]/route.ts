export const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  if (!id) {
    return Response.json({ status: 400, body: { error: 'Missing id' } })
  }
  try {
    const data = await fetch(
      `${process.env.STEAM_API_URL}GetPlayerBans/v1//?key=${process.env.STEAM_API_KEY}&steamids=${id}&format=json`
    ).then((res) => res.json())
    return Response.json(data)
  } catch (error) {
    console.log(error)
    return Response.json({ status: 500, body: { error: 'Internal Server Error' } })
  }
}