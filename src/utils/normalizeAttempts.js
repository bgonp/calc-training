const parseDate = (date) => date.toDate().toISOString().split('T')[0]

export const normalizeAttempts = (snapshot) => {
  const attempts = {}
  snapshot.forEach(document => {
    const data = document.data()
    if (!data.end) return

    const date = parseDate(data.end)
    if (!attempts[date]) attempts[date] = [0, 0, 0]

    attempts[date][0]++
    if (data.success === true) attempts[date][1]++
    else if (data.success === false) attempts[date][2]++
  })

  return attempts
}
