import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import { validatorConfig } from '../../../utils/validatorConfig'
import { validator } from '../../../utils/validator'
import { Navigate } from 'react-router-dom'
import userStore from '../../../store/userStore'

const SettingItemContent = ({ contentType }) => {
  const [errors, setErrors] = useState({})
  const { authedUser, authorizated, updateUser } = userStore()

  // значение полей формы
  const dataPasswordInitState = {
    _id: authedUser._id,
    password: '',
    passwordConfirm: '',
  }

  const [dataAccount, setDataAccount] = useState({
    _id: authedUser._id,
    name: authedUser ? authedUser.name : '',
    email: authedUser ? authedUser.email : '',
  })
  const [dataPassword, setDataPassword] = useState({
    _id: authedUser._id,
    password: '',
    passwordConfirm: '',
  })
  const [dataAddress, setDataAddress] = useState({
    сountry: '',
    city: '',
    street: '',
    houseNumber: '',
  })

  useEffect(() => {
    setDataAccount(prev => (
      {
        ...prev,
        name: authedUser ? authedUser.name : '',
        email: authedUser ? authedUser.email : '',
      }
    ))
    setDataAddress({
      сountry: authedUser.address ? authedUser.address.сountry : '',
      city: authedUser.address ? authedUser.address.city : '',
      street: authedUser.address ? authedUser.address.street : '',
      houseNumber: authedUser.address ? authedUser.address.houseNumber : ''
    })
  }, [authedUser])

  const handleSubmit = async (e, submitType) => {
    e.preventDefault()
    const ifValid = validate(submitType)
    if (!ifValid) return

    switch (submitType) {
      case 'account':
        updateUser(dataAccount)
        break;
      case 'password':
        updateUser(dataPassword)
        setDataPassword(dataPasswordInitState)
        break;
      case 'address':
        const newObjAddress = {
          _id: authedUser._id,
          address: dataAddress
        }
        updateUser(newObjAddress)
        break;
      default:
        break;
    }
  }

  const handleChange = (payload, submitType) => {
    const { name, value } = payload
    switch (submitType) {
      case 'account':
        setDataAccount(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      case 'password':
        setDataPassword(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      case 'address':
        setDataAddress(prev => ({
          ...prev,
          [name]: value
        }))
        break;
      default:
        break;
    }
    
    // setData(prev => ({
    //   ...prev,
    //   [name]: value
    // }))
    
  }

  useEffect(() => {
    validate(contentType)
  }, [dataAccount, dataPassword, dataAddress])

  const validate = (contentType) => {
    let errors

    switch (contentType) {
      case 'account':
        errors = validator(dataAccount, validatorConfig)
        break;
      case 'password':
        errors = validator(dataPassword, validatorConfig)
        break;
      case 'address':
        errors = validator(dataAddress, validatorConfig)
        break;
      default:
        break;
    }
    if (dataPassword.password !== dataPassword.passwordConfirm) {
      errors.passwordConfirm = "Passwords don't match"
    } else {
      delete errors.passwordConfirm
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  if (!authorizated) {
    return <Navigate to='/home'/>
  }

  return (<>
    {contentType === 'password'
      ? (
        <div>
          <div className="setting-item-content__title">CHANGE PASSWORD</div>
          <div className="setting-item-content__subtitle">Your Password</div>
          <form className="setting-item-content-form-container" onSubmit={(e) => handleSubmit(e, 'password')}>
            <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Password:'
                  placeholder="Enter a new password.."
                  name="password"
                  value={dataPassword.password}
                  onChange={handleChange}
                  errors={errors}
                  submitType='password'
                />
              </div>
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Password Confirm:'
                  placeholder="Confirm new password"
                  name="passwordConfirm"
                  value={dataPassword.passwordConfirm}
                  onChange={handleChange}
                  errors={errors}
                  submitType='password'
                />
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
      : contentType === 'address'
      ? (
        <div>
          <div className="setting-item-content__title">Address Book Entries</div>
          <div className="setting-item-content__subtitle">Change default address or add new</div>
          <form className="setting-item-content-form-container" onSubmit={(e) => handleSubmit(e, 'address')}>
            <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Сountry:'
                  placeholder="For example: Polish"
                  name="сountry"
                  value={dataAddress.сountry}
                  onChange={handleChange}
                  errors={errors}
                  submitType='address'
                />
              </div>
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='City:'
                  placeholder="For example: Bydgoszcz"
                  name="city"
                  value={dataAddress.city}
                  onChange={handleChange}
                  errors={errors}
                  submitType='address'
                />
              </div>
            </div>
            <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Street:'
                  placeholder="For example: Szarych Szeregow"
                  name="street"
                  value={dataAddress.street}
                  onChange={handleChange}
                  errors={errors}
                  submitType='address'
                />
              </div>
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='House/apartment number:'
                  placeholder="For example: 13/12"
                  name="houseNumber"
                  value={dataAddress.houseNumber}
                  onChange={handleChange}
                  errors={errors}
                  submitType='address'
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
          </form>
        </div>
      )
      : (
        <div>
          <div className="setting-item-content__title">My Account Information</div>
          <div className="setting-item-content__subtitle">Your Personal Details</div>
          <form className="setting-item-content-form-container" onSubmit={(e) => handleSubmit(e, 'account')}>
            <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Name:'
                  placeholder="Enter your name"
                  name="name"
                  value={dataAccount.name}
                  onChange={handleChange}
                  errors={errors}
                  submitType='account'
                />
              </div>
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Email:'
                  placeholder="Enter your email.."
                  name="email"
                  value={dataAccount.email}
                  onChange={handleChange}
                  errors={errors}
                  submitType='account'
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
            {/* <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row"></div>
              <div className="setting-item-content-form-container__row"></div>
            </div> */}
          </form>
        </div>
      )
    }
  </>
  )
}

export default SettingItemContent
