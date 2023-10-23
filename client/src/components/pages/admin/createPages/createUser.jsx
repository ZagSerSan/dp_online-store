import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
// import './auth.css'
import { validator } from '../../../../utils/validator'
import { validatorConfig } from '../../../../utils/validatorConfig'
import { getRandomInt } from '../../../../utils/helper'
import authService from '../../../../service/auth.service'
import userStore from '../../../../store/userStore'
import TextField from '../../../common/form/textField'
import CheckBoxField from '../../../common/form/checkBoxField'

const CreateUser = () => {
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    admin: false,
    image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  })
  const { setAuthedUser, authorizated } = userStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    if (!ifValid) return

    try {
      const role = 'create'
      await authService.register(data, role)
      return <Navigate to='/admin'/>
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

  return (
    <div className="my-container form-container">
      <h2 className='authorization-page__title'>Create User</h2>
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          placeholder="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          errors={errors}
        />
        <TextField
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          errors={errors}
        />
        <TextField
          placeholder="Password"
          name="password"
          value={data.password}
          type="password"
          onChange={handleChange}
          errors={errors}
        />
        <CheckBoxField
          value={data.admin}
          onChange={handleChange}
          name="admin"
          // error={errors.admin}
        >
          <p className='license-msg'>As an admin.</p>
        </CheckBoxField>
        <button
          type="submit"
          disabled={!isValid}
          className="submit"
        >
          Create
        </button>
        <p className='relocate-msg'>
          If you have account, please <Link to='/auth/login'>Login</Link>
        </p>
      </form>
      <Link to='/admin'>back</Link>
    </div>
  )
}

export default CreateUser
