import { useContext, useState } from 'react'
import { DrawContext } from 'react-drawarea'

import Button from '@components/Button'
import { CloseIcon, RestartIcon, TickIcon, UndoIcon } from '@components/icons'
import { useFirebaseContext } from '@contexts/FirebaseContext'

import styles from '@styles/components/Footer.module.css'

const Footer = ({ solved, handleRestart, handleSolve }) => {
  const [answered, setAnswered] = useState(false)
  const { undo, reset } = useContext(DrawContext)
  const { setSuccess } = useFirebaseContext()

  const onRestart = () => {
    setAnswered(false)
    handleRestart()
    reset()
  }

  const handleAnswer = (success) => () => {
    setSuccess(success)
    setAnswered(true)
  }

  const startedButtons = (
    <>
      <Button grow secondary onClick={handleSolve}>SOLVE</Button>
      <Button primary onClick={undo}><UndoIcon /></Button>
    </>
  )

  const answerButtons = (
    <>
      <Button grow primary onClick={handleAnswer(true)}><TickIcon /></Button>
      <Button grow secondary onClick={handleAnswer(false)}><CloseIcon /></Button>
    </>
  )

  const finishedButtons = (
    <Button grow primary onClick={onRestart}>
      <RestartIcon />
    </Button>
  )

  return (
    <div className={styles.footer}>
      {solved ? (answered ? finishedButtons : answerButtons) : startedButtons}
    </div>
  )
}

export default Footer
