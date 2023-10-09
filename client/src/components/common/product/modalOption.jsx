import React, { useEffect } from 'react'
import './css/modalOption.css'
import useStore from '../../../store/createStore'

const ModalOption = ({ name, type, options }) => {
  const { cartItemData, setCartItemData, cartItemDataWasChanged, setCartItemDataIsChanged } = useStore()

  useEffect(() => {
    options.filter(option => option.selected === true).forEach(option => {
      setCartItemData('option', option)
    })
  }, [])


  const toggleOptions = (e, value) => {
    e.stopPropagation()
    //todo, теперь это вызывается из стора
    setCartItemDataIsChanged(true)

    // setCartItemData(prev => (
    //   {
    //     ...prev,
    //     [type]: value
    //   }
    // ))
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
              (cartItemData.size === option.value || cartItemData.color === option.value ? ' selected' : '')
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
