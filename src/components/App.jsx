import { useState, useMemo } from 'react'

import Number from '@components/Number'
import Solve from '@components/Solve'
import useRandomNumbers from '@hooks/useRandomNumbers'

const App = () => {
  const [solved, setSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()

  const result = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers])

  const onSolve = () => setSolved(true)
  const onNext = () => {
    setSolved(false)
    nextNumbers()
  }

  console.log(numbers)

  return (
    <div>
      {numbers.map((number, index) => (
        <Number key={index} value={number} />
      ))}
      <hr />
      {solved ? <Number value={result} /> : <Solve onClick={onSolve} />}
      {solved && <button onClick={onNext}>NEXT</button>}
    </div>
  )
}

export default App
