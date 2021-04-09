import { DrawArea } from 'react-drawarea'
import { useLocation } from 'wouter'

import AuthButtons from 'components/AuthButtons'
import Button from 'components/Button'
import CalcButtons from 'components/CalcButtons'
import { ChartIcon } from 'components/icons'
import Numbers from 'components/Numbers'
import Result from 'components/Result'
import { ROUTE_STATS } from 'constants/routes'
import { useAttempts } from 'contexts/AttemptsContext'
import { useModal } from 'contexts/ModalContext'
import useCalc from 'hooks/useCalc'

import styles from 'styles/components/Main.module.css'

const Calc = () => {
  const [, setLocation] = useLocation()
  const { renderModal } = useModal()
  const { isStoring } = useAttempts()
  const { isCompleted, isSolved, numbers, result, complete, solve, restart } = useCalc()

  const handleStats = () => isCompleted
    ? setLocation(ROUTE_STATS)
    : renderModal(
      'Numbers will be discarded. Are you sure?',
      () => setLocation(ROUTE_STATS)
    )

  return (
    <>
      <header className={styles.header}>
        <AuthButtons>
          <Button grow primary onClick={handleStats}><ChartIcon /></Button>
        </AuthButtons>
      </header>
      <DrawArea
        className={styles.canvas}
        thickness={10}
        color='#ba324f'
        disabled={isSolved}
      >
        {isSolved && <Result value={result} />}
        <Numbers isSolved={isSolved} numbers={numbers} />
        <div className={styles.footer}>
          <CalcButtons
            isCompleted={isCompleted}
            isLoading={isStoring}
            isSolved={isSolved}
            handleRestart={restart}
            handleSolve={solve}
            handleSuccess={complete}
          />
        </div>
      </DrawArea>
    </>
  )
}

export default Calc
