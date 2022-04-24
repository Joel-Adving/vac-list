import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
    const { data: session } = useSession()

    return (
        <header className="p-10 bg-background-dark">
            <nav className="flex items-center justify-between w-full max-w-5xl mx-auto ">
                <h2 className="text-3xl font-bold text-text">VAC LIST</h2>
                {!session && (
                    <button className="px-3 py-[3px] text-sm text-white bg-green-bg" onClick={() => signIn()}>
                        Sign in
                    </button>
                )}
                {session && (
                    <button className="px-3 py-[3px] text-sm text-white bg-green-bg" onClick={() => signOut()}>
                        Sign Out
                    </button>
                )}
            </nav>
        </header>
    )
}
