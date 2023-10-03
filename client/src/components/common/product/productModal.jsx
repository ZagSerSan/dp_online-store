import React from 'react'
import Slider from 'react-slick'
import Icon from '../icon'
import './css/productModal.css'

const ProductModal = ({ item, modalState, onToggleState }) => {
  // preview slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  //todo corretcing slider html
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

  // modal close func
  const closeModal = () => {
    const modalBg_el = document.querySelector('.product-modal')
    modalBg_el.classList.add('hiding')
    setTimeout(() => {
      onToggleState(false)
    }, 400)
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
                <p className="product-modal-content__description">{item.description}</p>
              </div>
            </>
          )}
      </div>
    </div>
  )
}

export default ProductModal
