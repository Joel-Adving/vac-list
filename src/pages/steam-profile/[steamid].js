import { useRouter } from 'next/router'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { getBanStatus, getCsgoStats, getSteamProfiles } from '../../util/helpers'
import { db } from '../../firebase/config'
import { timeAgo } from '../../util/timeAgo'
import countries from 'i18n-iso-countries'
import Modal from '../../components/Modal'
import { steamProfilesState } from '../../atoms/steamProfilesAtom'
import { filterByState } from '../../atoms/filterByAtom'
import { useRecoilState } from 'recoil'
import { useAuth } from '../../hooks/useAuth'
import Image from 'next/image'

countries.registerLocale(require('i18n-iso-countries/langs/en.json'))

export default function SteamProfile() {
  const router = useRouter()
  const { steamid } = router.query
  const [profile, setProfile] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [steamProfiles, setSteamProfiles] = useRecoilState(steamProfilesState)
  const [filter, setFilter] = useRecoilState(filterByState)
  const { user } = useAuth()
  const [showDel, setshowDel] = useState(false)

  useEffect(() => {
    if (!steamid) return
    getProfile()
  }, [user])

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
      ...banStatus[0]
    }
    setProfile(merged)
    setshowDel(user?.uid === dbProfile.added_by.uid || user?.uid === 'ZwA7YpCdqmNa7N5bozjhAjUiJMC2')
  }

  const handleDelete = async () => {
    if (!showDel) return
    const docRef = doc(db, `/steam-profiles/${steamid}`)
    await deleteDoc(docRef)
    setShowModal(!showModal)
    setSteamProfiles([])
    setFilter('all')
    router.push('/')
  }

  return (
    <div className="flex flex-col w-full max-w-5xl min-h-screen p-4 mx-auto bg-gray-800 text-stone-400">
      {showModal && (
        <Modal
          text={'Are you sure you want to remove the suspect?'}
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
        />
      )}
      {profile && (
        <div className="flex flex-col gap-3 md:flex-row max-w">
          <div className="flex flex-col flex-grow mt-1 ml-1 sm:p-1.5 sm:flex-row  max-w-[655px]">
            <Image
              width={150}
              height={150}
              priority
              className="border-[2px] border-stone-500"
              src={profile.avatarfull}
              alt="avatar"
            />
            <div className="flex flex-col sm:ml-5">
              <div>
                <h2 className="my-5 mr-3 text-2xl sm:my-0 sm:mt-1 text-zinc-100">{profile.personaname}</h2>
                <div className="flex items-center text-sm ">
                  <p>{profile?.realname ?? ''}</p>
                  {profile.loccountrycode && (
                    <>
                      <Image
                        priority
                        width={12}
                        height={12}
                        className="h-3 mr-1 mt-[1.5x]"
                        alt="United States"
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${profile.loccountrycode}.svg`}
                      />
                      <p> {countries.getName(profile.loccountrycode, 'en')}</p>
                    </>
                  )}
                </div>
              </div>
              <a href={profile.profileurl} className="text-sm break-words sm:mt-11">
                {profile.profileurl}
              </a>
            </div>
          </div>
          <div className="flex items-center flex-grow max-w-sm pl-1 mt-1 md:pt-4 md:items-start md:flex-col text-zinc-100 ">
            <div className="flex items-center md:mb-3 max-w-max">
              <h3 className="mr-2 text-md">{profile.added_by.name.split(' ')[0]}</h3>
              <Image
                priority
                width={36}
                height={36}
                className="w-9 h-9 rounded-full border-2 p-[1px] border-red-500 mr-2"
                src={profile.added_by.photoURL}
                alt="User profile image"
              />
            </div>
            <p className="text-sm text-zinc-500">Submitted {timeAgo.format(new Date(profile.created.seconds * 1000))}</p>
          </div>
        </div>
      )}
      {profile && (
        <div className="flex flex-col-reverse gap-3 mt-7 sm:flex-row">
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
                  {(profile?.playerstats?.stats[0]?.value / profile?.playerstats?.stats[1]?.value).toFixed(2)}
                </p>
                <p>
                  <span className="text-zinc-100">HS: </span>
                  {(profile?.playerstats?.stats[25]?.value / profile?.playerstats?.stats[0]?.value).toFixed(2) * 100}%
                </p>
              </>
            )}

            <p>
              <span className="text-zinc-100">Reason for adding: </span>
              {profile.suspect_type === 'sus' ? 'Very suspicious' : 'Rage hacker'}
            </p>

            {showDel && (
              <button
                className="p-2 mt-3 text-zinc-100 border-[1px] border-zinc-100"
                onClick={() => setShowModal(!showModal)}
              >
                Remove Suspect
              </button>
            )}
          </div>
          <div className="flex flex-col flex-grow max-w-xs min-w-full gap-2 p-5 rounded sm:min-w-0 bg-background-dark">
            <div>
              {profile.VACBanned && <p className="text-red-500 ">VAC BANNED</p>}
              {profile.NumberOfGameBans > 0 && <p className="text-red-500">GAME BANNED</p>}
              {profile.DaysSinceLastBan > 0 && <p className="text-red-500">{profile.DaysSinceLastBan} days ago</p>}
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
