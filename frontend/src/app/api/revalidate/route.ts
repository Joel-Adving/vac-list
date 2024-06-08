import { revalidatePath, revalidateTag } from 'next/cache'

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path')
  if (!path) {
    return Response.json({ status: 400, body: { error: 'Missing path' } })
  }
  revalidateTag('cache')
  revalidatePath(path)
  console.log(`Path revalidated: ${path}`)
  return Response.json({ status: 200, body: { message: 'Path revalidated' } })
}
