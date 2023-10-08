import React, { useEffect, useState } from 'react'
import './auth.css'
import TextField from '../../common/form/textField'
import authService from '../../../service/auth.service'
import useStore from '../../../store/createStore'
import { useNavigate, Navigate, Link } from "react-router-dom"
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'

const LoginPage = () => {
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const { setAuthedUser, authorizated } = useStore()
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
    <div className="my-container form-container pt-[80px]">
      <h2 className='mb-[20px] text-[34px]'>Authorization</h2>
        <form className="form" onSubmit={handleSubmit}>
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
          {/* <CheckBoxField
            value={data.licence}
            onChange={handleChange}
            name="licence"
            error={errors.licence}
          >
            Confirm the <a href="">license agreement</a>.
          </CheckBoxField> */}
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
  )
}

export default LoginPage
