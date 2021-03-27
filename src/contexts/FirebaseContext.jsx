import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import firebase from 'firebase'

import { useAuthState } from 'react-firebase-hooks/auth'

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
const attempts = firestore.collection('attempts')

const FirebaseContext = createContext(null)

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext)
  if (!context) throw Error('Cannot use context outside provider')

  return context
}

export const FirebaseProvider = ({ children }) => {
  const [user] = useAuthState(auth)
  const [attempt, setAttempt] = useState({})

  const signIn = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  })

  const signOut = useCallback(() => auth.signOut(), [])

  const setStart = async (numbers) => {
    setAttempt({
      numbers,
      start: new Date()
    })
  }

  const setEnd = () => {
    if (!user || !attempt.id) return
    attempts.doc(attempt.id).update({ end: new Date() })
  }

  const setSuccess = (success) => {
    if (!user || !attempt.id) return
    attempts.doc(attempt.id).update({ success })
  }

  useEffect(() => {
    if (user && attempt && !attempt.id) {
      const updatedAttempt = { ...attempt, uid: user.uid }
      attempts.add(updatedAttempt).then(({ id }) => {
        setAttempt({ ...updatedAttempt, id })
      })
    }
  }, [user, attempt])

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signIn,
        signOut,
        setStart,
        setEnd,
        setSuccess
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
