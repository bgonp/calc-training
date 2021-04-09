import { formatDate } from 'utils/dates'
import { firestore } from 'utils/firebase'

const attemptsRef = firestore.collection('attempts')

const normalizeAttempts = (snapshot) => {
  const attempts = {}
  snapshot.forEach(document => {
    const data = document.data()
    if (!data.end) return

    const date = formatDate(data.end.toDate())
    if (!attempts[date]) attempts[date] = [0, 0]

    attempts[date][0]++
    if (data.success === true) attempts[date][1]++
  })

  return attempts
}

export const fetchAttempts = async (uid, initDate, finishDate) => {
  const snapshot = await attemptsRef
    .where('uid', '==', uid)
    .where('end', '>=', initDate)
    .where('end', '<=', finishDate)
    .get()

  return normalizeAttempts(snapshot)
}

export const storeAttempt = (attempt) =>
  attemptsRef.add(attempt)
