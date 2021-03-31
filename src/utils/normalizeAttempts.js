import { twoDigits } from '@utils/twoDigits'

const parseDate = (firebaseDate) => {
  const date = firebaseDate.toDate()
  const year = date.getFullYear()
  const month = twoDigits(date.getMonth() + 1)
  const day = twoDigits(date.getDate())
  return `${year}-${month}-${day}`
}

export const normalizeAttempts = (snapshot) => {
  const attempts = {}
  snapshot.forEach(document => {
    const data = document.data()
    if (!data.end) return

    const date = parseDate(data.end)
    console.log(date)
    if (!attempts[date]) attempts[date] = [0, 0, 0]

    attempts[date][0]++
    if (data.success === true) attempts[date][1]++
    else if (data.success === false) attempts[date][2]++
  })

  return attempts
}
