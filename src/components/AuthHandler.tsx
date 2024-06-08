'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '@/libs/firebase/config'
import { useAtom } from 'jotai'
import { userAtom } from '@/store'

export default function AuthHandler() {
  const [_, setUser] = useAtom(userAtom)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          photoURL: getAuth().currentUser?.photoURL ?? '',
          name: getAuth().currentUser?.displayName ?? ''
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return null
}
