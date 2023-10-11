import React from 'react'
import Icon from '../../common/icon'
import AddReviewForm from './addReviewForm'

const ProductInfoReviews = () => {

  //todo - test reviews array
  const testReviews = [
    {test: 'test'},
    {test: 'test'}
  ]
  
  return (
    <div className='more-info-content__reviews'>
      <div>
        {testReviews && testReviews.map(review => (
          <div className="product-reviews-item">
            <div className="product-reviews-item__col">
              <div className='product-reviews-item__ratting'>
                <Icon id='rate-star-full'/>
                <Icon id='rate-star-full'/>
                <Icon id='rate-star-full'/>
                <Icon id='rate-star-full'/>
                (4)
              </div>
              <p className='product-reviews-item__name-data'>
                <span>Tayeb Rayed</span>
                <span>12:24</span>
                <span>March 2018</span>
              </p>
            </div>
            <div className="product-reviews-item__col">
              <p className='product-reviews-item__description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nost rud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nost.</p>
            </div>
          </div>
        ))}
      </div>
      <AddReviewForm/>
    </div>
  )
}

export default ProductInfoReviews
