import Router from '@components/Router'
import { AttemptsProvider } from '@contexts/AttemptsContext'
import { AuthProvider } from '@contexts/AuthContext'
import { ModalProvider } from '@contexts/ModalContext'
import useHeight from '@hooks/useHeight'

import styles from '@styles/components/App.module.css'

const App = () => {
  const height = useHeight()

  return (
    <div className={styles.container} style={{ height }}>
      <ModalProvider>
        <AuthProvider>
          <AttemptsProvider>
            <Router />
          </AttemptsProvider>
        </AuthProvider>
      </ModalProvider>
    </div>
  )
}

export default App
