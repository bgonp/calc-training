import Router from '@components/Router'
import { FirebaseProvider } from '@contexts/FirebaseContext'
import { ModalProvider } from '@contexts/ModalContext'
import useHeight from '@hooks/useHeight'

import styles from '@styles/components/App.module.css'

const App = () => {
  const height = useHeight()

  return (
    <div className={styles.container} style={{ height }}>
      <ModalProvider>
        <FirebaseProvider>
          <Router />
        </FirebaseProvider>
      </ModalProvider>
    </div>
  )
}

export default App
