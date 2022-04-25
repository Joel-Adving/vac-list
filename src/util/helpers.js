import { API } from './config'

export const getJSON = async function (url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (err) {
        console.log(err)
    }
}

export const getSteamProfiles = async function (id) {
    const res = await getJSON(`${API}/profile/${id}`)
    return res.response.players
}

export const getBanStatus = async function (ids) {
    const res = await getJSON(`${API}/gamebans/${ids}`)
    return res.players
}

export const getCsgoStats = async function (id) {
    const res = await getJSON(`${API}/csgostats/${id}`)
    return res
}
