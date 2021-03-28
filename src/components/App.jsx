import { DrawArea } from 'react-drawarea'

import Footer from '@components/Footer'
import Header from '@components/Header'
import Numbers from '@components/Numbers'
import Result from '@components/Result'
import useCalc from '@hooks/useCalc'
import useHeight from '@hooks/useHeight'

import styles from '@styles/components/App.module.css'

const App = () => {
  const height = useHeight()
  const { numbers, solved, result, solve, restart } = useCalc()

  const className = `${styles.container} ${solved ? styles.solved : ''}`

  return (
    <div className={className} style={{ height }}>
      <Header />
      <DrawArea className={styles.canvas} thickness={10} color='#ba324f' disabled={solved}>
        {solved && <Result value={result} />}
        <Numbers numbers={numbers} />
        <Footer solved={solved} handleRestart={restart} handleSolve={solve} />
      </DrawArea>
    </div>
  )
}

export default App
