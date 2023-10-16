import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CheckBoxField = ({ name, value, onChange, children, error }) => {
  const [isBlured, setIsBlured] = useState(false)

  const handleChange = () => {
    onChange({name, value: !value})
    setIsBlured(true)
  }

  return (
    <div className='checkbox-field'>
      <div>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={name}
          onChange={handleChange}
        />
        <label htmlFor={name}>
          {children}
        </label>
      </div>
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
