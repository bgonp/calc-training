import Button from '@components/Button'
import LogInIcon from '@components/LogInIcon'
import LogOutIcon from '@components/LogOutIcon'

import styles from '@styles/components/Header.module.css'
import { useFirebaseContext } from '../contexts/FirebaseContext'

const Header = () => {
  const { user, signIn, signOut } = useFirebaseContext()
  return (
    <header className={styles.header}>
      {
        user
          ? <Button secondary onClick={signOut}><LogOutIcon /></Button>
          : <Button primary onClick={signIn}><LogInIcon /></Button>
      }
    </header>
  )
}

export default Header
