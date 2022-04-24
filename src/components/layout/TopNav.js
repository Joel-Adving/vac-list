import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function TopNav() {
    const { data: session } = useSession()
    return (
        <nav className="flex flex-col justify-between w-full max-w-5xl mx-auto my-10 font-semibold shadow md:flex-row text-text-lighter bg-background-light">
            <div className="flex flex-col items-center md:flex-row">
                <Link href="#">
                    <a className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700">Show All</a>
                </Link>
                <Link href="#">
                    <a className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700">Banned</a>
                </Link>
                <Link href="#">
                    <a className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700">Suspects</a>
                </Link>
                <Link href="#">
                    <a className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700">Vac Banned</a>
                </Link>
                <Link href="#">
                    <a className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700">Game Banned</a>
                </Link>
                {session && (
                    <Link href="/add-suspect">
                        <a className="flex items-center min-h-full px-2 drop-shadow hover:bg-sky-700">Add Suspect</a>
                    </Link>
                )}
            </div>
            <input
                className="px-4 py-0.5 rounded-sm border-background bg-input-bg border-[1px] m-1"
                type="text"
                placeholder="search"
            />
        </nav>
    )
}
