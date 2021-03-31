import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { normalizeAttempts } from '@utils/normalizeAttempts'

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
const attemptsRef = firestore.collection('attempts')

const FirebaseContext = createContext(null)

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (!context) throw Error('Cannot use context outside of provider')

  return context
}

export const FirebaseProvider = ({ children }) => {
  const [user] = useAuthState(auth)
  const [isStored, setIsStored] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isStoring, setIsStoring] = useState(false)
  const [startTime, setStartTime] = useState(null)

  const isAuthed = Boolean(user)

  const getAttempts = useCallback(
    async (initDate, finishDate) => {
      if (!user) return {}
      return normalizeAttempts(await attemptsRef
        .where('uid', '==', user.uid)
        .where('end', '>=', initDate)
        .where('end', '<=', finishDate)
        .get()
      )
    },
    [user]
  )

  const signIn = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }, [])

  const signOut = useCallback(() => auth.signOut(), [])

  const start = useCallback(() => {
    setStartTime(new Date())
    setIsStored(false)
  }, [])

  const store = useCallback((numbers, success) => {
    if (isStoring || !user) return
    setIsStoring(true)
    const attempt = {
      uid: user.uid,
      start: startTime,
      end: new Date(),
      numbers,
      success
    }
    attemptsRef.add(attempt).then(() => {
      setIsStored(true)
      setIsStoring(false)
    })
  }, [isStoring, startTime, user])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => setIsLoading(false))
    return unsubscribe
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        isAuthed,
        isLoading,
        isStored,
        isStoring,
        getAttempts,
        signIn,
        signOut,
        start,
        store
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
