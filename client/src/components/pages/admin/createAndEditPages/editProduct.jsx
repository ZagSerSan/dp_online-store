import React, { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { filesValidator } from '../../../../utils/filesValidator'
import productStore from '../../../../store/productStore'
import EditProductConfig from './editProductConfig'

const EditProduct = () => {
  const { updateProduct, productsEntity } = productStore()
  const { productId } = useParams()
  const editedProduct = productsEntity.find(product => product._id === productId)

  // clicker items (ui)
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'info', title: 'Basic Information'},
    // {number: 2, contentType: 'discount', title: 'Discount'},
    {number: 2, contentType: 'options', title: 'Product options'},
    {number: 3, contentType: 'images', title: 'Product images'}
  ]
  // переключение типа контента
  const toggleSettingItem = (e, settingItemId) => {
    e.stopPropagation()
    setSettingItemState(settingItemId)
  }

  // обновление информации в зависимости от типа
  const handleSubmit = async (e, contentType, data) => {
    // updUserDataTrigger -> триггер для обновления данный в корзинах пользователей
    e.preventDefault()

    switch (contentType) {
      // обновление простой информации
      case 'info':
        try {
          // проверять название для формирования папок на сервере
          if (editedProduct.type !== data.type) {
            const existedProduct = productsEntity.find(product => product.name.toLowerCase() === data.name.toLowerCase())
            // если такое название уже есть в таком типе продуктов
            if (existedProduct && existedProduct.type === data.type) {
              return
            } else {
              updateProduct({_id: productId, ...data})
              toast.success("Product has been updated :)")
            }
          } else {
            updateProduct({_id: productId, ...data})
            toast.success("Product has been updated :)")
          }
        } catch (error) {
          toast.error("Product has not been updated :(")
        }
        break;
      // обновление опций
      case 'options':
        for (let i = 0; i < Object.keys(data).length; i++) {
          let index = i + 1
          let optionTypeName = `option_${index}`
          data[optionTypeName].options = Object.values(data[optionTypeName].options)
          data[optionTypeName].placeholder = data[optionTypeName].name
        }
        const modalOptionTypes = Object.values(data)

        try {
          updateProduct({_id: productId, modalOptionTypes: modalOptionTypes}, 'options')
          toast.success("Product has been updated :)")
        } catch (error) {
          toast.error("Product has not been updated :(")
        }
        break;
      // обновление картинок
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
          _id: productId,
          files,
          info: {
            introSlider: data.introSlider,
            filesName
          }
        }
        try {
          updateProduct(newProdData_updated, 'images')
          toast.success("Product has been updated :)")
        } catch (error) {
          toast.error("Product has not been updated :(")
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="my-container">
      {editedProduct
        ? <div className='accordion-page'>
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
                  />
                </div>
              </div>
            ))}
          </div>
        : <Navigate to='/admin/products'/>
      }
    </div>
  )
}

export default EditProduct
