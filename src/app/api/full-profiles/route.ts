import { getSuspects } from '@/libs/sqlite/queries'
import { FullProfileType } from '@/types'
import { mapMergedProfileToDbProfile } from '@/utils/dataMappers'
import { getBanStatus, getSteamProfiles } from '@/utils/helpers'

export async function GET() {
  try {
    const suspects = await getSuspects()
    if (!suspects) {
      return new Response('No suspects found', { status: 404 })
    }
    const ids = suspects.map((el) => el.steam_id)
    const steamProfiles = await getSteamProfiles(ids)
    const banStatus = await getBanStatus(ids)
    const fullProfiles: FullProfileType[] = suspects.map((el, i) =>
      mapMergedProfileToDbProfile({
        ...el,
        ...steamProfiles.find((el: any) => el.steamid === suspects[i].steam_id),
        ...banStatus.find((el: any) => el.SteamId === suspects[i].steam_id)
      })
    )
    return new Response(JSON.stringify(fullProfiles), { status: 200 })
  } catch (error) {
    return new Response('Internal server error', { status: 500 })
  }
}
