import React from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../../../store/createStore'
import { settings } from '../../../utils/sliderSettings'
import Slider from 'react-slick'
import './productPage.css'
import ModalOption from '../../common/product/modalOption'

const ItemPage = () => {
  const { itemId } = useParams()
  const currentProduct = useStore((state) => state.productsEntity.find(item => item._id === itemId))
  // const { name, preview } = currentProduct
  // console.log('currentProduct :>> ', currentProduct)
  
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

  console.log('currentProduct', currentProduct)
  if (!currentProduct) {
    return 'loading...'
  }

  return (
    <div className="my-container product-page__wrapper">
      {currentProduct && (<>
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
            <p className="preview-info__rate">{currentProduct.rate}</p>
            <p className="preview-info__price">${currentProduct.price}.00 - <strike>$50.00</strike></p>
            <p className="preview-info__in-stock">In stock</p>
            <p className="preview-info__description">{currentProduct.description}</p>
            <div className='options'>
            {/* {currentProduct.modalOptionTypes.map(item => (
              <ModalOption
                key={item.type} 
                type={item.type} 
                name={item.name} 
                options={item.options}
                cartData={cartData}
                setCartData={setCartData}
                setCartItemDataIsChange={setCartItemDataIsChange}
              />
            ))} */}
            </div>
          </div>
        </div>
        <div className="product-page-col">more info</div>
        <div className="product-page-col">related products</div>
      </>)}
    </div>
  )
}

export default ItemPage
