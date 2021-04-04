import { firestore } from '@utils/firebase'
import { twoDigits } from '@utils/twoDigits'

const attemptsRef = firestore.collection('attempts')

const parseDate = (fetchedDate) => {
  const date = fetchedDate.toDate()
  const year = date.getFullYear()
  const month = twoDigits(date.getMonth() + 1)
  const day = twoDigits(date.getDate())
  return `${year}-${month}-${day}`
}

const normalizeAttempts = (snapshot) => {
  const attempts = {}
  snapshot.forEach(document => {
    const data = document.data()
    if (!data.end) return

    const date = parseDate(data.end)
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

export const storeAttempt = (attempt, callback) =>
  attemptsRef.add(attempt).then(callback)
