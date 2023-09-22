import React, { useEffect, useState } from 'react'
import './auth.css'
import TextField from '../../common/form/textField'
import authService from '../../../service/auth.service'
import useStore from '../../../store/createStore'
import { useNavigate, Navigate, Link } from "react-router-dom"

const LoginPage = () => {
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    email: 'user@example.com',
    password: 'User1234',
  })

  const { setAuthedUser, authorizated } = useStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authService.login(data)
      setAuthedUser()
      navigate('/home')
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

  if (authorizated) {
    return <Navigate to='/home'/>
  }
  
  return (
    <div className="container form-container">
      <h2>Authorization</h2>
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
            // disabled={!isValid}
            className=""
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
