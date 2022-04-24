import React from 'react'

export default function Card({ profile }) {
    return (
        <div className="bg-background">
            <h2>{profile.personaname}</h2>
            <img src={profile.avatar} alt="avatar" />
            <p>VAC BANNED: {profile.VACBanned ? 'yes' : 'no'}</p>
            <p>GAME BANNED: {profile.NumberOfGameBans > 1 ? 'yes' : 'no'}</p>
        </div>
    )
}
