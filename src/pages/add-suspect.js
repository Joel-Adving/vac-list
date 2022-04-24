import React, { useState } from 'react'
import { getJSON } from '../util/helpers'
import { setDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { API } from '../util/config'
import { useAuth } from '../hooks/useAuth'
import Select from 'react-select'

export const suspectOptions = [
    { value: 'sus', label: 'Sussy player' },
    { value: 'rageHack', label: 'Rager hacker' },
]

export default function add() {
    const [formInput, setFormInput] = useState('')
    const [suspectType, setSuspectType] = useState(null)
    const { user } = useAuth()
    const [formError, setFormError] = useState('')
    const [loading, setLoading] = useState(false)

    const formReset = () => {
        setLoading(false)
        setFormInput('')
        setSuspectType(null)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setFormError('')
        const url = formInput.trim()
        let id
        if (!url.startsWith('https://steamcommunity.com/')) {
            formReset()
            setFormError('Wrong steam profile url format, must start with https://steamcommunity.com/')
            return
        }
        if (url.endsWith('/')) id = url.slice(0, -1).split('/').at(-1)
        else id = url.split('/').at(-1)

        if (id > 16 && !Number.isNaN(+id)) {
            setLoading(true)
            const docSnap = await getDoc(doc(db, 'steam-profiles', id))
            if (docSnap.exists()) {
                formReset()
                setFormError('User already in database')
                return
            }
            const docRef = doc(db, 'steam-profiles', id)
            await setDoc(docRef, {
                created: serverTimestamp(),
                added_by: user.uid,
                suspect_type: suspectType.value,
            })
            formReset()
        } else {
            setLoading(true)
            const res = await getJSON(`${API}/vanityurl/${id}`)
            const docSnap = await getDoc(doc(db, 'steam-profiles', res.response.steamid))
            if (docSnap.exists()) {
                formReset
                setFormError('User already in database')
                return
            }
            const docRef = doc(db, 'steam-profiles', res.response.steamid)
            await setDoc(docRef, {
                created: serverTimestamp(),
                added_by: user.uid,
                suspect_type: suspectType.value,
            })
            formReset()
        }
    }

    return (
        <div className="grid place-content-center">
            <form
                className="flex flex-col w-screen max-w-xl mt-10 shadow p-7 text-text bg-background"
                onSubmit={handleSubmit}
            >
                <h1 className="mb-6 text-3xl font-semibold">Add Suspected Cheater</h1>
                <h3>Steam profile URL</h3>

                <input
                    required
                    className="p-1 mt-1 mb-3 text-black rounded"
                    type="text"
                    value={formInput}
                    onChange={e => setFormInput(e.target.value)}
                />

                <h3>Type of suspect</h3>
                <Select
                    className="mt-1 mb-6 text-black"
                    options={suspectOptions}
                    value={suspectType}
                    onChange={option => setSuspectType(option)}
                    placeholder={`Select type`}
                />
                {formError && <span className="mb-3 text-xl text-center text-highlight">{formError}</span>}
                {!loading && (
                    <button className="p-2 my-4 font-semibold text-white shadow bg-highlight hover:bg-sky-500">
                        SUBMIT
                    </button>
                )}
                {loading && (
                    <button disabled className="p-2 my-4 font-semibold text-white shadow bg-highlight hover:bg-sky-500">
                        Loading...
                    </button>
                )}
            </form>
        </div>
    )
}
