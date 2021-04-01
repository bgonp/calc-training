import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { onAuthChange, signIn, signOut } from '@services/auth'
import { fetchAttempts } from '@services/fetchAttempts'
import { storeAttempt } from '@services/storeAttempt'

const FirebaseContext = createContext(null)

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (!context) throw Error('Cannot use context outside of provider')

  return context
}

export const FirebaseProvider = ({ children }) => {
  const [uid, setUid] = useState('')
  const [isStored, setIsStored] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isStoring, setIsStoring] = useState(false)
  const [startTime, setStartTime] = useState(null)

  const isAuthed = Boolean(uid)

  const fetch = useCallback(
    (initDate, finishDate) => uid ? fetchAttempts(uid, initDate, finishDate) : {},
    [uid]
  )

  const start = useCallback(() => {
    setStartTime(new Date())
    setIsStored(false)
  }, [])

  const store = useCallback((numbers, success) => {
    if (isStoring || !uid) return

    const attempt = {
      uid,
      start: startTime,
      end: new Date(),
      numbers,
      success
    }
    const callback = () => {
      setIsStored(true)
      setIsStoring(false)
    }

    setIsStoring(true)
    storeAttempt(attempt, callback)
  }, [isStoring, startTime, uid])

  useEffect(() => {
    const callback = ({ uid }) => {
      setUid(uid || '')
      setIsLoading(false)
    }
    const unsubscribe = onAuthChange(callback)

    return unsubscribe
  }, [])

  return (
    <FirebaseContext.Provider
      value={{
        isAuthed,
        isLoading,
        isStored,
        isStoring,
        fetch,
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
