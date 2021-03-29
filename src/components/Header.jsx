import Button from '@components/Button'
import { LogInIcon, LogOutIcon } from '@components/icons'
import { useFirebaseContext } from '@contexts/FirebaseContext'
import { useModal } from '@contexts/ModalContext'

import styles from '@styles/components/Header.module.css'

const Header = () => {
  const { user, signIn, signOut } = useFirebaseContext()
  const { renderModal } = useModal()

  const handleSignOut = () => renderModal('Do you want to sign out?', signOut)
  // TODO
  // const handleSignOut = () => getAttempts().then(
  //   data => renderModal(JSON.stringify(data, null, 2), signOut)
  // )

  return (
    <header className={styles.header}>
      {
        user
          ? <Button secondary onClick={handleSignOut}><LogOutIcon /></Button>
          : <Button primary onClick={signIn}><LogInIcon /></Button>
      }
    </header>
  )
}

export default Header
