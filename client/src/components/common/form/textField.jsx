import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = ({ name, label, value, type, placeholder, errors, onChange, submitType, switchErrMsg = true }) => {
  // Добавляем состояние показывать/не показывать пароль
  const [showPassword, setShowPassword] = useState(false)
  // состояние "форма была тронута"
  const [isBlured, setIsBlured] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value }, submitType)
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
    <div className="text-field">
      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        type={showPassword ? 'text' : type}
        className={(!isBlured ? '' : errors?.[name] ? 'is-invalid' : 'is-valid')}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
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
      {switchErrMsg && (
        errors && isBlured && <div className="error-msg">{errors[name]}</div>
      )}
    </div>
  )
}
TextField.defaultValues = {
  type: 'text'
}
TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  submitType: PropTypes.string,
  placeholder: PropTypes.string,
  switchErrMsg: PropTypes.bool,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

export default TextField
