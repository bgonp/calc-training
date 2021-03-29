export const normalizeAttempts = (snapshot) => {
  const attempts = {}
  snapshot.forEach(document => {
    const data = document.data()
    if (!data.end) return

    const date = data.start.toDate().toISOString().split('T')[0]
    if (!attempts[date]) attempts[date] = [0, 0]

    attempts[date][data.success ? 0 : 1]++
  })

  return attempts
}
