'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@/hooks/useUser'
import { signIn, signOut } from '@/libs/firebase/auth'

export default function Header() {
  const user = useUser()

  return (
    <header className="p-2 px-4 bg-background-dark">
      <nav className="flex items-center justify-between w-full mx-auto max-w-7xl ">
        <div className="flex flex-col">
          <Link href="/" className="text-xl font-bold cursor-pointer text-text">
            VAC TRACKER
          </Link>
          <Link className="text-sm text-highlight" href="https://steamcommunity.com/id/jjooeell11">
            created by Oki
          </Link>
        </div>

        {user ? (
          <div className="flex flex-col overflow-hidden rounded-sm sm:flex-row">
            <div className="flex items-center bg-background">
              <Image
                priority
                width={40}
                height={40}
                className="border-r-2 border-highlight w-7 h-7"
                src={user?.photoURL ?? ''}
                alt="User profile image"
              />
              <h3 className="mx-3 text-md text-highlight">{user?.name}</h3>
            </div>
            <button className="px-4 py-[3px] text-sm text-white bg-green-bg min-w-max" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
        ) : (
          <button className="px-3 py-[3px] text-sm text-white bg-green-bg" onClick={() => signIn()}>
            Sign in
          </button>
        )}
      </nav>
    </header>
  )
}
