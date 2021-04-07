import { PropTypes } from 'prop-types'

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

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default Modal
