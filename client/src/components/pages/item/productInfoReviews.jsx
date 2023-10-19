import React from 'react'
import commentStore from '../../../store/commentStore'
import Icon from '../../common/icon'
import AddReviewForm from './addReviewForm'
import { ratingStarsHelper } from '../../../utils/rateCountHelper'
import { Link } from 'react-router-dom'
import userStore from '../../../store/userStore'

const ProductInfoReviews = () => {
  const { commentsEntity, deleteComment } = commentStore()
  const { authedUser } = userStore()

  return (
    <div className='more-info-content__reviews'>
      <div>
        {commentsEntity
          ? (
            commentsEntity.length !== 0
              ? commentsEntity.map(review => (
              <div key={review._id} className="product-reviews-item">
                <div className="product-reviews-item__col">
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
                  <p className='product-reviews-item__name-data'>
                    <span>{review.name}</span>
                    <span>{review.created_at}</span>
                    {
                      (review?.userId === authedUser?._id || authedUser.admin) &&
                      <button onClick={() => deleteComment(review._id)}>
                        <Icon id='close' />
                      </button>
                    }
                  </p>
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
