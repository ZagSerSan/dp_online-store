import React, { useState } from 'react'
import './css/createProduct.css'
import CreateProductConfig from './createProductConfig'
import useStore from '../../../../store/createStore'
import ProductService from '../../../../service/product.service'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  const navigate = useNavigate()
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'info', title: 'Add product information'},
    {number: 2, contentType: 'options', title: 'Add product options'},
    {number: 3, contentType: 'images', title: 'Add product images'}
  ]
  const [newProdData, setNewProdData] = useState({})

  //todo test state: type
  const { productsEntity } = useStore() 
  const { createNewProduct, createNewProductImages } = useStore()
  const [productType, setProductType] = useState()
  let _folderNum = productsEntity.filter(item => item.type === productType).length + 1

  const toggleSettingItem = (e, settingItemId) => {
    e.stopPropagation()
    setSettingItemState(settingItemId)
  }

  const handleSubmit = async (e, contentType, data) => {
    e.preventDefault()
    // const ifValid = validate()
    // if (!ifValid) return

    switch (contentType) {

      case 'info':
        setNewProdData(prev => ({ ...prev, ...data }))
        setProductType(data.type)
        break;

      case 'options':
        // console.log(`${contentType} data:`, data)
        for (let i = 0; i < Object.keys(data).length; i++) {
          let index = i + 1
          let optionTypeName = `option_${index}`
          data[optionTypeName].options = Object.values(data[optionTypeName].options)
        }
        const modalOptionTypes = Object.values(data)
        setNewProdData(prev => ({...prev, modalOptionTypes}))
        break;

      case 'images':
        setNewProdData(prev => ({ ...prev, ...data }))
        //* формируем data для отправки на сервер

        //todo

        ProductService.createProductImages(data, {type: newProdData.type, folderNum: _folderNum})

        const newProdData_updated = {
          ...newProdData,
          _folderNum
        }
        
        //* готовая data для отправки на сервер
        // console.log('newProdData_updated :>> ', newProdData_updated)

        //todo отправка на сервер
        createNewProduct(newProdData_updated)
        navigate('/admin/products')
        break;

      default:
        break;
    }
  }

  return (
    <div className="my-container">
      <div className='user-page'>
        {settingItems.map(settingItem => (
          <div key={settingItem.number} className={"setting-item" + (settingItemState === settingItem.number ? ' active' : '')}>
            <div
              className="setting-item-clicker no-click"
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
                productType={productType}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreateProduct
