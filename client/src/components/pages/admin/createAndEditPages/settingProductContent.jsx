import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validatorConfig } from '../../../../utils/validatorConfig'
import { validator } from '../../../../utils/validator'
import TextField from '../../../common/form/textField'
import Textarea from '../../../common/form/textarea'
import productStore from '../../../../store/productStore'
import commentStore from '../../../../store/commentStore'
import { ratingStarsHelper } from '../../../../utils/rateCountHelper'
import Icon from '../../../common/icon'
import AddReviewForm from '../../item/addReviewForm'
import { formatDate } from '../../../../utils/formatDate'

const SettingProductContent = ({ contentType, editedProduct }) => {
  const navigate = useNavigate()
  const { updateProduct } = productStore()
  const [errors, setErrors] = useState({})

  // значение полей формы
  const [dataInfo, setDataInfo] = useState({
    _id: editedProduct._id,
    name: editedProduct ? editedProduct.name : '',
    title: editedProduct ? editedProduct.title : '',
    price: editedProduct ? editedProduct.price : '',
    description: editedProduct ? editedProduct.description : ''
  })

  useEffect(() => {
    setDataInfo(prev => (
      {
        ...prev,
        name: editedProduct ? editedProduct.name : '',
        title: editedProduct ? editedProduct.title : '',
        price: editedProduct ? editedProduct.price : '',
        description: editedProduct ? editedProduct.description : ''
      }
    ))
  }, [editedProduct])

  const handleSubmit = async (e, submitType) => {
    e.preventDefault()
    const ifValid = validate(submitType)
    if (!ifValid) return

    switch (submitType) {
      case 'info':
        console.log('dataInfo :>> ', dataInfo)
        updateProduct(dataInfo)
        break;
      case 'comments':
        console.log('comments :>> ...',)
        // updateUser(dataPassword)
        // setDataPassword(dataPasswordInitState)
        break;
      case 'images':
        console.log('images :>> ...',)
        // updateUser(dataPassword)
        // setDataPassword(dataPasswordInitState)
        break;
      default:
        break;
    }
    navigate('/admin/products')
  }

  const handleChange = (payload, submitType) => {
    let { name, value } = payload
    switch (submitType) {
      case 'info':
        setDataInfo(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      case 'price':
        value = Number(value)
        if (!isNaN(value)) {
          setDataInfo(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      // case 'images':
      //   setDataImages(prev => ({
      //     ...prev,
      //     [name]: value
      //   }))
      //   break;
      default:
        break;
    }
    
    // setData(prev => ({
    //   ...prev,
    //   [name]: value
    // }))
  }

  useEffect(() => {
    validate()
  }, [dataInfo])

  const validate = () => {
    const errors = validator(dataInfo, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  return (<>
    {contentType === 'images'
      ? (
        <div>
          <div className="setting-product-content__title">Product Images</div>
          <div className="setting-product-content__subtitle">Edit previews and sliders</div>
          <form className="setting-product-content-form-container" onSubmit={(e) => handleSubmit(e, 'images')}>
            <div className="setting-product-content-form-container__col">
              <div className="setting-product-content-form-container__row">
                {contentType}
              </div>
            </div>
            <div className="setting-item-content-form-container__col">
              <button
                type="submit"
                disabled={!isValid}
                className="submit"
              >
                Save data
              </button>
            </div>
          </form>
        </div>
      )
      : contentType === 'comments'
      ? (
        <div>
          <div className="setting-product-content__title">Product Comments</div>
          <div className="setting-product-content__subtitle">Watch and delete users comments</div>
          <div className="setting-product-content-form-container__col">
            <div className='reviews'>
              {commentsEntity
                ? (
                  commentsEntity.length !== 0
                    ? commentsEntity.map(review => (
                    <div key={review._id} className="product-reviews-item">
                      <div className="product-reviews-item__col">
                        <div className='product-reviews-item__ratting'>
                          {ratingStarsHelper.map(rateItem => (
                            <Icon
                              key={rateItem.value}
                              id='rate-star-full'
                              strokeWidth='2' 
                              className={(rateItem.value <= review.rate ? ' active' : '')}
                            />
                          ))}
                          ({review.rate})
                        </div>
                        <p className='product-reviews-item__name-data'>
                          <span>{review.name}</span>
                          <span>{formatDate(review.created_at, 'hours')}</span>
                          <span>{formatDate(review.created_at, 'year')}</span>
                          <button onClick={() => deleteComment(review._id)}>
                            <Icon id='close' />
                          </button>
                        </p>
                      </div>
                      <div className="product-reviews-item__col">
                        <p className='product-reviews-item__description'>{review.content}</p>
                      </div>
                    </div>
                  )) : <p>no comments</p>
                ) : 'loading...'
              }
            </div>
            <AddReviewForm productId={editedProduct._id}/>
          </div>
        </div>
      )
      : (
        <div>
          <div className="setting-product-content__title">Product Information</div>
          <div className="setting-product-content__subtitle">Edit Product Information</div>
          <form className="setting-product-content-form-container" onSubmit={(e) => handleSubmit(e, 'info')}>
            <div className="setting-product-content-form-container__col">
              <div className="setting-product-content-form-container__row">
                <TextField
                  label='Name:'
                  placeholder="Enter product name"
                  name="name"
                  value={dataInfo.name}
                  onChange={handleChange}
                  errors={errors}
                  submitType='info'
                />
                <TextField
                  label='Title:'
                  placeholder="Enter product title"
                  name="title"
                  value={dataInfo.title}
                  onChange={handleChange}
                  errors={errors}
                  submitType='info'
                />
                <TextField
                  label='Price:'
                  placeholder="Enter product price"
                  name="price"
                  value={String(dataInfo.price)}
                  onChange={handleChange}
                  errors={errors}
                  submitType='price'
                />
              </div>
              <div className="setting-product-content-form-container__row">
                <Textarea
                  label="Description:"
                  name="description"
                  value={dataInfo.description}
                  onChange={handleChange}
                  errors={errors}
                  submitType='info'
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="submit"
            >
              Save data
            </button>
            {/* <div className="setting-product-content-form-container__col">
              <div className="setting-product-content-form-container__row"></div>
              <div className="setting-product-content-form-container__row"></div>
            </div> */}
          </form>
        </div>
      )
    }
  </>
  )
}

export default SettingProductContent
