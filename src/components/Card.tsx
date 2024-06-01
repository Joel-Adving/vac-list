'use client'
import React from 'react'
import { timeAgo } from '@/utils/timeAgo'
import Image from 'next/image'
import Link from 'next/link'
import { FullProfileType } from '@/types'

export default function Card({ profile }: { profile: FullProfileType }) {
  return (
    <Link href={`/profile/${profile.steam_id}`} passHref>
      <div className="flex flex-col h-full p-4 rounded-sm shadow-2xl cursor-pointer bg-background sm:flex-row">
        <Image
          priority
          className="w-full sm:max-w-[11.5rem] rounded-sm"
          src={profile.avatar_full}
          alt="avatar"
          width={200}
          height={200}
        />
        <div className="flex flex-col justify-between flex-1 p-2 space-y-5 sm:px-5 sm:space-y-0">
          <h2 style={{ wordBreak: 'break-all' }} className="mt-1 text-xl sm:mt-0 text-highlight">
            {profile.persona_name}
          </h2>
          <div className="text-xl sm:text-lg">
            {profile.vac_banned && <p className="text-red-500 ">VAC BANNED</p>}
            {profile.number_of_game_bans > 0 && <p className="text-red-500">GAME BANNED</p>}
            {profile.days_since_last_ban > 0 && <p className="text-red-500">{profile.days_since_last_ban} days ago</p>}
          </div>
          <div className="flex space-x-1">
            <span className="mr-auto text-sm text-zinc-500">
              added {timeAgo.format(new Date(profile.created.seconds * 1000))}
            </span>

            <div className="flex items-center bg-gray-700">
              <Image
                priority
                className="w-5 h-5 border-r-[1.5px] border-highlight "
                src={profile.added_by.photoURL}
                alt="User profile image"
                width={40}
                height={40}
              />
              <h3 className="mx-1 text-xs text-highlight">{profile.added_by.name.split(' ')[0]}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
