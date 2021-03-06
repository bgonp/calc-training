import { useState, useMemo, useLayoutEffect } from 'react'
import DrawZone from './DrawZone'

import useRandomNumbers from '@hooks/useRandomNumbers'

import styles from '@styles/components/App.module.css'

const App = () => {
  const [height, setHeight] = useState(() => window.innerHeight)
  const [solved, setSolved] = useState(false)
  const [numbers, nextNumbers] = useRandomNumbers()

  const result = useMemo(() => numbers.reduce((a, b) => a + b, 0), [numbers])

  const onSolve = () => setSolved(true)
  const onNext = () => {
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
      <div className={styles.content}>
        {
          solved ||
            <DrawZone className={styles.canvas} thickness={10} color='#ba324f' />
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
