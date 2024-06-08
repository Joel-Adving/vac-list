import { pb } from '@/libs/pocketbase'
import { SteamProfile, SuspectType } from '@/types'
import { mapFullProfile } from '@/utils/dataMappers'

export const baseUrl =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_BASE_URL_DEV : process.env.NEXT_PUBLIC_BASE_URL_PROD

function revalidate(path: string) {
  return fetch(`${baseUrl}/api/revalidate?path=${path}`, { next: { revalidate: 0 } }).then((res) => res.json())
}

function getSuspect(steamId: string) {
  return fetch(`${baseUrl}/api/suspects/${steamId}`, { next: { tags: ['cache'] } }).then((res) =>
    res.json()
  ) as Promise<SuspectType>
}

function getSuspects() {
  return fetch(`${baseUrl}/api/suspects`, { next: { tags: ['cache'] } }).then((res) => res.json()) as Promise<
    SuspectType[]
  >
}

async function getSteamProfile(id: string[] | string) {
  const res = await fetch(`${baseUrl}/api/steam-profile/${id}`, { next: { tags: ['cache'] } }).then((res) => res.json())
  return res?.response?.players
}

async function getBanStatus(ids: string[] | string) {
  const res = await fetch(`${baseUrl}/api/ban-status/${ids}`, { next: { tags: ['cache'] } }).then((res) => res.json())
  return res?.players
}

function getCsStats(id: string[] | string) {
  return fetch(`${baseUrl}/api/cs-stats/${id}`, { next: { tags: ['cache'] } }).then((res) => res.json())
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
    ...(steamProfiles?.[0] || {}),
    ...(banStatus?.[0] || {}),
    ...csStats
  }) as SteamProfile & SuspectType
}

async function getProfiles() {
  const suspects = await getSuspects()
  const ids = suspects.map((suspect: SuspectType) => suspect.steam_id)
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

export const api = {
  getSuspect,
  getSteamProfile,
  getBanStatus,
  getCsStats,
  getProfile,
  getProfiles,
  getSuspects,
  revalidate
}
