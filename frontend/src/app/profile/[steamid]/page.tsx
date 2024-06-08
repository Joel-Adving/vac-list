import { timeAgo } from '@/utils/timeAgo'
import countries from 'i18n-iso-countries'
import Image from 'next/image'
import RemoveProfile from './RemoveProfile'
import { api } from '@/services/api'

export const revalidate = 3600

export default async function SteamProfile({ params }: { params: { steamid: string } }) {
  const profile = await api.getProfile(params.steamid)

  return (
    <div className="flex flex-col w-full min-h-[calc(100dvh-3.5rem)] p-4 mx-auto bg-gray-800 max-w-7xl text-stone-400">
      {profile && (
        <div className="flex flex-col gap-3 md:flex-row max-w">
          <div className="flex flex-col flex-grow mt-1 ml-1 sm:p-1.5 sm:flex-row  max-w-[655px]">
            <Image
              width={150}
              height={150}
              priority
              className="border-[2px] border-stone-500"
              src={profile.avatar_full}
              alt="avatar"
            />
            <div className="flex flex-col sm:ml-5">
              <div>
                <h2 className="my-5 mr-3 text-2xl sm:my-0 sm:mt-1 text-zinc-100">{profile.persona_name}</h2>
                <div className="flex items-center text-sm ">
                  {profile?.loccountry_code && (
                    <>
                      <Image
                        priority
                        width={12}
                        height={12}
                        className="h-3 mr-1 mt-[1.5x]"
                        alt="United States"
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${profile?.loccountry_code}.svg`}
                      />
                      <p> {countries.getName(profile?.loccountry_code, 'en')}</p>
                    </>
                  )}
                </div>
              </div>
              <a href={profile.profile_url} className="text-sm break-words sm:mt-11">
                {profile.profile_url}
              </a>
            </div>
          </div>
          <div className="flex items-center flex-grow max-w-sm pl-1 mt-1 md:pt-4 md:items-start md:flex-col text-zinc-100 ">
            <div className="flex items-center md:mb-3 max-w-max">
              <h3 className="mr-2 text-md">{profile.added_by?.name?.split(' ')[0]}</h3>
              <Image
                priority
                width={36}
                height={36}
                className="w-9 h-9 rounded-full border-2 p-[1px] border-red-500 mr-2"
                src={profile.added_by?.photoURL}
                alt="User profile image"
              />
            </div>
            <p className="text-sm text-zinc-500">
              Submitted{' '}
              {timeAgo.format(
                new Date(profile.created_old?.seconds ? profile.created_old?.seconds * 1000 : profile.created)
              )}
            </p>
          </div>
        </div>
      )}
      {profile && (
        <div className="flex flex-col-reverse gap-3 mt-7 sm:flex-row">
          <div className="flex flex-col flex-grow gap-2 p-4 rounded bg-background-dark">
            {profile.time_created && (
              <p>
                <span className="text-zinc-100">Account created: </span>
                {profile.time_created && timeAgo.format(new Date(profile?.time_created * 1000))}
              </p>
            )}
            {profile.player_stats && (
              <>
                <p>
                  <span className="text-zinc-100">K/D: </span>
                  {(profile.player_stats?.stats?.[0]?.value / profile.player_stats?.stats?.[1]?.value).toFixed(2)}
                </p>
                <p>
                  <span className="text-zinc-100">HS rate: </span>
                  {(100 * (profile.player_stats?.stats?.[25]?.value / profile.player_stats?.stats?.[0]?.value)).toFixed(
                    2
                  )}
                  %
                </p>
              </>
            )}

            <p>
              <span className="text-zinc-100">Reason for adding: </span>
              {profile.suspect_type === 'sus' ? 'Very suspicious' : 'Rage hacker'}
            </p>

            <RemoveProfile steamId={profile.steam_id} />
          </div>
          <div className="flex flex-col flex-grow max-w-xs min-w-full gap-2 p-5 rounded sm:min-w-0 bg-background-dark">
            <div>
              {profile.vac_banned && <p className="text-red-500 ">VAC BANNED</p>}
              {profile.number_of_game_bans > 0 && <p className="text-red-500">GAME BANNED</p>}
              {profile.days_since_last_ban > 0 && (
                <p className="text-red-500">{profile.days_since_last_ban} days ago</p>
              )}
            </div>
            <p>Number of VAC bans: {profile.number_of_vac_bans}</p>
            <p>Number of game bans: {profile.number_of_game_bans}</p>
            {profile.community_banned && <p>community banned</p>}
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateStaticParams() {
  return []
}
