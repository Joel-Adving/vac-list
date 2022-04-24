import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Header() {
    const { data: session } = useSession()
    const router = useRouter()

    return (
        <header className="p-10 bg-background-dark">
            <nav className="flex items-center justify-between w-full max-w-5xl mx-auto ">
                <Link href="/">
                    <h2 className="text-3xl font-bold cursor-pointer text-text">VAC LIST</h2>
                </Link>
                {!session && (
                    <button
                        className="px-3 py-[3px] text-sm text-white bg-green-bg"
                        onClick={() => router.push('/auth/signin')}
                    >
                        Sign in
                    </button>
                )}
                {session && (
                    <div className="flex items-center bg-background">
                        <img
                            className="border-r-2 border-highlight w-7 h-7"
                            src={session?.user.image}
                            alt="User profile image"
                        />
                        <h3 className="mx-3 text-md text-highlight">{session?.user.name}</h3>
                        <button className="px-4 py-[3px] text-sm text-white bg-green-bg" onClick={() => signOut()}>
                            Sign Out
                        </button>
                    </div>
                )}
            </nav>
        </header>
    )
}
