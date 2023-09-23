import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import RadioField from '../../common/form/radioField'
import CheckBoxField from '../../common/form/checkBoxField'
import './auth.css'
import authService from '../../../service/auth.service'
import { getRandomInt } from '../../../utils/helper'
import useStore from '../../../store/createStore'
import { Navigate, Link } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'

const RegisterPage = () => {
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    sex: 'male',
    licence: false,
    image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  })
  const { setAuthedUser, authorizated } = useStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    if (!ifValid) return

    try {
      await authService.register(data)
      setAuthedUser()
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

  if (authorizated) {
    return <Navigate to='/home'/>
  }

  return (
    <div className="my-container form-container">
      <h2>Registration</h2>
      {/* <div className="form-container"> */}
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            label="Name:"
            name="name"
            value={data.name}
            onChange={handleChange}
            errors={errors}
          />
          <TextField
            label="Email:"
            name="email"
            value={data.email}
            onChange={handleChange}
            errors={errors}
          />
          <TextField
            label="Password:"
            name="password"
            value={data.password}
            type="password"
            onChange={handleChange}
            errors={errors}
          />
          <RadioField
            options={[
              { name: 'Male', value: 'male' },
              { name: 'Female', value: 'female' },
              { name: 'Other', value: 'other' }
            ]}
            value={data.sex}
            name="sex"
            onChange={handleChange}
          />
          <CheckBoxField
            value={data.licence}
            onChange={handleChange}
            name="licence"
            error={errors.licence}
          >
            Confirm the <a href="">license agreement</a>.
          </CheckBoxField>
          <button
            type="submit"
            disabled={!isValid}
            className=""
          >
            Register
          </button>
          <p className='relocate-msg'>
            If you have account, please <Link to='/auth/login'>Login</Link>
          </p>
        </form>
      {/* </div> */}

    </div>
  )
}

export default RegisterPage