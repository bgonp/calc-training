import { DrawArea } from 'react-drawarea'

import Footer from '@components/Footer'
import Header from '@components/Header'
import Numbers from '@components/Numbers'
import Result from '@components/Result'
import useCalc from '@hooks/useCalc'

import styles from '@styles/components/Main.module.css'

const App = () => {
  const { numbers, solved, result, solve, restart } = useCalc()

  return (
    <>
      <Header />
      <DrawArea className={styles.canvas} thickness={10} color='#ba324f' disabled={solved}>
        {solved && <Result value={result} />}
        <Numbers solved={solved} numbers={numbers} />
        <Footer solved={solved} handleRestart={restart} handleSolve={solve} />
      </DrawArea>
    </>
  )
}

export default App
