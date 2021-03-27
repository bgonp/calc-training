import { useContext } from 'react'
import { DrawContext } from 'react-drawarea'

import Button from '@components/Button'
import RestartIcon from '@components/RestartIcon'
import UndoIcon from '@components/UndoIcon'
import styles from '@styles/components/Footer.module.css'

const Footer = ({ solved, handleRestart, handleSolve }) => {
  const { undo, reset } = useContext(DrawContext)

  const onRestart = () => {
    handleRestart()
    reset()
  }

  return (
    <div className={styles.footer}>
      {
        solved
          ? <Button grow primary onClick={onRestart}><RestartIcon /></Button>
          : (
            <>
              <Button grow secondary onClick={handleSolve}>SOLVE</Button>
              <Button primary onClick={undo}><UndoIcon /></Button>
            </>
            )
      }
    </div>
  )
}

export default Footer
