import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import ModalOverlay from '../modal-overlay'
import modalStyles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

type TModal = {
  children: React.ReactNode
  closeModal: () => void
}

const Modal: FC<TModal> = ({ closeModal, children }) => {
  const modalsContainer = document.querySelector('#modals') as HTMLElement

  React.useEffect(() => {
    const handleEscKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleEscKeydown)

    return () => {
      document.removeEventListener('keydown', handleEscKeydown)
    }
  }, [closeModal])

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

export default Modal
