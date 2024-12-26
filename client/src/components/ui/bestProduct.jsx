// main
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import './css/bestProduct.css'
// my components
import productStore from '../../store/productStore'
import Timer from '../common/timer/timer'
import applyDiscount from '../../utils/applyDiscount'

const BestProduct = () => {
  // получения всех продуктов для отбора самого популярного
  const { productsEntity } = productStore()
  // продукт, максимального рейтинга
  const maxRatingProduct = _.orderBy(productsEntity, ['rate'], ['desc'])[0]

  // перерендер через замыкание из дочернего элемента
  const [timerEnabled, setTimerEnabled] = useState()
  const rerenderComponent = (timerState) => {
    // если закончилось время таймера то менять сост родителя на false
    timerState < Date.now() ? setTimerEnabled(false) : setTimerEnabled(true)
  }
  
  return (<>
    {maxRatingProduct && (
      <div className='my-container best-product'>
        <h3 className="best-product__title">Best Product</h3>
        <h2 className="best-product__subtitle">Deal of the Week</h2>
        <div className="best-product__wrapper">
          <div className="best-product__col">
            <div className="best-product-image">
              <img src={maxRatingProduct.preview} alt="preview" />
            </div>
          </div>
          <div className="best-product__col">
            <div className="best-product-content">
              <h3 className="best-product-content__name">
                <Link
                  to={`/category/${maxRatingProduct.type}/${maxRatingProduct._id}`}
                >
                  {maxRatingProduct.name}
                </Link>
              </h3>
              <div className="best-product-content__price">
                
                {maxRatingProduct.discount?.endTime > Date.now()
                  ? <p>
                      <span>{applyDiscount(maxRatingProduct.price, maxRatingProduct.discount).toFixed(2)} - </span>
                      <strike>${(maxRatingProduct.price).toFixed(2)}</strike>
                    </p>
                  : <p className="preview-info__price">${(maxRatingProduct.price).toFixed(2)}</p>
                }

              </div>
              <p className="best-product-content__description">
                Lorem ipsum dolor sit amet, co adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercita ullamco laboris nisi ut aliquip ex ea commodo
              </p>
              <Timer endDate={maxRatingProduct.discount?.endTime} rerenderComponent={rerenderComponent}/>
              <Link
                className="best-product-content__shop-btn"
                to={`/category/${maxRatingProduct.type}/${maxRatingProduct._id}`}
              >
                shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
  </>)
}

export default BestProduct
