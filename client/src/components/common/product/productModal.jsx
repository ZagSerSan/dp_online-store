import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Icon from '../icon'
import './css/productModal.css'
import { settings } from '../../../utils/sliderSettings'
import ModalOption from './modalOption'
import useStore from '../../../store/createStore'

const ProductModal = ({ item, modalState, onToggleState, toggleBookmark }) => {
  const initialData = {
    conunt: 1,
    size: '',
    color: ''
  }
  const [data, setData] = useState(initialData)
  const { authedUser, updAuthedUser, localUser, updLocalUserBookmarks, updLocalUserCart } = useStore()
  const [isBookmarked, setBookmark] = useState(false)


  useEffect(() => {
    if (item) {
      setBookmark(
        authedUser
        ? authedUser.bookmarks.includes(item._id)
        : (localUser ? localUser.bookmarks?.includes(item._id) : false)
      )
    }
  }, [item, authedUser])

  //todo
  // const isInCart = authedUser
  //   ? authedUser.cart.includes(item._id)
  //   : (localUser ? localUser.cart?.includes(item._id) : false)

  const changeCount = (type) => {
    switch (type) {
      case 'decrement':
        if (data.conunt > 1) {
          setData(prev => (
            {...prev, conunt: prev.conunt - 1 }
          ))
        }
      break;
      case 'increment':
        if (data.conunt < 10) {
          setData(prev => (
            {...prev, conunt: prev.conunt + 1 }
          ))
        }
      break;
      default:
        break;
    }
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
    setData(initialData)
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
                    key={item.type} 
                    type={item.type} 
                    name={item.name} 
                    options={item.options}
                    data={data}
                    setData={setData}
                  />
                ))}
                </div>
                <div className="product-modal-content-actions">
                  <div className="product-modal-content-actions-counter">
                    <button onClick={() => changeCount('decrement')}>-</button>
                    <p>{data.conunt}</p>
                    <button onClick={() => changeCount('increment')}>+</button>
                  </div>
                  <button className="product-modal-content-actions-cartadd">
                    ADD TO CART
                  </button>
                  <button
                    className={"product-modal-content-actions-bookmark" + (isBookmarked ? ' active' : '')}
                    onClick={(e) => toggleBookmark(e, item._id)}
                  >
                    <Icon id='heart'/>
                  </button>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  )
}

export default ProductModal
