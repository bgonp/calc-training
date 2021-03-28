import { useState } from 'react'

import Button from '@components/Button'
import LogInIcon from '@components/LogInIcon'
import LogOutIcon from '@components/LogOutIcon'
import Modal from '@components/Modal'
import { useFirebaseContext } from '@contexts/FirebaseContext'
import { useModal } from '@contexts/ModalContext'

import styles from '@styles/components/Header.module.css'

const Header = () => {
  const { user, signIn, signOut } = useFirebaseContext()
  const { renderModal } = useModal()

  const handleSignOut = () => renderModal('Do you want to sign out?', signOut)

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
