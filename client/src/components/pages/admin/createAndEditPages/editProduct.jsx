import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import './css/createProduct.css'
import { filesValidator } from '../../../../utils/filesValidator'
import ProductService from '../../../../service/product.service'
import productStore from '../../../../store/productStore'
import EditProductConfig from './editProductConfig'

const EditProduct = () => {
  const { updateProduct, productsEntity } = productStore()
  const { productId } = useParams()
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'info', title: 'Add product information'},
    {number: 2, contentType: 'options', title: 'Add product options'},
    {number: 3, contentType: 'images', title: 'Add product images'}
  ]
  const [newProdData, setNewProdData] = useState({})
  const [productType, setProductType] = useState()

  const toggleSettingItem = (e, settingItemId) => {
    e.stopPropagation()
    setSettingItemState(settingItemId)
  }

  const handleSubmit = async (e, contentType, data) => {
    e.preventDefault()

    switch (contentType) {
      case 'info':
        const editedProduct = productsEntity.find(product => product._id === productId)
        // проверять название для формирования папок на сервере
        if (editedProduct.type !== data.type) {

          const existedProduct = productsEntity.find(product => product.name.toLowerCase() === data.name.toLowerCase())
          // если такое название уже есть в таком типе продуктов
          if (existedProduct && existedProduct.type === data.type) {
            return
          } else {
            updateProduct({_id: productId, ...data})
          }
        } else {
          updateProduct({_id: productId, ...data})
        }
        break;

      case 'options':
        for (let i = 0; i < Object.keys(data).length; i++) {
          let index = i + 1
          let optionTypeName = `option_${index}`
          data[optionTypeName].options = Object.values(data[optionTypeName].options)
          data[optionTypeName].placeholder = data[optionTypeName].name
        }
        const modalOptionTypes = Object.values(data)

        updateProduct({_id: productId, modalOptionTypes: modalOptionTypes})
        break;

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

        const newProdData_updated = {
          ...newProdData,
          introSlider: data.introSlider,
          filesName
        }

        ProductService.createProductImages(
          files,
          {productName: newProdData.name, type: newProdData.type}
        )
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
              className="accordion-page-item-clicker"
              onClick={(e) => toggleSettingItem(e, settingItem.number)}
            >
              <div className='accordion-page-item-clicker__number'>{settingItem.number}</div>
              <div className='accordion-page-item-clicker__title'>{settingItem.title}</div>
            </div>
            <div className="accordion-page-item-content">
              <EditProductConfig
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

export default EditProduct
