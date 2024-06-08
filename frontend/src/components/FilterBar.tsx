'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const btnStyle = 'flex items-center min-h-full sm:px-5 px-3 py-2 sm:py-0 drop-shadow hover:text-white hover:bg-sky-500'

export default function FilterBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const filter = searchParams.get('filter')
  const [input, setInput] = useState(search ?? '')
  const router = useRouter()

  const handleClick = (filter: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('filter', filter)
    if (input === '') {
      url.searchParams.delete('search')
    } else {
      url.searchParams.set('search', input)
    }
    router.push(url.toString())
  }

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.delete('search')
    if (input === '') {
    } else {
      url.searchParams.set('search', input)
    }
    router.push(url.toString())
  }, [input])

  return (
    <nav className="flex flex-col justify-between w-full mx-auto my-4 overflow-hidden font-semibold rounded shadow max-w-7xl md:flex-row text-text-lighter bg-background-light">
      <div className="flex flex-col md:items-center md:flex-row">
        <Link href={'/'} className={`${btnStyle} ${!filter ? 'text-white bg-sky-500' : ''}`}>
          All
        </Link>
        <button
          onClick={() => handleClick('suspects')}
          className={`${btnStyle} ${filter === 'suspects' ? 'text-white bg-sky-500' : ''}`}
        >
          Suspects
        </button>
        <button
          onClick={() => handleClick('banned')}
          className={`${btnStyle} ${filter === 'banned' ? 'text-white bg-sky-500' : ''}`}
        >
          Banned
        </button>
        <button
          onClick={() => handleClick('vac-banned')}
          className={`${btnStyle} ${filter === 'vac-banned' ? 'text-white bg-sky-500' : ''}`}
        >
          Vac Banned
        </button>
        <button
          onClick={() => handleClick('game-banned')}
          className={`${btnStyle} ${filter === 'game-banned' ? 'text-white bg-sky-500' : ''}`}
        >
          Game Banned
        </button>
      </div>
      <div className="flex m-1.5 gap-2.5 sm:flex-row flex-col">
        <input
          className="px-4 py-2 md:py-0.5 rounded border-background bg-input-bg border-[1px]"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="search"
        />

        <Link href="/add-suspect">
          <div className="py-1.5 sm:px-5 px-3 text-green-700 rounded bg-green-300 drop-shadow text-center">
            Add Suspect
          </div>
        </Link>
      </div>
    </nav>
  )
}
