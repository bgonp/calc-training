import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { getVar } from 'utils/getVar'

firebase.initializeApp({
  apiKey: getVar('VITE_FB_API_KEY'),
  authDomain: getVar('VITE_FB_AUTH_DOMAIN'),
  projectId: getVar('VITE_FB_PROJECT_ID'),
  storageBucket: getVar('VITE_FB_STORAGE_BUCKET'),
  messagingSenderId: getVar('VITE_FB_SENDER_ID'),
  appId: getVar('VITE_FB_APP_ID'),
})

const auth = firebase.auth()
const firestore = firebase.firestore()

export {
  auth,
  firebase,
  firestore,
}
