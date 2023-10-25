import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validatorConfig } from '../../../../utils/validatorConfig'
import { validator } from '../../../../utils/validator'
import TextField from '../../../common/form/textField'
import Textarea from '../../../common/form/textarea'
import RadioField from '../../../common/form/radioField'
// import CheckBoxField from '../../../common/form/checkBoxField'

const CreateProductConfig = ({ contentType, toggleSettingItem }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  // значение полей формы
  const initProductData = {
    name: '',
    type: 'man',
    title: '',
    price: 0,
    rate: 0,
    description: '',
    // modalOptionTypes: [
    //   {
    //     name: 'Size',
    //     options: [
    //       {type: 'size', value: '3ml', selected: true},
    //       {type: 'size', value: '6ml', selected: false}
    //     ]
    //   },
    //   {
    //     name: 'Color',
    //     options: [
    //       {type: 'color', value: 'default', selected: true},
    //       {type: 'color', value: 'black', selected: false},
    //     ] 
    //   }
    // ],
    // introSlider: {
    //   switched: false,
    //   // slide: manItem1.introSliderPreview
    // },
    // preview: manItem1.list,
    // slider_dots: manItem1.dots,
    // slider: [
    //   {
    //     id: 'slider_1',
    //     preview: manItem1.modalPreviews.slide1,
    //     title: 'Some title'
    //   },
    //   {
    //     id: 'slider_2',
    //     preview: manItem1.modalPreviews.slide2,
    //     title: 'Some title'
    //   },
    //   {
    //     id: 'slider_3',
    //     preview: manItem1.modalPreviews.slide3,
    //     title: 'Some title'
    //   }
    // ]
  }
  const [data, setData] = useState(initProductData)
  const initOptionsData = {
    option_1: {
      name: 'Size',
      options: [
        {type: 'size', value: '3ml', selected: true},
        {type: 'size', value: '6ml', selected: false}
      ]
    },
    option_2: {
      name: 'Color',
      options: [
        {type: 'color', value: 'defaulf', selected: true},
        {type: 'color', value: 'black', selected: false}
      ]
    },
  }
  const [optionsData, setOptionsData] = useState()
  useEffect(() => {
    setOptionsData(initOptionsData)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    console.log('ifValid :>> ', ifValid)
    if (!ifValid) return

    console.log('data :>> ', data)
    //todo
    // createUser(data)
    // navigate('/admin/products')
  }

  const handleChange = (payload, submitType) => {
    let { name, value } = payload

    switch (submitType) {
      case 'info':
        console.log('submitType :>> ', submitType)
        setData(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      case 'price':
        value = Number(value)
        if (!isNaN(value)) {
          setData(prev => ({
            ...prev,
            [name]: value
          }))
        }
        break;
      default:
        console.log('submitType :>> ', submitType)
        break;
    }
  }

  //
  const addOptionType = (optionsTypeLength) => {
    const optionTypeName = `option_${optionsTypeLength + 1}`
    setOptionsData(prev => (
      {
        ...prev,
        [optionTypeName]: {
          name: 'Color',
          options: [
            {type: 'color', value: 'defaulf', selected: true},
            {type: 'color', value: 'black', selected: false}
          ]
        }
      }
    ))
  }
  const removeOptionType = (optionsTypeLength) => {
    const optionTypeName = `option_${optionsTypeLength}`
    console.log('optionTypeName :>> ', optionTypeName)
    setOptionsData(prev => {
      delete prev[optionTypeName]
      return { ...prev }
    })
  }
  const addOption = (optionKey, optionsLength) => {
    console.log('optionKey :>> ', optionKey)
    console.log('optionsLength :>> ', optionsLength)

    setOptionsData(prev => {
      const templateOptionItem = {type: 'color', value: 'defaulf', selected: true}
      const newOptionsArray = prev[optionKey].options
      newOptionsArray.push(templateOptionItem)

      return {
        ...prev,
        [optionKey]: {
          ...prev[optionKey],
          options: newOptionsArray
        }
      }
    })
  }
  const removeOption = (optionKey, optionsLength) => {
    console.log('optionKey :>> ', optionKey)
    // console.log('optionsLength :>> ', optionsLength)

    setOptionsData(prev => {
      const newOptionsArray = prev[optionKey].options
      newOptionsArray.pop()

      return {
        ...prev,
        [optionKey]: {
          ...prev[optionKey],
          options: newOptionsArray
        }
      }
    })
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
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
          <form className="create-product-page" onSubmit={(e) => handleSubmit(e, 'images')}>
            <div className='create-product-page__buttons'>
              <button
                type='submit'
                disabled={!isValid}
              >
                Create
              </button>
              <button
                onClick={(e) => toggleSettingItem(e, 2)}
                // disabled={!isValid}
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
                    placeholder="Size"
                    name={optionsData[optionKey].name}
                    value={optionsData[optionKey].name}
                    onChange={handleChange}
                    errors={errors}
                    submitType='option'
                  />
                  {optionsData[optionKey].options.map((option, index) => (
                    <TextField
                      key={index}
                      label={`Option ${index + 1}:`}
                      placeholder={option.value}
                      name={option.type}
                      value={option.value}
                      onChange={handleChange}
                      errors={errors}
                      submitType='option'
                    />
                  ))}
                  
                  <button
                    className='remove'
                    onClick={() => removeOption(optionKey, optionsData[optionKey].options.length)}
                  >
                    x
                  </button>
                  <button
                    className='add'
                    onClick={() => addOption(optionKey, optionsData[optionKey].options.length)}
                  >
                    add option
                  </button>
                </div>
              ))}
              <button
                className='remove'
                onClick={() => removeOptionType(Object.keys(optionsData).length)}
              >
                X
              </button>
              <button
                className='add'
                onClick={() => addOptionType(Object.keys(optionsData).length)}
              >
                add option type
              </button>
            </div>
            <div className='create-product-page__buttons'>
              <button
                onClick={(e) => toggleSettingItem(e, 3)}
                // disabled={!isValid}
              >
                Next
              </button>
              <button
                onClick={(e) => toggleSettingItem(e, 1)}
                // disabled={!isValid}
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
                onClick={(e) => toggleSettingItem(e, 2)}
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
