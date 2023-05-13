const API_URL = process.env.NEXT_PUBLIC_STEAM_API_URL

export const getJSON = async function (url: string) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
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
