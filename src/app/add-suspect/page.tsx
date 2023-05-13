'use client'

import React, { useState } from 'react'
import { getJSON } from '@/utils/helpers'
import { setDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase/config'
import Select from 'react-select'
import { useSetRecoilState } from 'recoil'
import { steamProfilesState } from '@/atoms/steamProfilesAtom'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { filterByState } from '@/atoms/filterByAtom'
import { useAuth } from '@/context/AuthContext'

export const suspectOptions = [
  { value: 'sus', label: 'Sussy player' },
  { value: 'rageHack', label: 'Rager hacker' }
]

export default function Add() {
  const [formInput, setFormInput] = useState('')
  const [suspectType, setSuspectType] = useState<any>(null)
  const { user, signin } = useAuth()
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const setSteamProfiles = useSetRecoilState(steamProfilesState)
  const setFilter = useSetRecoilState(filterByState)
  const router = useRouter()

  const formReset = () => {
    setLoading(false)
    setFormInput('')
    setSuspectType(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    const url = formInput.trim()
    let id: any

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
        suspect_type: suspectType?.value ?? 'sus',
        added_by: {
          uid: user.uid,
          email: user.email,
          photoURL: getAuth().currentUser?.photoURL,
          name: getAuth().currentUser?.displayName
        }
      })
      formReset()
      setSteamProfiles([])
      setFilter('all')
      router.push('/')
    } else {
      setLoading(true)
      const res = await getJSON(`${process.env.NEXT_PUBLIC_STEAM_API_URL}/vanityurl/${id}`)
      const docSnap = await getDoc(doc(db, 'steam-profiles', res.response.steamid))

      if (docSnap.exists()) {
        formReset()
        setFormError('User already in database')
        return
      }
      const docRef = doc(db, 'steam-profiles', res.response.steamid)
      await setDoc(docRef, {
        created: serverTimestamp(),
        added_by: {
          uid: user.uid,
          email: user.email,
          photoURL: getAuth().currentUser?.photoURL,
          name: getAuth().currentUser?.displayName
        },
        suspect_type: suspectType?.value ?? 'sus'
      })
      formReset()
      setSteamProfiles([])
      setFilter('all')
      router.push('/')
    }
  }

  return user ? (
    <div className="grid place-content-center">
      <form className="flex flex-col w-screen max-w-xl mt-10 shadow p-7 text-text bg-background" onSubmit={handleSubmit}>
        <h1 className="mb-6 text-3xl font-semibold">Add Suspected Cheater</h1>
        <h3>Steam profile URL</h3>

        <input
          required
          className="p-1 mt-1 mb-3 text-black rounded"
          type="text"
          value={formInput}
          onChange={(e) => setFormInput(e.target.value)}
        />

        <h3>Type of suspect</h3>
        <Select
          className="mt-1 mb-6 text-black"
          options={suspectOptions}
          value={suspectType}
          onChange={(option) => setSuspectType(option)}
          placeholder={`Select type`}
        />
        {formError && <span className="mb-3 text-xl text-center text-highlight">{formError}</span>}
        {!loading && (
          <button className="p-2 my-4 font-semibold text-white shadow bg-highlight hover:bg-sky-500">SUBMIT</button>
        )}
        {loading && (
          <button disabled className="p-2 my-4 font-semibold text-white shadow bg-highlight hover:bg-sky-500">
            Loading...
          </button>
        )}
      </form>
    </div>
  ) : (
    <div className="grid place-content-center h-[70vh] gap-6">
      <h1 className="text-3xl text-white ">Sign in to add a suspect</h1>
      <button className="px-6 py-2 mx-auto text-sm text-white bg-green-bg w-fit" onClick={() => signin()}>
        Sign in
      </button>
    </div>
  )
}
