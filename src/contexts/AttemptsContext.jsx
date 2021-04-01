import { createContext, useCallback, useContext, useState } from 'react'

import { useAuth } from '@contexts/AuthContext'
import { fetchAttempts, storeAttempt } from '@services/storage'

const AttemptsContext = createContext(null)

export const useAttempts = () => {
  const context = useContext(AttemptsContext)
  if (!context) throw Error('Cannot use context outside of provider')

  return context
}

export const AttemptsProvider = ({ children }) => {
  const { userId } = useAuth()
  const [isStored, setIsStored] = useState(false)
  const [isStoring, setIsStoring] = useState(false)
  const [startTime, setStartTime] = useState(null)

  const fetch = useCallback(
    (initDate, finishDate) => userId ? fetchAttempts(userId, initDate, finishDate) : {},
    [userId]
  )

  const start = useCallback(() => {
    setStartTime(new Date())
    setIsStored(false)
  }, [])

  const store = useCallback((numbers, success) => {
    if (!userId || isStoring) return

    const attempt = {
      uid: userId,
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
  }, [isStoring, startTime, userId])

  return (
    <AttemptsContext.Provider
      value={{
        isStored,
        isStoring,
        fetch,
        start,
        store
      }}
    >
      {children}
    </AttemptsContext.Provider>
  )
}
