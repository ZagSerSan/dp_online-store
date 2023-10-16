import React, { useEffect } from 'react'
import commentStore from '../../../store/commentStore'
import Icon from '../../common/icon'
import AddReviewForm from './addReviewForm'
import { useParams } from 'react-router-dom'
import { ratingStarsHelper } from '../../../utils/rateCountHelper'

const ProductInfoReviews = () => {
  const { itemId } = useParams()
  const { commentsEntity, loadCommentsList, commentsIsLoaded, setCommentsIsLoaded, deleteComment } = commentStore()

  // useEffect(() => {
  //   setCommentsIsLoaded(false)
  //   if (!commentsIsLoaded) {
  //     loadCommentsList(itemId)
  //   }
  // }, [commentsEntity])

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
                    <button className='text-[red]' onClick={() => deleteComment(review._id)}>X</button>
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
      <AddReviewForm/>
    </div>
  )
}

export default ProductInfoReviews
