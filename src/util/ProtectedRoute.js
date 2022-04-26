import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRouter } from 'next/router'

export default function ProtectedRoute({ children }) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user) router.push('/')
    }, [user, router])

    return <div>{user && children}</div>
}
