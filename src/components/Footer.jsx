import { useContext, useState } from 'react'
import { DrawContext } from 'react-drawarea'

import Button from '@components/Button'
import { CloseIcon, RestartIcon, TickIcon, UndoIcon } from '@components/icons'
import { useFirebase } from '@contexts/FirebaseContext'

import styles from '@styles/components/Footer.module.css'

const Footer = ({ solved, handleRestart, handleSolve }) => {
  const [answered, setAnswered] = useState(false)
  const { undo, reset } = useContext(DrawContext)
  const { setSuccess } = useFirebase()

  const onRestart = () => {
    setAnswered(false)
    handleRestart()
    reset()
  }

  const handleAnswer = (success) => () => {
    setSuccess(success)
    setAnswered(true)
  }

  if (!solved) {
    return (
      <div className={styles.footer}>
        <Button grow secondary onClick={handleSolve}>SOLVE</Button>
        <Button primary onClick={undo}><UndoIcon /></Button>
      </div>
    )
  }

  if (!answered) {
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

export default Footer
