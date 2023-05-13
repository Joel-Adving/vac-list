'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const { user, signin, logout } = useAuth()

  return (
    <header className="p-6 bg-background-dark">
      <nav className="flex items-center justify-between w-full max-w-5xl mx-auto ">
        <div>
          <Link href="/" passHref>
            <h2 className="text-2xl font-bold cursor-pointer text-text">VAC TRACKER</h2>
          </Link>
          <a className="text-highlight" href="https://steamcommunity.com/id/jjooeell11">
            created by Oki
          </a>
        </div>

        {user ? (
          <div className="flex flex-col sm:flex-row">
            <div className="flex items-center bg-background">
              <Image
                priority
                width={40}
                height={40}
                className="border-r-2 border-highlight w-7 h-7"
                src={user.photoURL}
                alt="User profile image"
              />
              <h3 className="mx-3 text-md text-highlight">{user.name}</h3>
            </div>
            <button className="px-4 py-[3px] text-sm text-white bg-green-bg min-w-max" onClick={() => logout()}>
              Sign Out
            </button>
          </div>
        ) : (
          <button className="px-3 py-[3px] text-sm text-white bg-green-bg" onClick={() => signin()}>
            Sign in
          </button>
        )}
      </nav>
    </header>
  )
}
