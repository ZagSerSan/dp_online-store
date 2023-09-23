import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ label, options, name, onChange, value }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value })
  }

  return (
    <div className='radio-field'>
      <label>{label}</label>
      {options.map((option) => (
        <div
          key={option.name + '_' + option.value}
          className="input-wrapper"
        >
          <input
            className="form-check-input"
            type="radio"
            name={name}
            id={option.name + '_' + option.value}
            value={option.value}
            checked={option.value === value}
            onChange={handleChange}
          />
          <label
            className="form-check-label"
            htmlFor={option.name + '_' + option.value}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  )
}

RadioField.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
}

export default RadioField