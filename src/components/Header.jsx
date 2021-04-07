import { useLocation } from 'wouter'
import { PropTypes } from 'prop-types'

import Button from 'components/Button'
import { ChartIcon, LogInIcon, LogOutIcon } from 'components/icons'
import Loading from 'components/Loading'
import { ROUTE_STATS } from 'constants/routes'
import { useAuth } from 'contexts/AuthContext'
import { useModal } from 'contexts/ModalContext'

import styles from 'styles/components/Header.module.css'

const Header = ({ isCompleted }) => {
  const [, setLocation] = useLocation()
  const { isAuthed, isLoading, signIn, signOut } = useAuth()
  const { renderModal } = useModal()

  const handleSignOut = () => renderModal(
    'Do you want to sign out?',
    signOut
  )

  const handleStats = () => isCompleted
    ? setLocation(ROUTE_STATS)
    : renderModal(
      'Numbers will be discarded. Are you sure?',
      () => setLocation(ROUTE_STATS)
    )

  if (isLoading) {
    return (
      <header className={styles.header}>
        <Button grow secondary><Loading small /></Button>
      </header>
    )
  }

  if (isAuthed) {
    return (
      <header className={styles.header}>
        <Button grow primary onClick={handleStats}><ChartIcon /></Button>
        <Button grow secondary onClick={handleSignOut}><LogOutIcon /></Button>
      </header>
    )
  }

  return (
    <header className={styles.header}>
      <Button grow primary onClick={signIn}><LogInIcon /></Button>
    </header>
  )
}

Header.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
}

export default Header
