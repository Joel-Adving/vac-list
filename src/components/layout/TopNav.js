import React from 'react'

export default function TopNav() {
    return (
        <nav className="flex flex-col items-center justify-between w-full max-w-5xl p-1 mx-auto my-10 font-semibold shadow md:flex-row bg-s text-text-lighter bg-background-light">
            <div className="flex flex-col md:flex-row">
                <a href="#" className="px-2 drop-shadow">
                    Din Butik
                </a>
                <a href="#" className="px-2 drop-shadow">
                    Bytt och intressant
                </a>
                <a href="#" className="px-2 drop-shadow">
                    Kategorier
                </a>
                <a href="#" className="px-2 drop-shadow">
                    Poängbutiken
                </a>
                <a href="#" className="px-2 drop-shadow">
                    Nyheter
                </a>
                <a href="#" className="px-2 drop-shadow">
                    Labs
                </a>
            </div>
            <input
                className="px-4 py-0.5 rounded-sm border-background bg-input-bg border-[1px]"
                type="text"
                placeholder="search"
            />
        </nav>
    )
}
