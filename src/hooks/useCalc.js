import { useCallback, useState, useMemo, useEffect } from 'react'

import { useFirebase } from '@contexts/FirebaseContext'
import useRandomNumbers from '@hooks/useRandomNumbers'

const useCalc = () => {
  const [isSolved, setIsSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()
  const { isAuthed, isStored, start, store } = useFirebase()

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
    solve
  }
}

export default useCalc
