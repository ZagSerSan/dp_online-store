import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon'

const TextField = ({ name, label, value, type, placeholder, errors, onChange, submitType, optionKey, index, switchErrMsg = true }) => {
  // Добавляем состояние показывать/не показывать пароль
  const [showPassword, setShowPassword] = useState(false)
  // состояние "форма была тронута"
  const [isBlured, setIsBlured] = useState(false)

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value }, submitType, optionKey, index)
    setIsBlured(true)
  }

  // Метод для изменения состояния
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }

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
        name={name}
        value={value}
        onChange={handleChange}
      />
      {type === 'password' && (
        <button
          type="button"
          className="show-password"
          onClick={toggleShowPassword}
        >
          {showPassword ? <Icon id='eye-off'/> : <Icon id='eye'/>}
        </button>
      )}
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
  value: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  type: PropTypes.string,
  submitType: PropTypes.string,
  placeholder: PropTypes.string,
  optionKey: PropTypes.string,
  index: PropTypes.number,
  switchErrMsg: PropTypes.bool,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

export default TextField
