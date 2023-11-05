import React, { useState } from 'react'
// store, service
import productStore from '../../../../store/productStore'
import ProductService from '../../../../service/product.service'
// utils
import { useNavigate } from 'react-router-dom'
import { filesValidator } from '../../../../utils/filesValidator'
// components
import CreateProductConfig from './createProductConfig'

const CreateProduct = () => {
  const navigate = useNavigate()
  const { createNewProduct } = productStore()
  const [newProdData, setNewProdData] = useState({})
  const [productType, setProductType] = useState()
  // clicker items (ui)
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'info', title: 'Add product information'},
    {number: 2, contentType: 'options', title: 'Add product options'},
    {number: 3, contentType: 'images', title: 'Add product images'}
  ]
  // переключение типа контента
  const toggleSettingItem = (e, settingItemId) => {
    e.stopPropagation()
    setSettingItemState(settingItemId)
  }
  // отправка данных
  const handleSubmit = async (e, contentType, data) => {
    e.preventDefault()

    // последовательно формировать инфу нового продукта
    switch (contentType) {
      // отправка данных первой настройки
      case 'info':
        setNewProdData(prev => ({ ...prev, ...data }))
        setProductType(data.type)
        break;
      // второй - опции продукта
      case 'options':
        for (let i = 0; i < Object.keys(data).length; i++) {
          let index = i + 1
          let optionTypeName = `option_${index}`
          data[optionTypeName].options = Object.values(data[optionTypeName].options)
        }
        const modalOptionTypes = Object.values(data)
        setNewProdData(prev => ({...prev, modalOptionTypes}))
        break;
      // третей - картинки продукта
      case 'images':
        // images validate
        const isNotValid = filesValidator(data)
        if (isNotValid) return

        // формируем data для отправки на сервер
        const filesName = {
          preview: [],
          sliders: [],
          dots: [],
          intro: []
        }
        const files = {}
        // индекс для перечня файлов
        let customIndex = 0

        // получения названий файлов
        Object.keys(data.images).forEach((key, index) => {
          for (let y = 0; y < data.images[key].length; y++) {
            filesName[key] = [...filesName[key], data.images[key][y].name]
          }
        })
        // получения файлов отдельно
        Object.keys(data.images).forEach((key, index) => {
          for (let y = 0; y < data.images[key].length; y++) {
            files[customIndex] = data.images[key][y]
            customIndex += 1
          }
        })
        // формирование готовой сущности
        const newProdData_updated = {
          ...newProdData,
          introSlider: data.introSlider,
          filesName
        }
        // send to server - создание картинок на сервере
        ProductService.createProductImages(
          files,
          {productName: newProdData.name, type: newProdData.type}
        )
        // send to server - создание инфо-сущности в bd
        createNewProduct(newProdData_updated)
        
        navigate('/admin/products')
        break;
      default:
        break;
    }
  }

  return (
    <div className="my-container">
      <div className='accordion-page'>
        {settingItems.map(settingItem => (
          <div key={settingItem.number} className={"accordion-page-item" + (settingItemState === settingItem.number ? ' active' : '')}>
            <div
              className="accordion-page-item-clicker no-click"
            >
              <div className='accordion-page-item-clicker__number'>{settingItem.number}</div>
              <div className='accordion-page-item-clicker__title'>{settingItem.title}</div>
            </div>
            <div className="accordion-page-item-content">
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
