import React from 'react'
import Icon from '../../common/icon'

const AddReviewForm = () => {
  return (
    <div className='product-reviews-add-form'>
      <p className="title">ADD YOUR COMMENTS :</p>
      <div className="subtitle">
        <p>Rating:</p>
        <div>
          <Icon id='rate-star-full' strokeWidth='2'/>
          <Icon id='rate-star-full' strokeWidth='2'/>
          <Icon id='rate-star-full' strokeWidth='2'/>
          <Icon id='rate-star-full' strokeWidth='2' className='empty'/>
          <Icon id='rate-star-full' strokeWidth='2' className='empty'/>
          (3)
        </div>
      </div>
      <form className="form">
        <div className="flex">
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="Email"/>
        </div>
        <textarea name="" id="" cols="4" rows="3" placeholder="Message"></textarea>
        <button>add review</button>
      </form>
    </div>
  )
}

export default AddReviewForm