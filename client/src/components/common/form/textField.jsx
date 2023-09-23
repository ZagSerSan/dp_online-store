import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ name, label, value, type, errors, onChange }) => {
  // Добавляем состояние показывать/не показывать пароль
  const [showPassword, setShowPassword] = useState(false)
  // состояние "форма была тронута"
  const [isBlured, setIsBlured] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
    setIsBlured(true)
  }

  // Метод для изменения состояния
  // const toggleShowPassword = () => {
  //   setShowPassword((prevState) => !prevState)
  // }

  // const toogleBluredState = () => {
  //   setIsBlured(true)
  // }

  return (
    <div className="">
      <div className="text-field">
        <label htmlFor={name}>
          {label}
        </label>
        <input
          type={showPassword ? 'text' : type}
          className={
            'form-control ' +
            (!isBlured ? '' : errors[name] ? ' is-invalid' : ' is-valid')
          }
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          // onBlur={toogleBluredState}
        />
        {/* {type === 'password' && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={toggleShowPassword}
          >
            <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}></i>
          </button>
        )} */}
        {errors && isBlured && <div className="error-msg">{errors[name]}</div>}
      </div>
    </div>
  )
}
TextField.defaultValues = {
  type: 'text'
}
TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

export default TextField