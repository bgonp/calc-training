import { useCallback, useState, useMemo, useEffect } from 'react'

import { useFirebase } from '@contexts/FirebaseContext'
import useRandomNumbers from '@hooks/useRandomNumbers'

const useCalc = () => {
  const [solved, setSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()
  const { start, store } = useFirebase()

  const result = useMemo(() => numbers.reduce((a, b) => a + b), [numbers])

  const solve = useCallback(() => {
    setSolved(true)
    store(numbers)
  }, [numbers, store])

  const restart = useCallback(() => {
    setSolved(false)
    nextNumbers()
    start()
  }, [nextNumbers, start])

  useEffect(start, [start])

  return {
    numbers,
    solved,
    result,
    solve,
    restart
  }
}

export default useCalc
