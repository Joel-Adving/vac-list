import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './config'

export async function signIn() {
  try {
    const google_provider = new GoogleAuthProvider()
    await signInWithPopup(auth, google_provider)
  } catch (err: any) {
    console.log(err.message)
  }
}

export async function signOut() {
  try {
    await auth.signOut()
  } catch (err: any) {
    console.log(err.message)
  }
}
