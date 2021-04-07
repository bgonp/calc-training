import { createContext, useContext, useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'

import { onAuthChange, signIn, signOut } from 'services/auth'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw Error('Cannot use context outside of provider')

  return context
}

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const isAuthed = Boolean(userId)

  useEffect(() => {
    const unsubscribe = onAuthChange(({ uid }) => {
      setUserId(uid || '')
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        isLoading,
        userId,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
