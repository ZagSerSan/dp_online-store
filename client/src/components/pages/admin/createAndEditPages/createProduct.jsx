import React, { useState } from 'react'
import './createProduct.css'
import CreateProductConfig from './createProductConfig'

const CreateProduct = () => {
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'info', title: 'Add product information'},
    {number: 2, contentType: 'options', title: 'Add product options'},
    {number: 3, contentType: 'images', title: 'Add product images'}
  ]

  const toggleSettingItem = (e, settingItemId) => {
    e.stopPropagation()
    setSettingItemState(settingItemId)
  }

  return (
    <div className="my-container">
      <div className='user-page'>
        {settingItems.map(settingItem => (
          <div key={settingItem.number} className={"setting-item" + (settingItemState === settingItem.number ? ' active' : '')}>
            <div
              className="setting-item-clicker"
              onClick={(e) => toggleSettingItem(e, settingItem.number)}
            >
              <div className='setting-item-clicker__number'>{settingItem.number}</div>
              <div className='setting-item-clicker__title'>{settingItem.title}</div>
            </div>
            <div className="setting-item-content">
              <CreateProductConfig
                contentType={settingItem.contentType}
                toggleSettingItem={toggleSettingItem}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreateProduct
