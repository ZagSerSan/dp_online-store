import React from 'react'
import Slider from 'react-slick'
import Icon from '../icon'
import './css/productModal.css'
import { settings } from '../../../utils/sliderSettings'
import ModalOption from './modalOption'
import cartStore from '../../../store/cartStore'
import ProductActions from './productActions'

const ProductModal = ({ item, modalState, onToggleState }) => {
  const { setCartItemData } = cartStore()
  
  // modal close func
  const closeModal = () => {
    const modalBg_el = document.querySelector('.product-modal')
    modalBg_el.classList.add('hiding')
    setTimeout(() => {
      onToggleState(false)
    }, 400)
    setCartItemData('closeModal')
  }

  // corretcing slider html
  if (modalState) {
    setTimeout(() => {
      const productModalPreview = document.querySelector('.product-modal-preview')
      const productModalPreview_slickDots = productModalPreview.querySelector('.slick-dots')
      productModalPreview_slickDots.style.display = 'flex'

      const slider_arrows = productModalPreview.querySelectorAll('.slick-arrow')
      slider_arrows.forEach(arrow => {
        arrow.style.display = 'none'
      })
      const productModalPreview_btn = productModalPreview.querySelectorAll('li > button')
      productModalPreview_btn.forEach((btn, index) => btn.innerHTML = `<img src=${item.slider_dots[index]} alt='${index}'/>`)
    }, 100)
  }
  // сброс положение слайдера в модалке
  if (!modalState) {
    item = null
  }

  return (
    <div className={"product-modal" + (modalState ? ' active' : '')}>
      <div className="product-modal__wrapper">
        <button className='product-modal__close' onClick={closeModal}><Icon id={'close'}/></button>
          {item && (
            <>
              <div className="product-modal-preview">
                <Slider {...settings}>
                  {item.slider.map(item => (
                    <div key={item.id}>
                      <div className='item-item'>
                        <img src={item.preview} alt={item.title} />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="product-modal-content">
                <h3 className="product-modal-content__name">{item.name}</h3>
                <p className="product-modal-content__price">${item.price}.00</p>
                <div className="product-modal-content__rate">
                  <Icon id='rate-star-full'/>
                  <Icon id='rate-star-full'/>
                  {item.rate}
                </div>
                <p className="product-modal-content__description">{item.description}</p>
                <div className="product-modal-content-options">
                {item.modalOptionTypes.map(item => (
                  <ModalOption
                    key={item.name}
                    name={item.name} 
                    options={item.options}
                  />
                ))}
                </div>
                <ProductActions {...{item}}/>
              </div>
            </>
          )}
      </div>
    </div>
  )
}

export default ProductModal
