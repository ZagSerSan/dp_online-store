import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './css/modalOption.css'
import cartStore from '../../../store/cartStore'

const ModalOption = ({ name, options }) => {
  const { cartItemData, setCartItemData, setCartItemDataIsChanged } = cartStore()

  // инициализация состояния cart item'а
  useEffect(() => {
    setCartItemData('setInitialOption', options)
  }, [])
  // переключение опшинов
  const toggleOptions = (e, option) => {
    e.stopPropagation()
    setCartItemDataIsChanged(true)
    setCartItemData('toggleOption', option)
  }

  return (
    <div className='modal-option'>
      <h4 className='modal-option__title'>{name}:</h4>
      <div>
        {options && options.map(option => (
          <button
            key={option.value}
            className={'modal-option__button ' + 
              (
                cartItemData.optionTypes[option.type] === option.value ||
                cartItemData.optionTypes[option.type] === option.value 
                  ? ' selected' : ''
              )
            }
            onClick={(e) => toggleOptions(e, option)}
          >
            {option.value}
          </button>
        ))}
      </div>
    </div>
  )
}

ModalOption.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array 
}

export default ModalOption
