
import Button from '@components/Button'
import CloseIcon from '@components/CloseIcon'
import TickIcon from '@components/TickIcon'
import useHeight from '@hooks/useHeight'

import styles from '@styles/components/Modal.module.css'

const Modal = ({ message, onClose, onConfirm }) => {
  const height = useHeight()

  return (
    <div className={styles.modal} style={{ height }}>
      <div className={styles.content}><p>{message}</p></div>
      <div className={styles.buttons}>
        <Button grow primary onClick={onConfirm}><TickIcon /></Button>
        <Button grow secondary onClick={onClose}><CloseIcon /></Button>
      </div>
    </div>
  )
}

export default Modal
