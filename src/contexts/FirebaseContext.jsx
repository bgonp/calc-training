import { createContext, useCallback, useContext, useState } from 'react'
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
const { serverTimestamp } = firebase.firestore.FieldValue

const FirebaseContext = createContext(null)

export const useFirebaseContext = () => {
  const context = useContext(FirebaseContext)
  if (!context) throw Error('Cannot use context outside of provider')

  return context
}

export const FirebaseProvider = ({ children }) => {
  const [user] = useAuthState(auth)
  const [attempt, setAttempt] = useState({})

  const getAttempts = useCallback(
    async () => {
      if (!user) return {}
      const snapshot = await attemptsRef.where('uid', '==', user.uid).get()
      return normalizeAttempts(snapshot)
    },
    [user]
  )

  const signIn = useCallback(() => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }, [])

  const signOut = useCallback(() => auth.signOut(), [])

  const setStart = useCallback((numbers) => {
    const start = serverTimestamp()
    setAttempt({ numbers, start })
  }, [])

  const setEnd = useCallback(() => {
    if (!user) return
    const { uid } = user
    const end = serverTimestamp()
    const updatedAttempt = { ...attempt, end, uid }
    attemptsRef
      .add(updatedAttempt)
      .then(({ id }) => setAttempt({ ...updatedAttempt, id }))
  }, [attempt, user])

  const setSuccess = useCallback(success => {
    if (!user || !attempt.id) return
    attemptsRef.doc(attempt.id).update({ success })
  }, [attempt, user])

  return (
    <FirebaseContext.Provider
      value={{
        user,
        getAttempts,
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
