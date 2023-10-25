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
  const [newProdData, setNewProdData] = useState({})

  console.log('settingItemState :>> ', settingItemState)
  const toggleSettingItem = (e, settingItemId) => {
    console.log('settingItemId :>> ', settingItemId)
    e.stopPropagation()
    setSettingItemState(settingItemId)
  }

  const handleSubmit = async (e, contentType, data) => {
    e.preventDefault()
    // const ifValid = validate()
    // if (!ifValid) return

    switch (contentType) {
      case 'info':
        // console.log(`${contentType} data:`, data)
        setNewProdData(prev => ({ ...prev, ...data }))
        break;
      case 'options':
        console.log(`${contentType} data:`, data)
        for (let i = 0; i < Object.keys(data).length; i++) {
          let index = i + 1
          let optionTypeName = `option_${index}`
          data[optionTypeName].options = Object.values(data[optionTypeName].options)
        }
        const modalOptionTypes = Object.values(data)
        setNewProdData(prev => ({...prev, modalOptionTypes}))
        break;
      case 'images':
        console.log(`${contentType} data:`, data)
        break;
      default:
        break;
    }

    //todo
    // createUser(data)
    // navigate('/admin/products')
  }

  console.log('newProdData', newProdData)

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
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreateProduct
