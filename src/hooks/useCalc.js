import { useCallback, useState, useMemo, useEffect } from 'react'

import useRandomNumbers from '@hooks/useRandomNumbers'
import { useAuth } from '@contexts/AuthContext'
import { useAttempts } from '@contexts/AttemptsContext'

const useCalc = () => {
  const [isSolved, setIsSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()
  const { isAuthed } = useAuth()
  const { isStored, start, store } = useAttempts()

  const result = useMemo(() => numbers.reduce((a, b) => a + b), [numbers])

  const isCompleted = isAuthed ? isStored : isSolved

  const complete = useCallback((success) => store(numbers, success), [numbers, store])

  const restart = useCallback(() => {
    setIsSolved(false)
    nextNumbers()
    start()
  }, [nextNumbers, start])

  const solve = useCallback(() => setIsSolved(true), [])

  useEffect(start, [start])

  return {
    isCompleted,
    isSolved,
    numbers,
    result,
    complete,
    restart,
    solve,
  }
}

export default useCalc
