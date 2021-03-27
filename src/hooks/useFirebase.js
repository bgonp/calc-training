import firebase from 'firebase'
import { useCallback } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID
})

const auth = firebase.auth()
const firestore = firebase.firestore()

const useFirebase = () => {
  const [user] = useAuthState(auth)

  const signIn = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  })

  const signOut = useCallback(() => auth.signOut(), [])

  return {
    user,
    signIn,
    signOut
  }
}

export default useFirebase
