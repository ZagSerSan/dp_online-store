import React, { useState } from 'react'
import TextField from '../../common/form/textField'
import RadioField from '../../common/form/radioField'
import CheckBoxField from '../../common/form/checkBoxField'
import './auth.css'

const RegisterPage = () => {
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    name: 'User',
    email: 'user@example.com',
    password: 'User1234',
    sex: 'male',
    licence: false
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
  }
  const handleChange = ({ name, value }) => {
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="container form-container">
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
            // disabled={!isValid}
            className="btn btn-primary w-100 mx-auto"
          >
            Register
          </button>
          {/* <p className="mt-2">
            If you have account, please <Link to="/Login">Sign in</Link>
          </p> */}
        </form>
      {/* </div> */}

    </div>
  )
}

export default RegisterPage