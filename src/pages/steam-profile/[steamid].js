import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { getBanStatus, getSteamProfiles } from '../../util/helpers'
import { db } from '../../firebase/config'
import { timeAgo } from '../../util/timeAgo'

export default function SteamProfile() {
    const router = useRouter()
    const { steamid } = router.query
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (!steamid) return
        getProfile()
    }, [])

    const getProfile = async () => {
        const docRef = doc(db, 'steam-profiles', steamid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) return
        const dbProfile = { ...docSnap.data(), id: docSnap.id }
        const steamProfiles = await getSteamProfiles(steamid)
        const banStatus = await getBanStatus(steamid)
        const merged = {
            ...dbProfile,
            ...steamProfiles[0],
            ...banStatus[0],
        }
        console.log(merged)
        setProfile(merged)
    }
    return (
        profile && (
            <div className="flex flex-col w-full max-w-5xl min-h-screen mx-auto bg-gray-800 text-zinc-100">
                <div className="flex w-full p-5 mt-3 ml-1 ">
                    <img className="max-h-full" src={profile.avatarfull} alt="avatar" />
                    <h2 className="mt-2 ml-5 text-2xl ">{profile.personaname}</h2>
                </div>
                <div className="flex gap-3 p-3">
                    <div className="flex flex-col flex-grow gap-2 p-4 rounded text-text bg-background-dark">
                        <span>Profile URL: {profile.profileurl}</span>
                        <span>Country: {profile.loccountrycode}</span>
                        <span>Real name: {profile.realname}</span>
                        <span>steamid: {profile.steamid}</span>
                        <span>CommunityBanned: {profile.CommunityBanned}</span>
                        <span>DaysSinceLastBan: {profile.DaysSinceLastBan}</span>
                        <span>NumberOfGameBans: {profile.NumberOfGameBans}</span>
                        <span>NumberOfVACBans: {profile.NumberOfVACBans}</span>
                        <span>commentpermission: {profile.commentpermission}</span>
                        <span>communityvisibilitystate: {profile.communityvisibilitystate}</span>
                        <span>primaryclanid: {profile.primaryclanid}</span>
                        <span>profilestate: {profile.profilestate}</span>
                        <span>Suspect type: {profile.suspect_type}</span>
                        <span>
                            Account created: <span> </span>
                            {profile.timecreated && timeAgo.format(new Date(profile?.timecreated * 1000))}
                        </span>
                    </div>
                    <div className="flex flex-col flex-grow gap-2 p-5 rounded text-text bg-background-dark">
                        <div>
                            {profile.VACBanned && <p className="text-red-500 ">VAC BANNED</p>}
                            {profile.NumberOfGameBans > 0 && <p className="text-red-500">GAME BANNED</p>}
                            {profile.DaysSinceLastBan > 0 && (
                                <p className="text-red-500">{profile.DaysSinceLastBan} days ago</p>
                            )}
                        </div>
                        <span>CommunityBanned: {profile.CommunityBanned}</span>
                        <span>DaysSinceLastBan: {profile.DaysSinceLastBan}</span>
                        <span>NumberOfGameBans: {profile.NumberOfGameBans}</span>
                        <span>NumberOfVACBans: {profile.NumberOfVACBans}</span>
                        <span>Suspect type: {profile.suspect_type}</span>
                        <span>
                            Account created: <span> </span>
                            {profile.timecreated && timeAgo.format(new Date(profile?.timecreated * 1000))}
                        </span>
                    </div>
                </div>
            </div>
        )
    )
}
