'use client'

import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { useCallback } from 'react'
import { useContext } from 'react'

type AuthContextType = {
  user: any
  signin: () => void
  logout: () => void
  error: any
  isPending: boolean
}

export const AuthContext = createContext({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isPending, setisPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          photoURL: getAuth().currentUser?.photoURL,
          name: getAuth().currentUser?.displayName
          // displayName: user.displayName,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signin = useCallback(async () => {
    try {
      const google_provider = new GoogleAuthProvider()
      setisPending(true)
      setError(null)
      await signInWithPopup(auth, google_provider)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setisPending(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      setUser(null)
      await signOut(auth)
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signin, logout, error, isPending }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
