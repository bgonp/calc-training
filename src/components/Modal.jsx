
import Button from '@components/Button'
import { CloseIcon, TickIcon } from '@components/icons'

import styles from '@styles/components/Modal.module.css'

const Modal = ({ message, onClose, onConfirm }) => (
  <div className={styles.modal}>
    <div className={styles.content}><p>{message}</p></div>
    <div className={styles.buttons}>
      <Button grow primary onClick={onConfirm}><TickIcon /></Button>
      <Button grow secondary onClick={onClose}><CloseIcon /></Button>
    </div>
  </div>
)

export default Modal
