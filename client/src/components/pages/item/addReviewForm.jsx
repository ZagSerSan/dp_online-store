import React, { useEffect, useState } from 'react'
import Icon from '../../common/icon'
import TextField from '../../common/form/textField'
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'
import Textarea from '../../common/form/textarea'
import useStore from '../../../store/createStore'

const AddReviewForm = () => {
  const { authedUser } = useStore()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    name: authedUser ? authedUser.name : '',
    email: authedUser ? authedUser.email : '',
    comment: '',
    rate: 4
  })

  const [rattingState, setRattingState] = useState(data.rate)
  const rattingStars = [
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5}
  ]
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
      console.log('data', data)
      // await authService.register(data)
      // setAuthedUser()
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
          {rattingStars.map(star => (
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
          name="comment"
          value={data.comment}
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