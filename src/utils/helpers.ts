import { env } from './env'

const { NEXT_PUBLIC_STEAM_API_URL: API_URL } = env

export const getJSON = async function (url: string) {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const getSteamProfiles = async function (id: string[] | string) {
  const res = await getJSON(`${API_URL}/profile/${id}`)
  return res.response.players
}

export const getBanStatus = async function (ids: string[] | string) {
  const res = await getJSON(`${API_URL}/gamebans/${ids}`)
  return res.players
}

export const getCsgoStats = async function (id: string[] | string) {
  const res = await getJSON(`${API_URL}/csgostats/${id}`)
  return res
}
