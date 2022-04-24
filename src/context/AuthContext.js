import { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { auth } from '../firebase/config'

export const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isPending, setisPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    photoURL: getAuth().currentUser.photoURL,
                    name: getAuth().currentUser.displayName,
                    // displayName: user.displayName,
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signin = async () => {
        try {
            const google_provider = new GoogleAuthProvider()
            setisPending(true)
            setError(null)
            await signInWithPopup(auth, google_provider)
        } catch (err) {
            setError(err.message)
        } finally {
            setisPending(false)
        }
    }

    const logout = async () => {
        try {
            setUser(null)
            await signOut(auth)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user, signin, logout, error, isPending }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
