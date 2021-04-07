import { createContext, useCallback, useContext, useState } from 'react'
import { PropTypes } from 'prop-types'

import { useAuth } from 'contexts/AuthContext'
import { useModal } from 'contexts/ModalContext'
import { fetchAttempts, storeAttempt } from 'services/storage'

const AttemptsContext = createContext(null)

export const useAttempts = () => {
  const context = useContext(AttemptsContext)
  if (!context) throw Error('Cannot use context outside of provider')

  return context
}

export const AttemptsProvider = ({ children }) => {
  const { userId } = useAuth()
  const { renderModal } = useModal()
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

  const store = useCallback(async (numbers, success) => {
    if (!userId || isStoring) return

    const attempt = {
      uid: userId,
      start: startTime,
      end: new Date(),
      numbers,
      success,
    }

    setIsStoring(true)
    try {
      await storeAttempt(attempt)
      setIsStored(true)
    } catch {
      renderModal('Oops! Something went wrong. Please try again')
    }
    setIsStoring(false)
  }, [isStoring, startTime, userId, renderModal])

  return (
    <AttemptsContext.Provider
      value={{
        isStored,
        isStoring,
        fetch,
        start,
        store,
      }}
    >
      {children}
    </AttemptsContext.Provider>
  )
}

AttemptsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
