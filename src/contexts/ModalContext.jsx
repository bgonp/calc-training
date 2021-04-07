import { createContext, useContext, useState } from 'react'
import { PropTypes } from 'prop-types'

import Modal from 'components/Modal'

const ModalContext = createContext()

const initialModalData = {
  visible: false,
  message: '',
  onConfirm: () => {},
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw Error('Cannot use context outside of provider')
  return context
}

export const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(initialModalData)
  const { visible, message, onConfirm } = modalData

  const handleClose = () => setModalData(initialModalData)

  const handleConfirm = () => {
    onConfirm()
    setModalData(initialModalData)
  }

  const renderModal = (message, onConfirm = () => {}) => {
    setModalData({
      visible: true,
      message,
      onConfirm,
    })
  }

  return (
    <ModalContext.Provider value={{ renderModal }}>
      {children}
      {visible &&
        <Modal message={message} onClose={handleClose} onConfirm={handleConfirm} />}
    </ModalContext.Provider>
  )
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
