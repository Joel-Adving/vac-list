'use client'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from '@/libs/firebase/config'
import { setUser } from '@/libs/redux/slices/userSlice'
import { useDispatch } from 'react-redux'

export default function AuthHandler() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            photoURL: getAuth().currentUser?.photoURL ?? '',
            name: getAuth().currentUser?.displayName ?? ''
          })
        )
      } else {
        dispatch(setUser(null))
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return null
}
