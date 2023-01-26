import React, { FC } from 'react'
import modalOverlayStyles from './modal-overlay.module.css'

type TModalOverlay = {
  onClick: () => void
}

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
  return (
    <div
      className={modalOverlayStyles.overlay}
      onClick={onClick}
    />
  )
}

export default ModalOverlay
