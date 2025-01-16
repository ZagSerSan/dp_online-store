import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'
// utils
import { filesValidator } from '../../../../utils/filesValidator'
import { validator } from '../../../../utils/validator'
import { validatorConfig } from '../../../../utils/validatorConfig'
import { tranformOptionsData } from '../../../../utils/tranformOptionsData'
// store, components
import productStore from '../../../../store/productStore'
import RadioField from '../../../common/form/radioField'
import TextField from '../../../common/form/textField'
import Textarea from '../../../common/form/textarea'
import CheckBoxField from '../../../common/form/checkBoxField'
import { formatDate } from '../../../../utils/formatDate'
import SelectDate from '../../../common/timer/SelectDate'

//todo чекбокс для перезаписи обновлённой инфы о скидке продуктов в корзине пользователя
//todo (modify) - расширить функционал скидки до нескольких (2 и больше) 

const EditProductConfig = ({ contentType, toggleSettingItem, handleSubmit }) => {
  const { productId } = useParams()
  const { productsEntity } = productStore()
  const [imagesDataError, setImagesDataError] = useState()
  const [errors, setErrors] = useState({})
  const currentProduct = productsEntity
    ? productsEntity.find(product => product._id === productId)
    : null

  const [isProductOnSale, setIsProductOnSale] = useState(
    currentProduct.discount.endTime < Date.now() ? false : true
  )

  useEffect(() => {
    currentProduct?.discount?.endTime > Date.now()
      ? setIsProductOnSale(true)
      : setIsProductOnSale(false)
  }, [])

  //* значение полей формы info
  const initInfoData = {
    _id: productId,
    name: currentProduct ? currentProduct.name : '',
    type: currentProduct ? currentProduct.type : '',
    title: currentProduct ? currentProduct.title : '',
    price: currentProduct ? currentProduct.price : '',
    description: currentProduct ? currentProduct.description : '',
    discount: {
      ...currentProduct.discount
    },
  }
  const [data, setData] = useState(initInfoData)

  //* значение полей формы options
  const initOptionsData = {
    option_1: {
      name: '',
      placeholder: 'Size',
      options: {
        0: {type: 'size', value: '', placeholder: '3ml', selected: true},
        1: {type: 'size', value: '', placeholder: '6ml', selected: false}
      }
    },
    option_2: {
      name: '',
      placeholder: 'Color',
      options: {
        0: {type: 'color', value: '', placeholder: 'defaulf', selected: true},
        1: {type: 'color', value: '', placeholder: 'black', selected: false}
      }
    },
  }
  const [optionsData, setOptionsData] = useState(currentProduct
    ? tranformOptionsData(currentProduct.modalOptionTypes)
    : initOptionsData
  )

  //* ImageData
  const initImagesData = {
    introSlider: {
      switched: false,
    },
    images: {}
  }
  const [imageData, setImageData] = useState(initImagesData)

  // функции редактирования данных (картинок и других)
  const changeImageData = (e, files, filesType) => {
    // e.preventDefault()

    switch (filesType) {
      case 'checkbox':
        if (imageData.introSlider.switched) {
          const newImagesStateObj = imageData.images
          delete newImagesStateObj.intro
          setImageData(prev => ({
            ...prev,
            introSlider: {
              switched: false,
            },
            images: {
              ...prev.images,
              ...newImagesStateObj
            }
          }))
        } else {
          setImageData(prev => ({
            ...prev,
            introSlider: {
              switched: true,
            }
          }))
        }
        break
      case 'intro':
        setImageData(prev => ({
          ...prev,
          images: {
            ...prev.images,
            intro: files
          }
        }))
        break
      case 'preview':
        setImageData(prev => ({
          ...prev,
          images: {
            ...prev.images,
            preview: files
          }
        }))
        break
      case 'sliders':
        setImageData(prev => ({
          ...prev,
          images: {
            ...prev.images,
            sliders: files
          }
        }))
        break
      case 'dots':
        setImageData(prev => ({
          ...prev,
          images: {
            ...prev.images,
            dots: files
          }
        }))
        break
      default:
        break
    }
  }

  const handleChange = (payload, submitType, optionKey, index) => {
    let { name, value } = payload

    switch (submitType) {
      case 'info':
        setData(prev => ({
          ...prev,
          [name]: value
        }))
        break
      case 'price':
        value = Number(value)
        if (!isNaN(value)) {
          setData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break
      case 'discount':
        // изменение состояния discount для отправки на сервер
        // изменение name из-за её конфликта в radio селектах
        // если трогаем discountType, то name = type, в остальн случ name по умолчанию
        if (name === 'discountValue') {
          value = Number(value)
          // вводятся ли цифры в value?
          if (!isNaN(value)) {
            name = 'value'
            // value на % тне может быть больше чем 100, и не fixed > price
            if (data.discount.type === 'percentage' && value > 100) {
              value = 100
            } else if ((data.discount.type === 'fixed' || data.discount.type === 'shipping') && value > data.price) {
              value = data.price
            }
          } else {
            return
          }
        } else if (name === 'discountType') {
          name = 'type'
        }

        setData(prev => ({
          ...prev,
            discount: {
              ...prev.discount,
              [name]: value
            },
        }))
        break
      case 'onSale':
        // переключение чекбокса скидки
          //? todo(опционально) - обновлять продукты корзины пользователя при изменении времени скидки
          if (isProductOnSale) {
            // при отключении деактивировать скидку путём обнуления времени
            setData(prev => ({
              ...prev,
                discount: {
                  ...prev.discount,
                  endTime: 0
                },
            }))
          } else {
            // при включении активировать скидку путём добавления времени
            setData(prev => ({
              ...prev,
                discount: {
                  ...prev.discount,
                  endTime: Date.now() + (1000 * 60 * 60 * 24) // + 1 день
                },
            }))
          }          
          // переключения чек-бокса
          setIsProductOnSale(prev => !prev)
          break
      case 'option-type':
        setOptionsData(prev => {
          for (let i = 0; i < Object.keys(prev[optionKey].options).length; i++) {
            prev[optionKey].options[i].type = value.toLowerCase()
          }
          return {
            ...prev,
            [optionKey]: {
              ...prev[optionKey],
              name: value,
            }
          }
        })
        break
      case 'option-item':
        setOptionsData(prev => {
          return {
            ...prev,
            [optionKey]: {
              ...prev[optionKey],
              options: {
                ...prev[optionKey].options,
                [index]: {
                  ...prev[optionKey].options[index],
                  value: value
                }
              }
            }
          }
        })
        break
      default:
        break
    }
  }
  // функция обновления данных
  const handleUpdate = async (e, contentType, data, settingItemNumber) => {
    e.preventDefault()
    if(settingItemNumber) {
      toggleSettingItem(e, settingItemNumber)
    }
    handleSubmit(e, contentType, data, additionalState)
  }

  // функции кнопок изменения опшинов
  const addOptionType = (optionsTypeLength) => {
    const optionTypeName = `option_${optionsTypeLength + 1}`
    const optionTypeTemplate = {
      name: 'Color',
      placeholder: 'Color',
      options: {
        0: {type: 'color', value: 'defaulf', selected: true},
        1: {type: 'color', value: 'black', selected: false}
      }
    }
    setOptionsData(prev => (
      { ...prev, [optionTypeName]: optionTypeTemplate}
    ))
  }
  const removeOptionType = (optionsTypeLength) => {
    const optionTypeName = `option_${optionsTypeLength}`
    setOptionsData(prev => {
      delete prev[optionTypeName]
      return { ...prev }
    })
  }
  const addOption = (optionKey, optionsLength) => {
    setOptionsData(prev => {
      const templateOptionItem = {
        placeholder: 'black',
        type: prev[optionKey].name.toLowerCase(), 
        value: '',
        selected: false
      }
      return {
        ...prev,
        [optionKey]: {
          ...prev[optionKey],
          options: {
            ...prev[optionKey].options,
            [optionsLength]: templateOptionItem
          }
        }
      }
    })
  }
  const removeOption = (optionKey, optionsLength) => {
    setOptionsData(prev => {
      const copyOptions = prev[optionKey].options
      delete copyOptions[optionsLength - 1]

      return {
        ...prev,
        [optionKey]: {
          ...prev[optionKey],
          options: copyOptions
        }
      }
    })
  }

  useEffect(() => {
    validate(contentType)
    setImagesDataError(filesValidator(imageData))
  }, [data, optionsData, imageData])

  const validate = (contentType) => {
    if (contentType === 'options') {
      let errorsFor
      
      // проверка optionType'ов
      for (let i = 0; i < Object.keys(optionsData).length; i++) {
        const optionName = `option_${i + 1}`
        if (errorsFor && Object.keys(errorsFor).length) break
        errorsFor = validator(Object.values(optionsData)[i], validatorConfig)
        if (Object.keys(errorsFor).length) {
          setErrors({ [optionName]: errorsFor.name })
        }
        if (Object.keys(errorsFor).length) break

        // проверка optionType параметров
        for (let y = 0; y < Object.keys(optionsData[optionName].options).length; y++) {
          errorsFor = validator(Object.values(optionsData[optionName].options)[y], validatorConfig)
          if (Object.keys(errorsFor).length) {
            let testName = `${optionName}-param_${y + 1}`
            errorsFor = { [testName]: errorsFor.value }
          }
          setErrors(errorsFor)
          if (Object.keys(errorsFor).length) break
        }
      }
      // return Object.keys(errors).length === 0
    } else {
      const errors = validator(data, validatorConfig)
      setErrors(errors)
    }
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  return (
    <div className='edit-product-page'>
      {contentType === 'images'
        ? (
          <div>
            {/* <h3 className="accordion-page-item-content__title">Product Images</h3> */}
            {/* <h4 className="accordion-page-item-content__subtitle">Edit previews and sliders</h4> */}

            <form className="form-container images" onSubmit={(e) => handleUpdate(e, contentType, imageData)}>
              <div className="form-container__row">

                <div className="form-container__col">
                  <p className='form-container__title'>Product preview</p>
                  <div className='form-container-preview'>
                    <div className="form-container-preview-left">
                      <p className="form-container-preview-left__title">Current image:</p>
                      <img src={currentProduct.preview} alt="Current image" />
                    </div>
                    <div className="form-container-preview-right">
                      <label htmlFor="select-preview">select-preview</label>
                      <input
                        id='select-preview'
                        type='file'
                        name='preview'
                        onChange={(e) => changeImageData(e, e.target.files, 'preview')}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-container__col">
                  <p className='form-container__title'>Product preview</p>
                  <div className='form-container-intro display_block'>

                    <div className="form-container__row">
                      <input
                        className='checkbox'
                        id='checkout-slide'
                        type='checkbox'
                        onChange={(e) => changeImageData(e, null, 'checkbox')}
                      />
                      <label className='form-container-preview-left__title' htmlFor="checkout-slide">add as intro slider</label>
                    </div>
                    {imageData.introSlider.switched &&
                      <div className="form-container__row">
                        <label htmlFor="select-preview">select-preview</label>
                        <input
                          id='select-preview'
                          type='file'
                          name='preview'
                          onChange={(e) => changeImageData(e, e.target.files, 'intro')}
                        />
                      </div>
                    }
                  </div>
                </div>
              </div>

              <h4 className='form-container__title'>Product sliders</h4>
              <div className="form-container__row">
                <div className='form-container-preview'>
                  <div className="form-container-preview-left">
                    <p className="form-container-preview-left__title">Current images:</p>
                    <div className="array-images">
                      {currentProduct.slider.map((item, index) => (
                        <img key={index} src={item.preview} alt="" />
                      ))}
                    </div>
                  </div>
                  <div className="form-container-preview-right">
                    <label htmlFor="select-sliders">select sliders images</label>
                    <input
                      id='select-sliders'
                      type='file'
                      name='sliders'
                      multiple
                      onChange={(e) => changeImageData(e, e.target.files, 'sliders')}
                    />
                  </div>
                </div>
              </div>

              <h4 className='form-container__title'>Product slider dots</h4>
              <div className="form-container__row">
                <div className='form-container-preview'>
                  <div className="form-container-preview-left">
                    <p className="form-container-preview-left__title">Current images:</p>
                    <div className="array-images">
                      {currentProduct.slider_dots.map((item, index) => (
                        <img key={index} src={item} alt="" />
                      ))}
                    </div>
                  </div>
                  <div className="form-container-preview-right">
                    <label htmlFor="select-dots">select dots images</label>
                    <input
                      id='select-dots'
                      type='file'
                      name='dots'
                      multiple
                      onChange={(e) => changeImageData(e, e.target.files, 'dots')}
                    />
                  </div>
                </div>
              </div>

              {imagesDataError && <p className='error-msg'>*{imagesDataError}</p>}

              <div className='buttons'>
                <button
                  type='submit'
                  disabled={!!imagesDataError}
                >
                  Update
                </button>
                <Link className='back-btn' to='/admin/products'>Back to admin</Link>
              </div>
            </form>
            
          </div>
        )
        : contentType === 'options'
        ? (
          <div>
            {/* <div className="accordion-page-item-content__title">Product Options</div> */}
            {/* <div className="accordion-page-item-content__subtitle">Select Product Options</div> */}

            <div className='form-container'>

              <div className="form-container__row">
                <div className="text-fields options">
                  {optionsData && Object.keys(optionsData).map((optionKey, index) => (
                    <div key={index} className='option-item'>
                      <TextField
                        label={`Options type:`}
                        placeholder={optionsData[optionKey].placeholder}
                        name={optionKey}
                        value={optionsData[optionKey].name}
                        onChange={handleChange}
                        errors={errors}
                        submitType='option-type'
                        optionKey={optionKey}
                        index={index}
                      />
                      {Object.values(optionsData[optionKey].options).map((option, index) => (
                        <TextField
                          label={`Option ${index + 1}:`}
                          placeholder={option.placeholder}
                          name={`${optionKey}-param_${index + 1}`}
                          value={option.value}
                          onChange={handleChange}
                          errors={errors}
                          submitType='option-item'
                          optionKey={optionKey}
                          index={index}
                          key={index}
                        />
                      ))}
                      <div className="buttons">
                        <button
                          className={'remove' + (Object.keys(optionsData[optionKey].options).length === 1 ? ' disabled' : '')}
                          onClick={() => removeOption(optionKey, Object.keys(optionsData[optionKey].options).length)}
                          disabled={Object.keys(optionsData[optionKey].options).length === 1}
                        >
                          x
                        </button>
                        <button
                          className={'add' + (Object.keys(optionsData[optionKey].options).length > 3 ? ' disabled' : '')}
                          onClick={() => addOption(optionKey, Object.keys(optionsData[optionKey].options).length)}
                          disabled={Object.keys(optionsData[optionKey].options).length > 3}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="form-container__row">
                <div className="buttons no-margin">
                  <button
                    className={'remove' + (Object.keys(optionsData).length < 2 ? ' disabled' : '')}
                    onClick={() => removeOptionType(Object.keys(optionsData).length)}
                    disabled={Object.keys(optionsData).length < 2}
                  >
                    del last
                  </button>
                  <button
                    className='add'
                    onClick={() => addOptionType(Object.keys(optionsData).length)}
                    disabled={Object.keys(optionsData).length > 1}
                  >
                    add type
                  </button>
                </div>
              </div>

              <div className='buttons'>
                <button
                  onClick={(e) => handleUpdate(e, contentType, optionsData, 3)}
                  disabled={!isValid}
                >
                  Update
                </button>
                <Link className='back-btn' to='/admin/products'>Back to admin</Link>
              </div>
            </div>
          </div>
        )
        : (
          <div>
            <div className='form-container'>
              <div className="form-container__row">
                <div className="text-fields">
                  <TextField
                    label={`Name: ${data.name}`}
                    placeholder="Man item 12"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    errors={errors}
                    submitType='info'
                  />
                  <TextField
                    label={`Title: ${data.title}`}
                    placeholder="Some title.."
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    errors={errors}
                    submitType='info'
                  />
                  <TextField
                    label={`Price: $${data.price}`}
                    placeholder="$13"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    errors={errors}
                    submitType='price'
                  />
                </div>
              </div>
              <div className="form-container__row">
                <RadioField
                  label="Category:"
                  options={[
                    { name: 'Man', value: 'man' },
                    { name: 'Woman', value: 'woman' },
                    { name: 'Car', value: 'car' }
                  ]}
                  value={data.type}
                  name="type"
                  onChange={handleChange}
                  submitType='info'
                />
              </div>
              <div className="form-container__row">
                <Textarea
                  label="Description:"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  errors={errors}
                  submitType='info'
                />
              </div>

              <div className="form-container__row discount">

                {/* информационный блок */}
                <div className='discount-info'>
                  <CheckBoxField
                    label='On sale?'
                    name="onSale"
                    value={isProductOnSale}
                    submitType='onSale'
                    onChange={handleChange}
                  >
                    <p className='discount-info__title'>On sale?</p>
                  </CheckBoxField>
                  {isProductOnSale
                    ? <div className='discount-info-panel'>
                        <p className='discount-info-panel__title'>Current:</p>

                        {Object.keys(data.discount).map(key => (
                          <p className='discount-info-panel__key' key={key}>
                            {key}
                            {' : '}
                            <span>
                              {key === 'endTime'
                                ? formatDate(data.discount[key], 'all-data-time')
                                : key === 'value'
                                ? (data.discount.type === 'percentage' ? (data.discount[key] + '%') : ('$' + data.discount[key]))
                                : data.discount[key]
                              }
                            </span>
                          </p>
                        ))}

                        {/* <p>type: {data?.discount?.type}</p>
                        <p>value:
                          <span>
                            {data?.discount?.type === 'percentage'
                              ? data?.discount?.value + '%'
                              : '$' + data?.discount?.value
                            }
                          </span>
                        </p>
                        <p>
                          endTime
                          <span>: {formatDate(data?.discount?.endTime, 'all-data-time')}</span>
                        </p> */}
                    </div>
                    : <p className='discount-info-panel'>(no discount)</p>
                  }
                </div>

                {/* функционал */}
                {isProductOnSale
                  ? <div className='discount-settings' style={{display: 'flex'}}>
                      <SelectDate
                        endTime={data?.discount?.endTime}
                        onChange={handleChange}
                        submitType={'discount'}
                        additionalСlass='discount-settings-item'
                      />
                      <div className="discount-settings-item text-fields">
                        <TextField
                          label="value:"
                          placeholder="15"
                          name="discountValue"
                          value={data?.discount?.value}
                          onChange={handleChange}
                          errors={errors}
                          submitType='discount'
                        />  
                      </div>
                      <div className='discount-settings-item'>
                        <RadioField
                          label="Type:"
                          options={[
                            { name: 'percentage', value: 'percentage' },
                            { name: 'fixed', value: 'fixed' },
                            { name: 'shipping', value: 'shipping' }
                          ]}
                          value={data?.discount?.type}
                          name="discountType"
                          onChange={handleChange}
                          submitType='discount'
                        />
                      </div>
                    </div>
                  : null
                }
              </div>

              <div className="form-container__row">
                <div className='buttons no-margin'>
                  <button
                    onClick={(e) => handleUpdate(e, contentType, data, 2)}
                    disabled={!isValid}
                  >
                    Update
                  </button>
                  <Link className='back-btn' to='/admin/products'>Back to admin</Link>
                </div>
              </div>
            </div>

          </div>
        )
      }
    </div>
  )
}

EditProductConfig.propTypes = {
  contentType: PropTypes.string,
  toggleSettingItem: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default EditProductConfig
