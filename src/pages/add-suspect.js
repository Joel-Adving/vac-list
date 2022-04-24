import React, { useState } from 'react'
import { getJSON } from '../util/helpers'
import { collection, setDoc, serverTimestamp, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { API } from '../util/config'
import { useSession } from 'next-auth/react'

export default function add() {
    const [formInput, setFormInput] = useState('')
    const [steamId, setSteamId] = useState('')
    const { data: session } = useSession()

    const handleSubmit = async e => {
        e.preventDefault()
        const url = formInput.trim()
        let id
        if (!url.startsWith('https://steamcommunity.com/')) return
        if (url.endsWith('/')) id = url.slice(0, -1).split('/').at(-1)
        else id = url.split('/').at(-1)

        if (id > 16 && !Number.isNaN(+id)) {
            const docRef = await addDoc(collection(db, 'steam-profiles', id), {
                created: serverTimestamp(),
                added_by: { name: session.user.name, email: session.user.email },
                rageHack: true,
                sus: null,
            })
        } else {
            const steam64BitId = await getJSON(`${API}/vanityurl/${id}`)
            const docRef = await addDoc(collection(db, 'steam-profiles', steam64BitId), {
                created: serverTimestamp(),
                added_by: session.user.email,
                rageHack: false,
                sus: true,
            })
        }

        // const dataProfile = await getJSON(`${API}/profile/${id}`)
        // const dataBanStatus = await getJSON(`${API}/gamebans/${id}`)
        // console.log({ ...dataProfile.response.players[0], ...dataBanStatus.players[0] })
    }

    return (
        <div className="grid w-full max-w-5xl mx-auto place-content-center">
            <form className="flex flex-col max-w-2xl p-4 mt-10 text-text bg-background" onSubmit={handleSubmit}>
                <h1 className="mb-6 text-2xl">Add a suspected cheater</h1>
                <h3>Steam profile URL</h3>

                <input
                    className="p-1 mt-2 mb-6 text-black"
                    type="text"
                    value={formInput}
                    onChange={e => setFormInput(e.target.value)}
                />
                <button className="p-2 text-white bg-highlight">submit</button>
            </form>
        </div>
    )
}
