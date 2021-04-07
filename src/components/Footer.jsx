import { useContext } from 'react'
import { PropTypes } from 'prop-types'
import { DrawContext } from 'react-drawarea'

import Button from '@components/Button'
import Loading from '@components/Loading'
import { CloseIcon, RestartIcon, TickIcon, UndoIcon } from '@components/icons'

import styles from '@styles/components/Footer.module.css'

const Footer = ({
  isCompleted,
  isLoading,
  isSolved,
  handleRestart,
  handleSolve,
  handleSuccess,
}) => {
  const { undo, reset } = useContext(DrawContext)

  const handleAnswer = (success) => () => handleSuccess(success)

  const onRestart = () => {
    handleRestart()
    reset()
  }

  if (isLoading) {
    return (
      <div className={styles.footer}>
        <Button grow secondary><Loading small /></Button>
      </div>
    )
  }

  if (!isSolved) {
    return (
      <div className={styles.footer}>
        <Button grow secondary onClick={handleSolve}>SOLVE</Button>
        <Button primary onClick={undo}><UndoIcon /></Button>
      </div>
    )
  }

  if (!isCompleted) {
    return (
      <div className={styles.footer}>
        <Button grow primary onClick={handleAnswer(true)}><TickIcon /></Button>
        <Button grow secondary onClick={handleAnswer(false)}><CloseIcon /></Button>
      </div>
    )
  }

  return (
    <div className={styles.footer}>
      <Button grow primary onClick={onRestart}><RestartIcon /></Button>
    </div>
  )
}

Footer.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSolved: PropTypes.bool.isRequired,
  handleRestart: PropTypes.func.isRequired,
  handleSolve: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
}

export default Footer
