import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
// utils, state, ect
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'
import userStore from '../../../store/userStore'
// components
import Icon from '../../common/icon'
import TextField from '../../common/form/textField'
import Textarea from '../../common/form/textarea'
// import CommentService from '../../../service/comment.service'
import commentStore from '../../../store/commentStore'
import { ratingStarsHelper } from '../../../utils/rateCountHelper'

const AddReviewForm = () => {
  const { itemId } = useParams()
  const { authedUser } = userStore()
  const { addComment } = commentStore()
  const [errors, setErrors] = useState({})
  // значение полей формы
  let initialState = {
    productId: itemId,
    userId: authedUser ? authedUser._id : '',
    name: authedUser ? authedUser.name : '',
    email: authedUser ? authedUser.email : '',
    content: '',
    rate: 4
  }

  const [data, setData] = useState(initialState)
  const [rattingState, setRattingState] = useState(data.rate)

  useEffect(() => {
    setData(prev => (
      {
        ...prev,
        userId: authedUser ? authedUser._id : '',
        name: authedUser ? authedUser.name : '',
        email: authedUser ? authedUser.email : '',
      }
    ))
  }, [authedUser])


  const rateStarElements = document.querySelectorAll('.interactive-ratting-function')
  rateStarElements.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
      if (e.target.id) {
        setRattingState(e.target.id)
        setData(prev => ({
          ...prev,
          rate: e.target.id
        }))
      }
    })
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    if (!ifValid) return

    try {
      addComment(data)
      setData(initialState)
    } catch (e) {
      console.log('e', e)
    }
  }

  const handleChange = ({ name, value }) => {
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // validation
  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  return (
    <div className='product-reviews-add-form'>
      <p className="title">ADD YOUR COMMENTS :</p>
      <div className="subtitle interactive-ratting-function">
        <p>Rating:</p>
        <div>
          {ratingStarsHelper.map(star => (
            <button
              id={star.value}
              key={star.value}
              className={'star interactive-ratting-function'}
            >
              <Icon id='rate-star-full' strokeWidth='2' className={(rattingState > (star.value - 1) ? ' active' : '')}/>
            </button>
          ))}
          <span>({rattingState})</span>
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex">
          <TextField
            // label="Name:"
            name="name"
            value={data.name}
            placeholder='Name'
            onChange={handleChange}
            errors={errors}
          />
          <TextField
            // label="Email:"
            name="email"
            value={data.email}
            placeholder='Email'
            onChange={handleChange}
            errors={errors}
          />
        </div>
        <Textarea
          // label="Comment:"
          name="content"
          value={data.content}
          onChange={handleChange}
          errors={errors}
        />
          <button
            type="submit"
            disabled={!isValid}
            className={'submit' + (!isValid ? ' disabled' : '')}
          >
            add review
          </button>
      </form>
    </div>
  )
}

export default AddReviewForm