import React from 'react'
import Icon from '../icon'
import './css/productModal.css'
// images
import MODAL_PREVIEW from '../../../assets/img/modal/preview.jpg'

const ProductModal = ({ modalState, onToggleState }) => {
  // modal close func
  const closeModal = () => {
    const el = document.querySelector('.product-modal')
    el.classList.add('hiding')
    setTimeout(() => {
      onToggleState(false)
    }, 400)
  }

  return (
    <div className={"product-modal" + (modalState ? ' active' : '')}>
      <div className="product-modal__wrapper">
        <button onClick={closeModal}><Icon id={'close'}/></button>
        <div className="product-modal-preview">
          <img src={MODAL_PREVIEW} alt="MODAL_PREVIEW" />
        </div>
        <div className="product-modal-content"></div>
      </div>
    </div>
  )
}

export default ProductModal
