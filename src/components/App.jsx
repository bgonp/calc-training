import { useState, useLayoutEffect } from 'react'
import { DrawArea } from 'react-drawarea'

import Footer from '@components/Footer'
import Header from '@components/Header'
import Numbers from '@components/Numbers'
import Result from '@components/Result'
import useCalc from '@hooks/useCalc'
import useFirebase from '@hooks/useFirebase'

import styles from '@styles/components/App.module.css'

const App = () => {
  const [height, setHeight] = useState(() => window.innerHeight)
  const { numbers, solved, result, solve, restart } = useCalc()
  const { user, signIn, signOut } = useFirebase()

  const className = `${styles.container} ${solved ? styles.solved : ''}`

  useLayoutEffect(() => {
    const setNewHeight = () => setHeight(window.innerHeight)
    window.addEventListener('resize', setNewHeight)
    return () => window.removeEventListener('resize', setNewHeight)
  }, [])

  return (
    <div className={className} style={{ height }}>
      <Header user={user} signIn={signIn} signOut={signOut} />
      <DrawArea className={styles.canvas} thickness={10} color='#ba324f' disabled={solved}>
        {solved && <Result value={result} />}
        <Numbers numbers={numbers} />
        <Footer solved={solved} handleRestart={restart} handleSolve={solve} />
      </DrawArea>
    </div>
  )
}

export default App
