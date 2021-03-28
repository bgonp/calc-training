import ReactDOM from 'react-dom'

import App from '@components/App'
import { FirebaseProvider } from '@contexts/FirebaseContext'
import { ModalProvider } from '@contexts/ModalContext'

import '@styles/index.css'

ReactDOM.render(
  <ModalProvider>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </ModalProvider>,
  document.getElementById('root')
)
