import React from 'react'
import { timeAgo } from '@/utils/timeAgo'
import Image from 'next/image'
import Link from 'next/link'
import { SteamProfile, SuspectType } from '@/types'

export default function Card({ profile }: { profile: SteamProfile & SuspectType }) {
  return (
    <Link
      prefetch={false}
      href={`/profile/${profile.steam_id}`}
      className="grid w-full h-full grid-cols-2 px-3 py-4 rounded-md shadow cursor-pointer sm:max-w-lg bg-background"
    >
      <Image
        priority
        className="w-full sm:max-w-[11.5rem] rounded-md"
        src={profile.avatar_full}
        alt="avatar"
        width={200}
        height={200}
      />
      <div className="flex flex-col justify-between flex-1 gap-2 px-3 sm:gap-5">
        <h2 className="break-all sm:text-lg text-highlight">{profile.persona_name}</h2>
        <div className="sm:text-lg">
          {profile.vac_banned && <p className="text-red-500 ">VAC BANNED</p>}
          {profile.number_of_game_bans > 0 && <p className="text-red-500">GAME BANNED</p>}
          {profile.days_since_last_ban > 0 && <p className="text-red-500">{profile.days_since_last_ban} days ago</p>}
        </div>
        <div className="flex items-center gap-1">
          <span className="mr-auto text-xs text-zinc-500">
            added{' '}
            {timeAgo.format(
              new Date(profile?.created_old?.seconds ? profile.created_old.seconds * 1000 : profile.created)
            )}
          </span>

          <div className="flex items-center bg-gray-700 h-fit">
            <Image
              priority
              className="w-4 h-4 border-r-[1.5px] border-highlight "
              src={profile.added_by.photoURL}
              alt="User profile image"
              width={40}
              height={40}
            />
            <h3 className="mx-1 text-xs text-highlight">{profile.added_by.name.split(' ')[0]}</h3>
          </div>
        </div>
      </div>
    </Link>
  )
}
