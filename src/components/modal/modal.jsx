import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay'
import modalStyles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function Modal({ closeModal, children }) {
  const modalsContainer = document.querySelector('#modals')

  React.useEffect(() => {
    const handleEscKeydown = event => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscKeydown)

    return () => {
      document.removeEventListener('keydown', handleEscKeydown)
    }
  }, [])

  const modal = (
    <>
      <ModalOverlay onClick={closeModal} />
      <div className={modalStyles.modal}>
        {children}
        <button
          className={modalStyles.close}
          onClick={closeModal}
        >
          <CloseIcon type='primary' />
        </button>
      </div>
    </>
  )

  return ReactDOM.createPortal(modal, modalsContainer)
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Modal
