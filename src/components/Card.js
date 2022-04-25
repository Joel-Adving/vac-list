import React from 'react'
import { timeAgo } from '../util/timeAgo'

export default function Card({ profile }) {
    return (
        <a href={profile.profileurl} className="w-screen sm:w-full">
            <div className="flex flex-col shadow-2xl bg-background sm:flex-row">
                <img className="max-h-full" src={profile.avatarfull} alt="avatar" />
                <div className="flex flex-col justify-between p-4 space-y-5 sm:space-y-0">
                    <h2 className="text-2xl text-highlight">{profile.personaname}</h2>
                    <div>
                        {profile.VACBanned && <p className="text-red-500 ">VAC BANNED</p>}
                        {profile.NumberOfGameBans > 0 && <p className="text-red-500">GAME BANNED</p>}
                        {profile.DaysSinceLastBan > 0 && (
                            <p className="text-red-500">{profile.DaysSinceLastBan} days ago</p>
                        )}
                    </div>
                    <p className="text-sm text-zinc-500">
                        added {timeAgo.format(new Date(profile.created.seconds * 1000))}
                    </p>
                </div>
            </div>
        </a>
    )
}
