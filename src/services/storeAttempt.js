import { firestore } from '@utils/firebase'

const attemptsRef = firestore.collection('attempts')

export const storeAttempt = (attempt, callback) => {
  attemptsRef.add(attempt).then(callback)
}
