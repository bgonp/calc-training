import { auth, firebase } from '@utils/firebase'

export const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider)
}

export const signOut = () => auth.signOut()

export const onAuthChange = (callback) =>
  auth.onAuthStateChanged(user => callback(user || {}))
