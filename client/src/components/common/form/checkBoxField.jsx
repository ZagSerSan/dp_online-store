import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './checkBoxField.css'

const CheckBoxField = ({ name, value, submitType, onChange, children, error }) => {
  const [isBlured, setIsBlured] = useState(false)

  const handleChange = () => {
    onChange({name, value: !value}, submitType, 'state')

    setIsBlured(true)
  }

  return (
    <div className='checkbox-field'>
      <div>
        <input
          type="checkbox"
          value={value}
          checked={value}
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
