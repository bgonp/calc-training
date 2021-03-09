import { useState, useMemo, useLayoutEffect } from 'react'
import { DrawArea } from 'react-drawarea'

import Buttons from '@components/Buttons'
import Numbers from '@components/Numbers'
import Result from '@components/Result'
import useRandomNumbers from '@hooks/useRandomNumbers'

import styles from '@styles/components/App.module.css'

const App = () => {
  const [height, setHeight] = useState(() => window.innerHeight)
  const [solved, setSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()

  const result = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers])

  const handleSolve = () => setSolved(true)
  const handleRestart = () => {
    setSolved(false)
    nextNumbers()
  }

  const className = `${styles.container} ${solved ? styles.solved : ''}`

  useLayoutEffect(() => {
    const setNewHeight = () => setHeight(window.innerHeight)
    window.addEventListener('resize', setNewHeight)
    return () => window.removeEventListener('resize', setNewHeight)
  }, [])

  return (
    <main className={className} style={{ height }}>
      <DrawArea className={styles.canvas} thickness={10} color='#ba324f' disabled={solved}>
        {solved && <Result value={result} />}
        <Numbers numbers={numbers} />
        <Buttons solved={solved} handleRestart={handleRestart} handleSolve={handleSolve} />
      </DrawArea>
    </main>
  )
}

export default App
