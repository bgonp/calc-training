import { useLocation } from 'wouter'

import Button from '@components/Button'
import { ChartIcon, LogInIcon, LogOutIcon } from '@components/icons'
import Loading from '@components/Loading'
import { ROUTE_STATS } from '@constants/routes'
import { useFirebase } from '@contexts/FirebaseContext'
import { useModal } from '@contexts/ModalContext'

import styles from '@styles/components/Header.module.css'

const Header = () => {
  const [, setLocation] = useLocation()
  const { isLoading, user, signIn, signOut } = useFirebase()
  const { renderModal } = useModal()

  const handleSignOut = () => renderModal(
    'Do you want to sign out?',
    signOut
  )

  const handleStats = () => renderModal(
    'Numbers will be discarded. Are you sure?',
    () => setLocation(ROUTE_STATS)
  )

  if (isLoading) {
    return (
      <header className={styles.header}>
        <Button grow primary><Loading small /></Button>
      </header>
    )
  }

  if (user) {
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

export default Header
