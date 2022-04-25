import React from 'react'
import { timeAgo } from '../util/timeAgo'

export default function Card({ profile }) {
    return (
        <a href={profile.profileurl}>
            <div className="flex shadow-2xl bg-background">
                <img className="h-full" src={profile.avatarfull} alt="avatar" />
                <div className="flex flex-col justify-between p-4">
                    <h2 className="text-2xl text-highlight">{profile.personaname}</h2>
                    <div>
                        {profile.VACBanned && <p className="font-semibold text-red-900">VAC BANNED</p>}
                        {profile.NumberOfGameBans > 0 && <p className="font-semibold text-red-900">GAME BANNED</p>}
                        {profile.DaysSinceLastBan > 0 && (
                            <p className="font-semibold text-red-900">{profile.DaysSinceLastBan} days ago</p>
                        )}
                    </div>
                    <p className="text-sm text-gray-400">
                        added {timeAgo.format(new Date(profile.created.seconds * 1000))}
                    </p>
                </div>
            </div>
        </a>
    )
}
