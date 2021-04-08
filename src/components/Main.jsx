import { DrawArea } from 'react-drawarea'

import Footer from 'components/Footer'
import Header from 'components/Header'
import Numbers from 'components/Numbers'
import Result from 'components/Result'
import { useAttempts } from 'contexts/AttemptsContext'
import useCalc from 'hooks/useCalc'

import styles from 'styles/components/Main.module.css'

const Main = () => {
  const { isStoring } = useAttempts()
  const { isCompleted, isSolved, numbers, result, complete, solve, restart } = useCalc()

  return (
    <>
      <Header isCompleted={isCompleted} />
      <DrawArea
        className={styles.canvas}
        thickness={10}
        color='#ba324f'
        disabled={isSolved}
      >
        {isSolved && <Result value={result} />}
        <Numbers isSolved={isSolved} numbers={numbers} />
        <Footer
          isCompleted={isCompleted}
          isLoading={isStoring}
          isSolved={isSolved}
          handleRestart={restart}
          handleSolve={solve}
          handleSuccess={complete}
        />
      </DrawArea>
    </>
  )
}

export default Main
