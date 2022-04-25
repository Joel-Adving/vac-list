import React, { useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { useRecoilState } from 'recoil'
import { filterByState } from '../../atoms/filterByAtom'
import { searchUserNameState } from '../../atoms/searchUsernameAtom'

export default function TopNav() {
    const { user } = useAuth()
    const [filter, setFilter] = useRecoilState(filterByState)
    const [searchUserName, setSearchUserName] = useRecoilState(searchUserNameState)

    return (
        <nav className="flex flex-col justify-between w-full max-w-5xl mx-auto my-10 font-semibold shadow-xl md:flex-row text-text-lighter bg-background-light">
            <div className="flex flex-col md:items-center md:flex-row">
                <button
                    onClick={() => setFilter('all')}
                    className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700"
                >
                    Show All
                </button>
                <button
                    onClick={() => setFilter('banned')}
                    className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700"
                >
                    Banned
                </button>
                <button
                    onClick={() => setFilter('suspects')}
                    className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700"
                >
                    Suspects
                </button>
                <button
                    onClick={() => setFilter('vac banned')}
                    className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700"
                >
                    Vac Banned
                </button>
                <button
                    onClick={() => setFilter('game banned')}
                    className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700"
                >
                    Game Banned
                </button>

                {user && (
                    <Link href="/add-suspect">
                        <a className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700">Add Suspect</a>
                    </Link>
                )}
            </div>
            <input
                className="px-4 py-0.5 rounded-sm border-background bg-input-bg border-[1px] m-1"
                type="text"
                value={searchUserName}
                onChange={e => setSearchUserName(e.target.value)}
                placeholder="search"
            />
        </nav>
    )
}
