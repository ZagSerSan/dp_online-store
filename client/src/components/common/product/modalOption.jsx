import React, { useEffect } from 'react'
import './css/modalOption.css'

const ModalOption = ({ name, type, options, data, setData }) => {

  console.log('data :>> ', data)

  useEffect(() => {
    options.filter(option => option.selected === true).forEach(option => {
      setData(prev => (
        {
          ...prev,
          [type]: option.value
        }
      ))
    })
  }, [])

  const toggleOptions = (e, value) => {
    e.stopPropagation()
    // const target = e.target
    setData(prev => (
      {
        ...prev,
        [type]: value
      }
    ))
    return null
  }

  return (
    <div className='modal-option'>
      <h4 className='modal-option__title'>{name}:</h4>
      <div>
        {options && options.map(option => (
          <button
            key={option.value}
            className={'modal-option__button ' + 
              (data.size === option.value || data.color === option.value ? ' selected' : '')
            }
            onClick={(e) => toggleOptions(e, option.value)}
          >
            {option.value}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ModalOption
