import ReactDOM from 'react-dom'

import App from '@components/App'
import { FirebaseProvider } from '@contexts/FirebaseContext'

import '@styles/index.css'

ReactDOM.render(
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  document.getElementById('root')
)
