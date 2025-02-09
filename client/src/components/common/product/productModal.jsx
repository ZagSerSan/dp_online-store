import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import './css/productModal.css'
// utils, store
import { ratingStarsHelper } from '../../../utils/rateCountHelper'
import { calcAverageNumber } from '../../../utils/calcAverageNumber'
import { settings } from '../../../utils/sliderSettings'
//store
import cartStore from '../../../store/cartStore'
import commentStore from '../../../store/commentStore'
// components
import Icon from '../icon'
import ModalOption from './modalOption'
import ProductActions from './productActions'
import applyDiscount from '../../../utils/applyDiscount'

const ProductModal = ({ item, modalState, onToggleState }) => {
  const { setCartItemData } = cartStore()
  const { commentsEntity, loadCommentsList, commentsIsLoaded } = commentStore()

  useEffect(() => {
    if (item) {
      loadCommentsList(item._id)
    }
  }, [item, commentsIsLoaded])

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
  // сброс сущности в модалке
  if (!modalState) {
    item = null
  }

  return (
    <div className={"product-modal" + (modalState ? ' active' : '')}>
      <div className="product-modal__wrapper">
        <button className='product-modal__close' onClick={closeModal}><Icon id={'close'}/></button>
          {item && (
            <>
              {/* слайдер */}
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
              {/* контент */}
              <div className="product-modal-content">
                <h3 className="product-modal-content__name">{item.name}</h3>

                {item.discount?.endTime > Date.now()
                  ? <p className="product-modal-content__price">$
                      <span>{applyDiscount(item.price, item.discount).toFixed(2)} - </span>
                      <strike>${(item.price).toFixed(2)}</strike>
                    </p>
                  : <p className="product-modal-content__price">${(item.price).toFixed(2)}</p>
                }

                <div className="product-modal-content__rate">
                  {ratingStarsHelper.map(rateItem => (
                    <Icon
                      key={rateItem.value}
                      id='rate-star-full'
                      strokeWidth='2' 
                      className={
                        (rateItem.value <= calcAverageNumber(commentsEntity) ? ' active' : '')
                      }
                    />
                  ))}
                  <span>({calcAverageNumber(commentsEntity)})</span>
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

ProductModal.propTypes = {
  item: PropTypes.object, 
  modalState: PropTypes.bool, 
  onToggleState: PropTypes.func 
}

export default ProductModal
