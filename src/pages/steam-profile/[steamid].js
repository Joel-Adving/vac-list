import { useRouter } from 'next/router'
import { doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { getBanStatus, getCsgoStats, getSteamProfiles } from '../../util/helpers'
import { db } from '../../firebase/config'
import { timeAgo } from '../../util/timeAgo'
import countries from 'i18n-iso-countries'
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

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
        const csgoStats = await getCsgoStats(steamid)

        const merged = {
            ...dbProfile,
            ...csgoStats,
            ...steamProfiles[0],
            ...banStatus[0],
        }
        console.log(merged)
        setProfile(merged)
    }
    return (
        <div className="flex flex-col w-full max-w-5xl min-h-screen p-4 mx-auto bg-gray-800 text-stone-400">
            {profile && (
                <div className="flex flex-col gap-3 md:flex-row">
                    <div className="flex flex-grow p-3 mt-1 ml-1">
                        <img
                            className="max-h-full border-[2.5px] border-stone-500"
                            src={profile.avatarfull}
                            alt="avatar"
                        />
                        <div className="flex flex-col ml-5">
                            <div>
                                <h2 className="mt-1 mr-3 text-2xl text-zinc-100">{profile.personaname}</h2>
                                <div className="flex items-center text-sm ">
                                    <p>{profile?.realname ?? ''}</p>
                                    {profile.loccountrycode && (
                                        <>
                                            <img
                                                className="h-3 mr-1 mt-[1.5x]"
                                                alt="United States"
                                                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${profile.loccountrycode}.svg`}
                                            />
                                            <p> {countries.getName(profile.loccountrycode, 'en')}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <a href={profile.profileurl} className="text-sm mt-11 ">
                                {profile.profileurl}
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow max-w-xs p-4 ml-0 text-zinc-100">
                        {profile.timecreated && (
                            <>
                                <p>Account created</p>
                                <p>{profile.timecreated && timeAgo.format(new Date(profile?.timecreated * 1000))}</p>
                            </>
                        )}
                    </div>
                </div>
            )}
            {profile && (
                <div className="flex flex-col gap-3 mt-7 md:flex-row">
                    <div className="flex flex-col flex-grow gap-2 p-4 rounded bg-background-dark">
                        {profile.timecreated && (
                            <p>
                                <span className="text-zinc-100">Account created: </span>
                                {profile.timecreated && timeAgo.format(new Date(profile?.timecreated * 1000))}
                            </p>
                        )}
                        {profile.playerstats && (
                            <>
                                {/* <p>
                                    <span className="text-zinc-100">Total playtime: </span>
                                    {Math.ceil(profile?.playerstats?.stats[2]?.value / 60 / 60)} hours
                                </p> */}
                                <p>
                                    <span className="text-zinc-100">csgo achivements: </span>
                                    {profile?.playerstats?.achievements.length} of 167
                                </p>
                                <p>
                                    <span className="text-zinc-100">KD: </span>
                                    {(
                                        profile?.playerstats?.stats[0]?.value / profile?.playerstats?.stats[1]?.value
                                    ).toFixed(2)}
                                </p>
                                <p>
                                    <span className="text-zinc-100">HS: </span>
                                    {(
                                        profile?.playerstats?.stats[25]?.value / profile?.playerstats?.stats[0]?.value
                                    ).toFixed(2) * 100}
                                    %
                                </p>
                            </>
                        )}

                        <p>
                            <span className="text-zinc-100">Reason for adding: </span>
                            {profile.suspect_type === 'sus' ? 'Very suspicious' : 'Rage hacker'}
                        </p>
                    </div>
                    <div className="flex flex-col flex-grow max-w-xs gap-2 p-5 rounded bg-background-dark">
                        <div>
                            {profile.VACBanned && <p className="text-red-500 ">VAC BANNED</p>}
                            {profile.NumberOfGameBans > 0 && <p className="text-red-500">GAME BANNED</p>}
                            {profile.DaysSinceLastBan > 0 && (
                                <p className="text-red-500">{profile.DaysSinceLastBan} days ago</p>
                            )}
                        </div>
                        <p>Number of VAC bans: {profile.NumberOfVACBans}</p>
                        <p>Number of game bans: {profile.NumberOfGameBans}</p>
                        <p>{profile.DaysSinceLastBan ? '' : 'Not'} community banned</p>
                    </div>
                </div>
            )}
        </div>
    )
}
