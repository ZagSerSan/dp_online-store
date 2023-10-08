import React, { useEffect } from 'react'
import './css/modalOption.css'

const ModalOption = ({ name, type, options, cartData, setCartData, setCartItemDataIsChange }) => {

  useEffect(() => {
    options.filter(option => option.selected === true).forEach(option => {
      setCartData(prev => (
        {
          ...prev,
          [type]: option.value
        }
      ))
    })
  }, [])

  const toggleOptions = (e, value) => {
    e.stopPropagation()
    setCartItemDataIsChange(true)
    setCartData(prev => (
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
              (cartData.size === option.value || cartData.color === option.value ? ' selected' : '')
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
