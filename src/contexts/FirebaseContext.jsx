import { createContext, useCallback, useContext } from 'react'
import firebase from 'firebase'

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

const FirebaseContext = createContext(null)

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext)
  if (!context) throw Error('Cannot use context outside provider')
  const { user, signIn, signOut } = context

  return { user, signIn, signOut }
}

export const FirebaseProvider = ({ children }) => {
  const [user] = useAuthState(auth)

  const signIn = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  })

  const signOut = useCallback(() => auth.signOut(), [])

  return (
    <FirebaseContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </FirebaseContext.Provider>
  )
}
