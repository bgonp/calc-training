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
  const [isCompleted, setIsCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [startTime, setStartTime] = useState(null)
  const [attemptId, setAttemptId] = useState(null)

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

  const setSuccess = useCallback(success => {
    if (!user || !attemptId) return
    attemptsRef
      .doc(attemptId)
      .update({ success })
      .then(() => setIsCompleted(true))
  }, [attemptId, user])

  const start = useCallback(() => {
    setStartTime(new Date())
    setAttemptId(null)
    setIsCompleted(false)
  }, [])

  const store = useCallback((numbers) => {
    if (!user) return
    const attempt = {
      start: startTime,
      end: new Date(),
      uid: user.uid,
      numbers
    }
    attemptsRef.add(attempt).then(({ id }) => setAttemptId(id))
  }, [startTime, user])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => setIsLoading(false))
    return unsubscribe
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        user,
        isCompleted,
        isLoading,
        getAttempts,
        signIn,
        signOut,
        setSuccess,
        start,
        store
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
