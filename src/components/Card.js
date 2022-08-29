import React from 'react'
import { timeAgo } from '../util/timeAgo'
import Link from 'next/link'

export default function Card({ profile }) {
  return (
    <Link href={`/steam-profile/${profile.steamid}`}>
      <div className="flex flex-col p-4 shadow-2xl cursor-pointer bg-background sm:flex-row">
        <img className="" src={profile.avatarfull} alt="avatar" />
        <div className="flex flex-col justify-between flex-1 p-2 space-y-5 sm:p-3 sm:space-y-0">
          <h2 style={{ wordBreak: 'break-all' }} className="max-w-md mt-1 text-4xl sm:text-2xl sm:mt-0 text-highlight">
            {profile.personaname}
          </h2>
          <div className="text-xl sm:text-lg">
            {profile.VACBanned && <p className="text-red-500 ">VAC BANNED</p>}
            {profile.NumberOfGameBans > 0 && <p className="text-red-500">GAME BANNED</p>}
            {profile.DaysSinceLastBan > 0 && <p className="text-red-500">{profile.DaysSinceLastBan} days ago</p>}
          </div>
          <div className="flex space-x-1">
            <span className="mr-auto text-sm text-zinc-500">
              added {timeAgo.format(new Date(profile.created.seconds * 1000))}
            </span>

            <div className="flex items-center bg-gray-700">
              <img
                className="w-5 h-5 border-r-[1.5px] border-highlight "
                src={profile.added_by.photoURL}
                alt="User profile image"
              />
              <h3 className="mx-1 text-xs text-highlight">{profile.added_by.name.split(' ')[0]}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
