import React from 'react'
import { Link } from 'react-router-dom'
import { ratingStarsHelper } from '../../../utils/rateCountHelper'
import { formatDate } from '../../../utils/formatDate'
import { getAverageRatingObj } from '../../../utils/getAverageRatingObj'
import userStore from '../../../store/userStore'
import commentStore from '../../../store/commentStore'
import useStore from '../../../store/createStore'
import Icon from '../../common/icon'
import AddReviewForm from './addReviewForm'

const ProductInfoReviews = () => {
  const { commentsEntity, deleteComment } = commentStore()
  const { authedUser, usersEntity } = userStore()
  const { updateProduct  } = useStore()

  const removeComment = (commentId, productId) => {
    deleteComment(commentId)
    updateProduct(getAverageRatingObj(
      commentsEntity.filter(comment => comment._id !== commentId),
      productId
    ))
  }

  return (
    <div className='more-info-content__reviews'>
      <div>
        {commentsEntity
          ? (
            commentsEntity.length !== 0
              ? commentsEntity.map(review => (
              <div key={review._id} className="product-reviews-item">
                <div className="product-reviews-item__col">
                  <div className='left-part'>
                    {usersEntity && (
                      <img
                        src={usersEntity.find(user => user._id === review.userId).image}
                        alt="" 
                      />
                    )}
                    <div>
                      <p className='product-reviews-item__name-data'>
                        {review.name}
                      </p>
                      <div className='product-reviews-item__ratting'>
                        {ratingStarsHelper.map(rateItem => (
                          <Icon
                            key={rateItem.value}
                            id='rate-star-full'
                            strokeWidth='2' 
                            className={(rateItem.value <= review.rate ? ' active' : '')}
                          />
                        ))}
                        ({review.rate})
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className='product-reviews-item__name-data'>
                      <span>{formatDate(review.created_at, 'hours')}</span>
                      <span>{formatDate(review.created_at, 'year')}</span>
                      {
                        (review?.userId === authedUser?._id || authedUser?.admin) &&
                        <button onClick={() => removeComment(review._id, review.productId)}>
                          <Icon id='close' />
                        </button>
                      }
                    </p>
                  </div>
                </div>
                <div className="product-reviews-item__col">
                  <p className='product-reviews-item__description'>{review.content}</p>
                </div>
              </div>
            )) : <p>no comments</p>
          ) : 'loading...'
      }
      </div>
      {authedUser 
        ? <AddReviewForm/>
        : <div className='message-about-auth'>
            To write comments, please
            {' '}
            <Link to='/auth/register'>register</Link> or
            {' '}
            <Link to='/auth/login'>log in</Link>.
          </div>
      }
    </div>
  )
}

export default ProductInfoReviews
