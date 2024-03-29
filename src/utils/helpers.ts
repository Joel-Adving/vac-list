import axios from 'axios'

export const getJSON = async function (url: string) {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (e) {
    console.log(e)
  }
}

export const getSteamProfiles = async function (id: string[] | string) {
  const res = await getJSON(`/api/profile/${id}`)
  return res.response.players
}

export const getBanStatus = async function (ids: string[] | string) {
  const res = await getJSON(`/api/gamebans/${ids}`)
  return res.players
}

export const getCsgoStats = async function (id: string[] | string) {
  const res = await getJSON(`/api/csgostats/${id}`)
  return res
}
