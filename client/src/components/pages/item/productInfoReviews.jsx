import React, { useEffect } from 'react'
import commentStore from '../../../store/commentStore'
import Icon from '../../common/icon'
import AddReviewForm from './addReviewForm'
import { useParams } from 'react-router-dom'

const ProductInfoReviews = () => {
  const { itemId } = useParams()
  const { commentsEntity, loadCommentsList, commentsIsLoaded, setCommentsIsLoaded, deleteComment } = commentStore()

  useEffect(() => {
    setCommentsIsLoaded(false)
    if (!commentsIsLoaded) {
      loadCommentsList(itemId)
    }
  }, [commentsEntity])

  for (let i = 0; i < commentsEntity.length; i++) {
    console.log('commentsEntity[i].rate :>> ', commentsEntity[i].rate)
    //todo посчитать тут среднее арефм всех кмментарием и показать
    // можно сделать функицю в утилс по вычислению ср числа
    // и отсюда передваать в неё массив чисел рейтингов комментариев этого продукта
    // а можно просто передавать в функцию в утилс массив комментариев
    // и там уже сделать преобразование.. чтобы лишний раз не писать
    // цикл в компонентах, так он будет в одном месте в утилс
  }

  const test = (rateCount) => {
    rateCount = Number(rateCount)
    let testArray = []
    for (let i = 0; i < 5; i++) {
      testArray.push(i)
    }
    return testArray
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
                  <div className='product-reviews-item__ratting'>
                    {test(review.rate).map(rateItem => (
                      <Icon
                        id='rate-star-full'
                        strokeWidth='2' 
                        className={(rateItem < review.rate ? ' active' : '')}
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
