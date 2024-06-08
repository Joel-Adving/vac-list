'use client'
import React, { useState } from 'react'
import Select from 'react-select'
import { getAuth } from 'firebase/auth'
import { useUser } from '@/hooks/useUser'
import { signIn } from '@/libs/firebase/auth'
import { baseUrl, api } from '@/services/api'
import { revalidatePath, revalidateTag } from 'next/cache'
import { useRouter } from 'next/navigation'
import { useAtom } from 'jotai'
import { needsReloadAtom } from '@/store'

type SuspectType = {
  value: 'suspicous' | 'cheater' | 'rage'
  label: 'Suspected Cheater' | 'Cheater' | 'Rage Cheater'
}

const suspectOptions = [
  { value: 'suspicous', label: 'Suspected Cheater' },
  { value: 'cheater', label: 'Cheater' },
  { value: 'rage', label: 'Rage Cheater' }
] as const

export default function Add() {
  const [formInput, setFormInput] = useState('')
  const [suspectType, setSuspectType] = useState<SuspectType | null>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const user = useUser()
  const [_, setNeedsReload] = useAtom(needsReloadAtom)

  const formReset = () => {
    setLoading(false)
    setMessage('')
    setFormInput('')
    setSuspectType(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    formReset()
    setLoading(true)

    let steamId = formInput.trim()
    if (steamId.length < 16 && Number.isNaN(+steamId)) {
      const data = await fetch(`${baseUrl}/api/vanityurl/${steamId}`).then((res) => res.json())
      if (data.response.success === 1) {
        steamId = data.response.steamid
      } else {
        formReset()
        setMessage('Invalid steam id')
        return
      }
    }

    const suspect = await api.getSuspect(steamId)
    if (suspect && !suspect.error) {
      formReset()
      setMessage('User already in database')
      return
    }

    const reqData = {
      steam_id: steamId,
      suspect_type: suspectType?.value ?? 'suspicous',
      added_by: {
        uid: user?.uid ?? '',
        email: user?.email ?? '',
        photoURL: getAuth().currentUser?.photoURL ?? '',
        name: getAuth().currentUser?.displayName ?? ''
      },
      created: {
        seconds: +Number(Date.now() / 1000).toFixed(),
        nanoseconds: 0
      }
    }

    await fetch(`${baseUrl}/api/suspects/${steamId}`, {
      method: 'POST',
      body: JSON.stringify(reqData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await api.revalidate('/')
    await fetch(`${baseUrl}/`)
    setNeedsReload((prev) => [...prev, '/'])
    formReset()
    setMessage('Suspect added')
  }

  if (!user) {
    return (
      <div className="grid place-content-center h-[70vh] gap-6">
        <h1 className="text-3xl text-white ">Sign in to add a suspect</h1>
        <button className="px-6 py-2 mx-auto text-sm text-white bg-green-bg w-fit" onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    )
  }

  return (
    <div className="flex p-6">
      <form
        className="flex flex-col w-full max-w-md p-6 mx-auto mt-6 rounded shadow text-text bg-background"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-xl font-semibold">Add Suspect</h1>
        <h3>Steam ID</h3>
        <input
          required
          className="px-2.5 py-1.5 mt-1 mb-3 text-black rounded"
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
          required
        />
        {message && <span className="mb-3 text-xl text-center text-highlight">{message}</span>}
        <button
          disabled={loading}
          className="p-2 my-4 font-semibold text-white rounded shadow hover:bg-highlight bg-sky-500"
        >
          {loading ? 'Loading...' : 'Add Suspect'}
        </button>
      </form>
    </div>
  )
}
