import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import CheckBoxField from '../../common/form/checkBoxField'
import { useTranslation } from 'react-i18next'
import './auth.scss'
import authService from '../../../service/auth.service'
import { getRandomInt } from '../../../utils/helper'
import { Navigate, Link } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'
import userStore from '../../../store/userStore'

const RegisterPage = () => {
  const { setAuthedUser, authorizated } = userStore()
  const [errors, setErrors] = useState({})
  const { t } = useTranslation('auth')

  // значение полей формы
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    // sex: 'male',
    admin: false,
    image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  })

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
    <div className="my-container auth-form-container">
      <div className="authorization-page">
        <h2 className='authorization-page__title'>Register</h2>
        <form className="authorization-page-form" onSubmit={handleSubmit}>
          <TextField
            placeholder="placeholder_name"
            name="name"
            value={data.name}
            onChange={handleChange}
            errors={errors}
          />
          <TextField
            placeholder="placeholder_email"
            name="email"
            value={data.email}
            onChange={handleChange}
            errors={errors}
          />
          <TextField
            placeholder="placeholder_password"
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
          >
            <p className='license-msg'>{t('as_admin')}</p>
          </CheckBoxField>
          <button
            type="submit"
            disabled={!isValid}
            className="submit"
          >
            {t('register')}
          </button>
          <p className='relocate-msg'>
            {t('downLink_login_msg')}
            <Link to='/auth/login'>{t('downLink_login_link')}</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage