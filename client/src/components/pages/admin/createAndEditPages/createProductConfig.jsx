import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { filesValidator } from '../../../../utils/filesValidator'
import { validator } from '../../../../utils/validator'
import { validatorConfig } from '../../../../utils/validatorConfig'
import RadioField from '../../../common/form/radioField'
import TextField from '../../../common/form/textField'
import Textarea from '../../../common/form/textarea'

const CreateProductConfig = ({ contentType, toggleSettingItem, handleSubmit, productType }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [imagesDataError, setImagesDataError] = useState()
  // значение полей формы info
  const initInfoData = {
    name: '',
    type: 'man',
    title: '',
    price: 0,
    rate: 0,
    description: ''    
  }
  const [data, setData] = useState(initInfoData)
  // значение полей формы options
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
  const [optionsData, setOptionsData] = useState(initOptionsData)

  // ImageData
  const initImagesData = {
    introSlider: {
      switched: false,
    },
    images: {}
  }
  const [imageData, setImageData] = useState(initImagesData)
  
  useEffect(() => {
    if (productType) {
      console.log('productType')
      setImageData(prev => ({
        ...prev,
      }))
    }
  }, [productType])

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

  const handleNext = async (e, contentType, data, settingItemNumber) => {
    e.preventDefault()
    if(settingItemNumber) {
      toggleSettingItem(e, settingItemNumber)
    }
    handleSubmit(e, contentType, data)
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
      console.log('optionsLength - 1 :>> ', optionsLength - 1)

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
      // return Object.keys(errors).length === 0
    }
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  return (
    <div className='create-product-page'>
      {contentType === 'images'
        ? (
          <div>
            <div className="accordion-page-item-content__title">Product Images</div>
            <div className="accordion-page-item-content__subtitle">Edit previews and sliders</div>

            <form className="form-container" onSubmit={(e) => handleNext(e, contentType, imageData)}>

              <div className="form-container__row">
                <div className="form-container__col">
                  <p className='form-container__title'>Product preview</p>
                  <div className='form-container-preview'>
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
                  <p className='form-container__title'>Product intro</p>
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

              <h4 className='form-container__title'>Product sliders & dots</h4>
              <div className="form-container__row">
                <div className="form-container__col">
                  <div className='form-container-preview'>
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

                <div className="form-container__col">
                  <div className='form-container-preview'>
                    <div className="form-container-preview-right">
                      <label label htmlFor="select-dots">select dots images</label>
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
              </div>
              
              {imagesDataError && <p className='error-msg'>*{imagesDataError}</p>}

              <div className='buttons'>
                <button
                  type='submit'
                  disabled={!!imagesDataError}
                >
                  Create
                </button>
                <button
                  onClick={(e) => toggleSettingItem(e, 2)}
                  className='back-btn'
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        )
        : contentType === 'options'
        ? (
          <div>
            <div className="accordion-page-item-content__title">Product Options</div>
            <div className="accordion-page-item-content__subtitle">Select Product Options</div>

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
                          className='add'
                          onClick={() => addOption(optionKey, Object.keys(optionsData[optionKey].options).length)}
                          disabled={Object.keys(optionsData[optionKey].options).length > 3}
                        >
                          add option
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
                    remove last
                  </button>
                  <button
                    className='add'
                    onClick={() => addOptionType(Object.keys(optionsData).length)}
                    disabled={Object.keys(optionsData).length > 1}
                  >
                    add option type
                  </button>
                </div>
              </div>

              <div className='buttons'>
                <button
                  onClick={(e) => handleNext(e, contentType, optionsData, 3)}
                  disabled={!isValid}
                >
                  Next
                </button>
                <button
                  onClick={(e) => toggleSettingItem(e, 1)}
                  className='back-btn'
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )
        : (
          <div>
            <div className="accordion-page-item-content__title">Product Information</div>
            <div className="accordion-page-item-content__subtitle">Edit Product Information</div>

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
              <div className="form-container__row">
                <div className='buttons'>
                  <button
                    onClick={(e) => handleNext(e, contentType, data, 2)}
                    disabled={!isValid}
                  >
                    Next
                  </button>
                  <Link className='back-btn' to='/admin/products'>back</Link>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default CreateProductConfig
