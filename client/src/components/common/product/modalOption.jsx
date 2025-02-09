import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './css/modalOption.css'
import cartStore from '../../../store/cartStore'

const ModalOption = ({ name, options }) => {
  const { cartItemData, cartItemDataWasChanged, setCartItemData, setCartItemDataIsChanged } = cartStore()
  // инициализация состояния cart item'а
  useEffect(() => {
    if (!cartItemDataWasChanged) {
      setCartItemData('setInitialOption', options)
    }
  }, [cartItemDataWasChanged])
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
            disabled={cartItemData.count === 10}
            key={option.value}
            className={'modal-option__button ' + 
              (
                cartItemData.options[option.type] === option.value ||
                cartItemData.options[option.type] === option.value 
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
