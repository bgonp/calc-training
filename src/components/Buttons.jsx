import { useContext } from 'react'
import { DrawContext } from 'react-drawarea'

import RestartIcon from '@components/RestartIcon'
import UndoIcon from '@components/UndoIcon'
import styles from '@styles/components/Buttons.module.css'

const Buttons = ({ solved, handleRestart, handleSolve }) => {
  const { undo, reset } = useContext(DrawContext)

  const onRestart = () => {
    handleRestart()
    reset()
  }

  return (
    <div className={styles.buttons}>
      {
        solved
          ? <button className={styles.restart} onClick={onRestart}><RestartIcon /></button>
          : (
            <>
              <button className={styles.solve} onClick={handleSolve}>SOLVE</button>
              <button className={styles.undo} onClick={undo}><UndoIcon /></button>
            </>
            )
      }
    </div>
  )
}

export default Buttons
