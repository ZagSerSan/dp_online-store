import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import './css/bestProduct.css'
import useStore from '../../store/createStore'

const BestProduct = () => {
  const { productsEntity } = useStore()
  const maxRatingProduct = _.orderBy(productsEntity, ['rate'], ['desc'])[0]

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
              <p className="best-product-content__price">
                <span className='old-price'>$16.00</span>
                <span className='new-price'>$10.00</span>
              </p>
              <p className="best-product-content__description">
                Lorem ipsum dolor sit amet, co adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercita ullamco laboris nisi ut aliquip ex ea commodo
              </p>
              <div className="best-product-content-counter">
                <div className="best-product-content-counter-item">
                  <p className="best-product-content-counter-item__number">0</p>
                  <p className="best-product-content-counter-item__name">Days</p>
                </div>
                <div className="best-product-content-counter-item">
                  <p className="best-product-content-counter-item__number">0</p>
                  <p className="best-product-content-counter-item__name">Hour</p>
                </div>
                <div className="best-product-content-counter-item">
                  <p className="best-product-content-counter-item__number">00</p>
                  <p className="best-product-content-counter-item__name">Min</p>
                </div>
                <div className="best-product-content-counter-item">
                  <p className="best-product-content-counter-item__number">00</p>
                  <p className="best-product-content-counter-item__name">Sec</p>
                </div>
              </div>
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
