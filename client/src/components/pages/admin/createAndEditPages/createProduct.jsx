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
  const [productType, setProductType] = useState()

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
        for (let i = 0; i < Object.keys(data).length; i++) {
          let index = i + 1
          let optionTypeName = `option_${index}`
          data[optionTypeName].options = Object.values(data[optionTypeName].options)
        }
        const modalOptionTypes = Object.values(data)
        setNewProdData(prev => ({...prev, modalOptionTypes}))
        break;

      case 'images':
        //todo валидация количества изхобрадений
        // console.log('data :>> ', data)

        // проверка чекбокса
        if (!data.introSlider.switched || (data.introSlider.switched && !!data.images.intro)) {
          // проверка остальных файлов
          if (!!data.images.preview && !!data.images.sliders && !!data.images.dots) {
            if (Object.keys(data.images.dots).length === Object.keys(data.images.sliders).length) {
              console.log('валидно')
            }
            return
          } else {
            console.log('НЕ валидно по прочим файлам')
            return
          }
        } else {
          console.log('НЕ валидно по чекбоксу')
          return
        }


        //* формируем data для отправки на сервер
        //* получения названий файлов
        const filesName = {
          preview: [],
          sliders: [],
          dots: [],
          intro: []
        }
        const files = {}
        // индекс для перечня файлов
        let customIndex = 0

        Object.keys(data.images).forEach((key, index) => {
          for (let y = 0; y < data.images[key].length; y++) {
            filesName[key] = [...filesName[key], data.images[key][y].name]
          }
        })

        Object.keys(data.images).forEach((key, index) => {
          for (let y = 0; y < data.images[key].length; y++) {
            files[customIndex] = data.images[key][y]
            customIndex += 1
          }
        })

        const newProdData_updated = {
          ...newProdData,
          introSlider: data.introSlider,
          filesName
        }

        // console.log('newProdData_updated :>> ', newProdData_updated)
        // console.log('files :>> ', files)
        
        // ProductService.createProductImages(
        //   files,
        //   {productName: newProdData.name, type: newProdData.type}
        // )
        // createNewProduct(newProdData_updated)
        // navigate('/admin/products')
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
