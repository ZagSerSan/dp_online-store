import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validator } from '../../../../utils/validator'
import { validatorConfig } from '../../../../utils/validatorConfig'
import RadioField from '../../../common/form/radioField'
import TextField from '../../../common/form/textField'
import Textarea from '../../../common/form/textarea'
import useStore from '../../../../store/createStore'
import ProductService from '../../../../service/product.service'
// import CheckBoxField from '../../../common/form/checkBoxField'

const CreateProductConfig = ({ contentType, toggleSettingItem, handleSubmit, productType }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
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

  //todo ====================================================
  // ImageData
  const initImagesData = {
    // introSlider: {
    //   switched: false,
    // },
    // images: {}
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
    console.log(filesType === 'checkbox')

    switch (filesType) {
      case 'checkbox':
        console.log('checkbox func')
        setImageData(prev => ({
          ...prev,
          introSlider: {
            switched: !prev.introSlider.switched,
          },
        }))
        break
      case 'preview':
        console.log('preview func')
        // setImageData(prev => ({
          // ...prev,
        //   images: {
        //     ...prev.images,
            // preview: files
        //   }
        // }))
        setImageData(prev => ({
          ...prev,
          ...files
          // preview: {...files}
        }))
        // setImageData(files)
        break
      case 'sliders':
        console.log('sliders func')
        // setImageData(prev => ({
        //   ...prev,
        // //   images: {
        //     // ...prev.images,
        //     sliders: files
        // //   }
        // }))
        // setImageData(files)
        console.log(files.length)
        setImageData(prev => ({
          ...prev,
          1: files[0],
          2: files[1],
          3: files[2]
          // sliders: {...files}
        }))
        break
      case 'dots':
        console.log('dots func')
        // setImageData(prev => ({
          // ...prev,
          // images: {
            // ...prev.images,
            // dots: files
          // }
        // }))
        setImageData(prev => ({
          ...prev,
          4: files[0],
          5: files[1],
          6: files[2]
          // sliders: {...files}
        }))
        break
      default:
        break
    }

    //todo
    // ProductService.sendFiles()

    // console.log('contentType :>> ', contentType)
    // console.log('data :>> ', data)
  }

  //todo ====================================================

  const handleNext = async (e, contentType, data, settingItemNumber) => {
    e.preventDefault()

    //? нужно ли это вообще..
    //? как вариант: ifValid = Object.keys(errors).length
    // const ifValid = validate()
    // if (!ifValid) {
    //   console.log('!ifValid :>> ', !ifValid)
    //   return
    // }

    // if (contentType === 'images') {
      // console.log('contentType :>> ', contentType)
      // console.log('data :>> ', data)
    // } else {
      if(settingItemNumber) {
        toggleSettingItem(e, settingItemNumber)
      }
      handleSubmit(e, contentType, data)
      //todo
      // createUser(data)
      // navigate('/admin/products')
    // }
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
  }, [data, optionsData])

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

  return (<>
    {contentType === 'images'
      ? (
        <div>
          <div className="setting-product-content__title">Product Images</div>
          <div className="setting-product-content__subtitle">Edit previews and sliders</div>
          <form className="create-product-page form-container" onSubmit={(e) => handleNext(e, contentType, imageData)}>
            <div className="form-container__row">
              <div className="form-container__col">
                <label htmlFor="select-preview">select-preview</label>
                <input
                  id='select-preview'
                  type='file'
                  name='preview'
                  onChange={(e) => changeImageData(e, e.target.files, 'preview')}
                />
              </div>
              <div className="form-container__col">
                <input
                  id='checkout-slide'
                  type='checkbox'
                  onChange={(e) => changeImageData(e, null, 'checkbox')}
                />
                <label htmlFor="checkout-slide">add as intro slider</label>
              </div>
            </div>
            <div className="form-container__row">
              <label htmlFor="select-sliders">select sliders images</label>
              <input
                id='select-sliders'
                type='file'
                name='sliders'
                multiple
                onChange={(e) => changeImageData(e, e.target.files, 'sliders')}
              />
            </div>
            <div className="form-container__row">
              <label htmlFor="select-dots">select dots images</label>
              <input
                id='select-dots'
                type='file'
                name='dots'
                multiple
                onChange={(e) => changeImageData(e, e.target.files, 'dots')}
              />
            </div>
            <div className='create-product-page__buttons'>
              {/* тут будет кнопка отправки данных через handleNext */}
              <button
                type='submit'
                // onClick={(e) => handleNext(e, contentType, imageData)}
                // disabled={!isValid}
              >
                Create
              </button>
              {/* тут кнопка действия изменения данных, напр чекбокс и тд */}
              <button
                onClick={(e) => changeImageData(e, contentType, imageData)}
                // disabled={!isValid}
              >
                change
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
          <div className="setting-product-content__title">Product Options</div>
          <div className="setting-product-content__subtitle">Select Product Options</div>
          <div className="create-product-page">
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
              ))}
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
            <div className='create-product-page__buttons'>
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
          <div className="setting-product-content__title">Product Information</div>
          <div className="setting-product-content__subtitle">Edit Product Information</div>
          <div className="create-product-page">
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
            <Textarea
              label="Description:"
              name="description"
              value={data.description}
              onChange={handleChange}
              errors={errors}
              submitType='info'
            />
            <div className='create-product-page__buttons'>
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
      )
    }
  </>
  )
}

export default CreateProductConfig
