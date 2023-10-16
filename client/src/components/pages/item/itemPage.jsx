import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../../../store/createStore'
import { settings } from '../../../utils/sliderSettings'
import { calcAverageNumber } from '../../../utils/calcAverageNumber'
import './productPage.css'
// common components
import Slider from 'react-slick'
import Icon from '../../common/icon'
// ui components
import ModalOption from '../../common/product/modalOption'
import ProductActions from '../../common/product/productActions'
import ProductsList from '../../ui/productsList'
import ProductInfoMore from './productInfoMore'
import ProductInfoReviews from './productInfoReviews'
import ProductInfoDescription from './productInfoDescription'
import commentStore from '../../../store/commentStore'
import { ratingStarsHelper } from '../../../utils/rateCountHelper'

const ItemPage = () => {
  const { itemId } = useParams()
  const currentProduct = useStore((state) => state.productsEntity.find(item => item._id === itemId))
  const { commentsEntity, loadCommentsList, commentsIsLoaded, setCommentsIsLoaded } = commentStore()

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

      // const slider_arrows = productPageSlider.querySelectorAll('.slick-arrow')
      // slider_arrows.forEach(arrow => {
      //   arrow.style.display = 'none'
      // })
      const productPageSlider_btn = productPageSlider.querySelectorAll('li > button')
      productPageSlider_btn.forEach((btn, index) => btn.innerHTML = `<img src=${currentProduct.slider_dots[index]} alt='${index}'/>`)
    }, 100)
  }

  if (!currentProduct) {
    return <Icon id='loader'/>
  }

  const toggleContent = (newState) => {
    setContentState(newState)
  }

  useEffect(() => {
    setCommentsIsLoaded(false)
    if (!commentsIsLoaded) {
      loadCommentsList(itemId)
    }
  }, [commentsEntity])

  return (
    <div className="product-page">

      <div className="my-container product-page__wrapper">
        {currentProduct && (<>
          <div className="product-page-col pb-[100px]">
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
              <p className="preview-info__price">${currentProduct.price}.00 - <strike>$50.00</strike></p>
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
                  {link.Label} {link.counter && <span>({commentsEntity.length})</span>}
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
        </>)}
      </div>
      <ProductsList role='productItem'/>
    </div>
  )
}

export default ItemPage
