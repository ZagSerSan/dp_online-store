import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import './css/productPage.css'
// utils
import { ratingStarsHelper } from '../../../utils/rateCountHelper'
import { settings } from '../../../utils/sliderSettings'
import { calcAverageNumber } from '../../../utils/calcAverageNumber'
// store
import productStore from '../../../store/productStore'
import commentStore from '../../../store/commentStore'
// components
import Slider from 'react-slick'
import Icon from '../../common/icon'
import ModalOption from '../../common/product/modalOption'
import ProductActions from '../../common/product/productActions'
import ProductsList from '../../ui/productsList'
import ProductInfoMore from './productInfoMore'
import ProductInfoReviews from './productInfoReviews'
import ProductInfoDescription from './productInfoDescription'
import Timer from '../../common/timer/timer'

  // todo (line 93) - отображение скидки (опционально с таймером)

const ItemPage = () => {
  const { itemId } = useParams()
  const currentProduct = productStore((state) => state.productsEntity.find(item => item._id === itemId))

  const { commentsEntity, loadCommentsList, commentsIsLoaded } = commentStore()
  // переключение контента
  const [contentState, setContentState] = useState('reviews')
  const navLinks = [
    {Label: 'DESCRIPTION', state: 'description', counter: false},
    {Label: 'MORE INFORMATION', state: 'more', counter: false},
    {Label: 'REVIEWS', state: 'reviews', counter: true}
  ]

  // correcting html slider
  if (currentProduct) {
    setTimeout(() => {
      const productPageSlider = document.querySelector('.product-page-slider')
      const productPageSlider_slickDots = productPageSlider.querySelector('.slick-dots')
      productPageSlider_slickDots.style.display = 'flex'

      const productPageSlider_btn = productPageSlider.querySelectorAll('li > button')
      productPageSlider_btn.forEach((btn, index) => btn.innerHTML = `<img src=${currentProduct.slider_dots[index]} alt='${index}'/>`)
    }, 100)
  }

  const toggleContent = (newState) => {
    setContentState(newState)
  }

  useEffect(() => {
    loadCommentsList(itemId)
  }, [itemId, commentsIsLoaded])

  // скроллить вверх при открытии страницы
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [itemId])

  return (
    <div className="product-page">
      {currentProduct ? (
        <>
          <div className="my-container product-page__wrapper">
            <div className="product-page-col">
              <div className="product-page-col__row product-page-slider">
                <Slider {...settings}>
                  {currentProduct.slider.map(item => (
                    <div key={item.id}>
                      <div className=''>
                        <img src={item.preview} alt={item.title} />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="product-page-col__row preview-info">
                <p className="preview-info__name">{currentProduct.name}</p>
                <p className="preview-info__rate">
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
                </p>

                {currentProduct.discount?.endTime > Date.now()
                  ? <div>
                      <p className="preview-info__price">$
                        <span>{(currentProduct.price - (currentProduct.price / 100 * currentProduct.discount.percentage)).toFixed(2)} - </span>
                        <strike>${(currentProduct.price).toFixed(2)}</strike>
                      </p>
                      <Timer endDate={currentProduct.discount?.endTime}/>
                    </div>
                  : <p className="preview-info__price">${currentProduct.price}</p>
                }

                <p className="preview-info__in-stock">In stock</p>
                <p className="preview-info__description">{currentProduct.description}</p>
                <div className='options'>
                  {currentProduct.modalOptionTypes.map(item => (
                    <ModalOption
                      key={item.name}
                      name={item.name} 
                      options={item.options}
                    />
                  ))}
                </div>
                <ProductActions item={currentProduct}/>
              </div>
            </div>

            <div className="product-page-col more-info">
              <div className="more-info-nav">
                {navLinks.map(link => (
                  <button
                    key={link.state}
                    className={contentState === link.state ? 'active' : ''}
                    onClick={() => toggleContent(link.state)}
                  >
                    {link.Label} {link.counter && <span>({commentsEntity?.length})</span>}
                  </button>
                ))}
              </div>
              <div className="more-info-content">
                {contentState === 'more'
                  ? <ProductInfoMore/>
                  : contentState === 'reviews'
                  ? <ProductInfoReviews/>
                  : <ProductInfoDescription/>
                }
              </div>
            </div>
          </div>
          <ProductsList role='productItem'/>
        </>
      ) : <Navigate to='/home'/>}
    </div>
  )
}

export default ItemPage
