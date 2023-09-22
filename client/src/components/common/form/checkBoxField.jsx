import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import style from './form.module.css'

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const [isBlured, setIsBlured] = useState(false)

  const handleChange = () => {
    onChange({name, value: !value})
    setIsBlured(true)
  }

  // const getValidationClasses = () => {
  //   return error ? ' is-invalid' : ' is-valid'
  // }

  return (
    <div className='checkbox-field'>
      <input
        // onBlur={getValidationClasses}
        className="form-check-input"
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
      />
      <label htmlFor={name}>
        {children}
      </label>
      {error && isBlured && <div className="error-msg">{error}</div>}
    </div>
  )
}

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  error: PropTypes.string
}

export default CheckBoxField
