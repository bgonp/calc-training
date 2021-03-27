import { useCallback, useState, useMemo, useEffect } from 'react'

import { useFirebaseContext } from '@contexts/FirebaseContext'
import useRandomNumbers from '@hooks/useRandomNumbers'

const useCalc = () => {
  const [solved, setSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()
  const { setStart, setEnd } = useFirebaseContext()

  const result = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers])

  const solve = useCallback(() => setSolved(true), [])
  const restart = useCallback(() => {
    setSolved(false)
    nextNumbers()
  }, [])

  useEffect(() => {
    if (solved) setEnd()
    else setStart(numbers)
  }, [solved])

  return {
    numbers,
    solved,
    result,
    solve,
    restart
  }
}

export default useCalc
