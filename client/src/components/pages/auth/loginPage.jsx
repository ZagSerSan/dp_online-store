import React, { useEffect, useState } from 'react'
import './auth.css'
import TextField from '../../common/form/textField'
import authService from '../../../service/auth.service'
import { useNavigate, Navigate, Link } from "react-router-dom"
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'
import userStore from '../../../store/userStore'

const LoginPage = () => {
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const { setAuthedUser, authorizated } = userStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    if (!ifValid) return

    try {
      await authService.login(data)
      setAuthedUser()
      navigate('/home')
    } catch (e) {
      console.log('e', e)
      const errorType = e.response.data.error.message
      if (errorType === 'EMAIL_NOT_FOUND') {
        setErrors({email: 'Email not found!'})
      }
      if (errorType === 'INVALID_PASSWORD') {
        setErrors({password: 'Invalid password!'})
      }
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
        <h2 className='authorization-page__title'>Login</h2>
        <form className="authorization-page-form" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={!isValid}
            className="submit"
          >
            Login
          </button>
          <p className="relocate-msg">
            If you does not have account, please <Link to='/auth/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
