import { useCallback, useState, useMemo } from 'react'
import useRandomNumbers from '@hooks/useRandomNumbers'

const useCalc = () => {
  const [solved, setSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()

  const result = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers])

  const solve = useCallback(() => setSolved(true), [])
  const restart = useCallback(() => {
    setSolved(false)
    nextNumbers()
  }, [])

  return {
    numbers,
    solved,
    result,
    solve,
    restart
  }
}

export default useCalc
