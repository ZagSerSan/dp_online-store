import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Textarea = ({ name, label, value, errors, onChange, submitType }) => {
  const [isBlured, setIsBlured] = useState(false)
  
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value }, submitType)
    setIsBlured(true)
  }

  return (
    <div className="textarea">
      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        cols="4" rows="3" placeholder="Message"
        className={
          'form-control ' +
          (!isBlured ? '' : errors[name] ? ' is-invalid' : ' is-valid')
        }
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      />
      {errors && isBlured && <div className="error-msg">{errors[name]}</div>}
    </div>
  )
}
Textarea.defaultValues = {
  type: 'text'
}
Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
}

export default Textarea
