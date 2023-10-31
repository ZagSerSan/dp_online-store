import React, { useEffect, useState } from 'react'
import './../../auth/auth.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { validator } from '../../../../utils/validator'
import { validatorConfig } from '../../../../utils/validatorConfig'
import { getRandomInt } from '../../../../utils/helper'
import userStore from '../../../../store/userStore'
import TextField from '../../../common/form/textField'
import CheckBoxField from '../../../common/form/checkBoxField'

const CreateUser = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const initDataState = {
    name: '',
    email: '',
    password: '',
    admin: false,
    image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  }
  const [data, setData] = useState(initDataState)
  const { createUser } = userStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    if (!ifValid) return

    await createUser(data)
    await setData(initDataState)
    navigate('/admin/users')
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
    <div className="my-container auth-form-container">
      <div className="authorization-page">
        <h2 className='authorization-page__title'>Create User</h2>
        <form className="authorization-page-form" onSubmit={handleSubmit}>
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
          <Link className='back-btn' to='/admin'>back</Link>
        </form>
      </div>
    </div>
  )
}

export default CreateUser
