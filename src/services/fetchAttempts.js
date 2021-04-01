import { firestore } from '@utils/firebase'
import { normalizeAttempts } from '@utils/normalizeAttempts'

const attemptsRef = firestore.collection('attempts')

export const fetchAttempts = async (uid, initDate, finishDate) => {
  const snapshot = await attemptsRef
    .where('uid', '==', uid)
    .where('end', '>=', initDate)
    .where('end', '<=', finishDate)
    .get()

  return normalizeAttempts(snapshot)
}
