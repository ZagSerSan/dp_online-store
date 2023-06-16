import React from 'react'
import './css/productModal.css'

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
        <button onClick={closeModal}>close</button>
        <h2>Product Modal</h2>
      </div>
    </div>
  )
}

export default ProductModal
