import React from 'react'
import Link from 'next/link'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'

export default function Header() {
    const { user, signin, logout } = useAuth()
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    return (
        <header className="p-6 bg-background-dark">
            <nav className="flex items-center justify-between w-full max-w-5xl mx-auto ">
                <div>
                    <Link href="/">
                        <h2 className="text-3xl font-bold cursor-pointer text-text">VAC TRACKER</h2>
                    </Link>
                    <a className="text-highlight" href="https://steamcommunity.com/id/jjooeell11">
                        created by _Oki
                    </a>
                </div>
                {!user && (
                    <button className="px-3 py-[3px] text-sm text-white bg-green-bg" onClick={() => signin()}>
                        Sign in
                    </button>
                )}
                {user && (
                    <div className="flex items-center bg-background">
                        <img
                            className="border-r-2 border-highlight w-7 h-7"
                            src={user.photoURL}
                            alt="User profile image"
                        />
                        <h3 className="mx-3 text-md text-highlight">{user.name}</h3>
                        <button className="px-4 py-[3px] text-sm text-white bg-green-bg" onClick={handleLogout}>
                            Sign Out
                        </button>
                    </div>
                )}
            </nav>
        </header>
    )
}
