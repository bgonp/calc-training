import { PropTypes } from 'prop-types'

import Button from 'components/Button'
import { LogInIcon, LogOutIcon } from 'components/icons'
import Loading from 'components/Loading'
import { useAuth } from 'contexts/AuthContext'
import { useModal } from 'contexts/ModalContext'

const AuthButtons = ({ children }) => {
  const { isAuthed, isLoading, signIn, signOut } = useAuth()
  const { renderModal } = useModal()

  const handleSignOut = () => renderModal(
    'Do you want to sign out?',
    signOut
  )

  if (isLoading) {
    return <Button grow secondary><Loading small /></Button>
  }

  if (!isAuthed) {
    return <Button grow primary onClick={signIn}><LogInIcon /></Button>
  }

  return (
    <>
      {children}
      <Button grow secondary onClick={handleSignOut}><LogOutIcon /></Button>
    </>
  )
}

AuthButtons.propTypes = {
  children: PropTypes.node,
}

export default AuthButtons
