import { SteamProfile, SuspectType } from '@/types'
import { mapFullProfile } from '@/utils/dataMappers'

export const baseUrl =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_BASE_URL_DEV : process.env.NEXT_PUBLIC_BASE_URL_PROD

function revalidate(path: string) {
  return fetch(`${baseUrl}/api/revalidate?path=${path}`).then((res) => res.json())
}

function getSuspect(id: string) {
  return fetch(`${baseUrl}/api/suspects/${id}`).then((res) => res.json())
}

function getSuspects() {
  return fetch(`${baseUrl}/api/suspects`).then((res) => res.json())
}

async function getSteamProfile(id: string[] | string) {
  const res = await fetch(`${baseUrl}/api/steam-profile/${id}`).then((res) => res.json())
  return res.response.players
}

async function getBanStatus(ids: string[] | string) {
  const res = await fetch(`${baseUrl}/api/ban-status/${ids}`).then((res) => res.json())
  return res.players
}

function getCsStats(id: string[] | string) {
  return fetch(`${baseUrl}/api/cs-stats/${id}`).then((res) => res.json())
}

async function getProfile(steamId: string) {
  const [suspect, steamProfiles, banStatus, csStats] = await Promise.all([
    getSuspect(steamId),
    getSteamProfile(steamId),
    getBanStatus(steamId),
    getCsStats(steamId)
  ])
  return mapFullProfile({
    ...suspect,
    ...steamProfiles[0],
    ...banStatus[0],
    ...csStats
  }) as SteamProfile & SuspectType
}

async function getProfiles() {
  const suspects = await getSuspects()
  const ids = suspects.map((suspect: SuspectType) => suspect.steam_id)
  if (!ids) {
    throw new Error('No ids found')
  }
  const [steamProfiles, banStatus] = await Promise.all([getSteamProfile(ids), getBanStatus(ids)])
  const profiles = suspects.map((suspect: SuspectType) => {
    return mapFullProfile({
      ...suspect,
      ...steamProfiles.find((profile: any) => profile.steamid === suspect.steam_id),
      ...banStatus.find((profile: any) => profile.SteamId === suspect.steam_id)
    }) as SteamProfile & SuspectType
  })
  return profiles
}

function getSavedSteamProfiles() {
  return fetch(`${baseUrl}/api/saved-steam-profiles`).then((res) => res.json())
}

export const api = {
  getSuspect,
  getSteamProfile,
  getBanStatus,
  getCsStats,
  getProfile,
  getProfiles,
  getSavedSteamProfiles,
  getSuspects,
  revalidate
}
