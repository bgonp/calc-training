import { useState, useMemo } from 'react'
import CanvasDraw from 'react-canvas-draw'

import useRandomNumbers from '@hooks/useRandomNumbers'

import styles from '@styles/components/App.module.css'

const App = () => {
  const [solved, setSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()

  const result = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers])

  const onSolve = () => setSolved(true)
  const onNext = () => {
    setSolved(false)
    nextNumbers()
  }

  const className = `${styles.container} ${solved ? styles.solved : ''}`

  const style = { height: window.innerHeight }

  return (
    <main className={className} style={style}>
      <div className={styles.content}>
        {
          solved ||
            <div className={styles.canvas}>
              <CanvasDraw
                hideInterface
                hideGrid
                backgroundColor='#0000'
                brushColor='#ba324f'
                brushRadius={6}
              />
            </div>
        }
        <div className={styles.numbers}>
          {numbers.map((number, index) => (
            <div className={styles.number} key={index}>{number}</div>
          ))}
        </div>
      </div>
      {
        solved
          ? <button className={styles.button} onClick={onNext}>{result}</button>
          : <button className={styles.button} onClick={onSolve}>SOLVE</button>
      }
    </main>
  )
}

export default App
