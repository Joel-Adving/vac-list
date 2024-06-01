'use client'

import React from 'react'
import Link from 'next/link'
import { useFilterState } from '@/libs/redux/slices/filterSlice'
import { useSearchState } from '@/libs/redux/slices/searchSlice'

export default function TopNav() {
  const [_, setFilter] = useFilterState()
  const [searchUserName, setSearchUserName] = useSearchState()

  return (
    <nav className="flex flex-col justify-between w-full max-w-5xl mx-auto font-semibold rounded-sm shadow-lg md:my-10 md:flex-row text-text-lighter bg-background-light">
      <div className="flex flex-col md:items-center md:flex-row">
        <button
          onClick={() => setFilter('all')}
          className="flex items-center min-h-full px-2 py-2 md:pl-4 md:py-0 drop-shadow hover:bg-sky-700"
        >
          All
        </button>
        <button
          onClick={() => setFilter('banned')}
          className="flex items-center min-h-full px-2 py-2 md:py-0 drop-shadow hover:bg-sky-700"
        >
          Banned
        </button>
        <button
          onClick={() => setFilter('suspects')}
          className="flex items-center min-h-full px-2 py-2 md:py-0 drop-shadow hover:bg-sky-700"
        >
          Suspects
        </button>
        <button
          onClick={() => setFilter('vac banned')}
          className="flex items-center min-h-full px-2 py-2 md:py-0 drop-shadow hover:bg-sky-700"
        >
          Vac Banned
        </button>
        <button
          onClick={() => setFilter('game banned')}
          className="flex items-center min-h-full px-2 py-2 md:py-0 drop-shadow hover:bg-sky-700"
        >
          Game Banned
        </button>

        <Link
          href="/add"
          className="flex items-center min-h-full px-2 py-2 font-normal text-sky-200 bg-sky-700 md:py-0 drop-shadow hover:bg-sky-600"
        >
          Add Suspect
        </Link>
      </div>
      <input
        className="px-4 py-2 md:py-0.5 rounded-sm border-background bg-input-bg border-[1px] m-1"
        type="text"
        value={searchUserName}
        onChange={(e) => setSearchUserName(e.target.value)}
        placeholder="search"
      />
    </nav>
  )
}
