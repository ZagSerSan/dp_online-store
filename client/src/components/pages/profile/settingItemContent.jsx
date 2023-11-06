import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
// utils
import { validatorConfig } from '../../../utils/validatorConfig'
import { validator } from '../../../utils/validator'
// store, components
import userStore from '../../../store/userStore'
import TextField from '../../common/form/textField'

const SettingItemContent = ({ contentType, user }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const { authedUser, updateUser, removeUser, logOut } = userStore()

  // значение полей формы по умолчанию
  const dataPasswordInitState = {
    _id: user._id,
    password: '',
    passwordConfirm: '',
  }
  // стандартные значения полей формы
  const [dataAccount, setDataAccount] = useState({
    _id: user._id,
    name: user ? user.name : '',
    email: user ? user.email : '',
  })
  const [dataPassword, setDataPassword] = useState({
    _id: user._id,
    password: '',
    passwordConfirm: '',
  })
  const [dataAddress, setDataAddress] = useState({
    сountry: '',
    city: '',
    street: '',
    houseNumber: '',
  })

  // update data by renders
  useEffect(() => {
    setDataAccount(prev => (
      {
        ...prev,
        name: user ? user.name : '',
        email: user ? user.email : '',
      }
    ))
    setDataAddress({
      сountry: user.address ? user.address.сountry : '',
      city: user.address ? user.address.city : '',
      street: user.address ? user.address.street : '',
      houseNumber: user.address ? user.address.houseNumber : ''
    })
  }, [user])

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
          _id: user._id,
          address: dataAddress
        }
        updateUser(newObjAddress)
        break;
      default:
        break;
    }
    authedUser.admin
      ? navigate('/admin/users')
      : navigate('/home')
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
  }

  const deleteAccount = (e) => {
    e.preventDefault()
    
    const answer = confirm('Are you sure you want to delete your account?')
    if (answer) {
      navigate('/home')
      removeUser(authedUser._id)
      setTimeout(() => {
        logOut()
      }, 2000);
    }
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

  return (
    <div className='profile-page'>
    {contentType === 'password'
      ? (
        <div>
          <div className="accordion-page-item-content__title">CHANGE PASSWORD</div>
          <div className="accordion-page-item-content__subtitle">Your Password</div>

          <form className="form-container" onSubmit={(e) => handleSubmit(e, 'password')}>
            <div className="form-container__row">
              <div className="text-fields">
                <TextField
                  label='Password:'
                  placeholder="Enter a new password.."
                  name="password"
                  value={dataPassword.password}
                  onChange={handleChange}
                  errors={errors}
                  submitType='password'
                />
                <TextField
                  label='Confirm:'
                  placeholder="Confirm new password"
                  name="passwordConfirm"
                  value={dataPassword.passwordConfirm}
                  onChange={handleChange}
                  errors={errors}
                  submitType='password'
                />
              </div>
            </div>
            <div className='buttons'>
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
          <div className="accordion-page-item-content__title">Address Book Entries</div>
          <div className="accordion-page-item-content__subtitle">Change default address or add new</div>

          <form className="form-container" onSubmit={(e) => handleSubmit(e, 'address')}>

            <div className="form-container__row">
              <div className="text-fields">
                <TextField
                  label='Сountry:'
                  placeholder="For example: Polish"
                  name="сountry"
                  value={dataAddress.сountry}
                  onChange={handleChange}
                  errors={errors}
                  submitType='address'
                />
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
            <div className="form-container__row">
              <div className="text-fields">
                <TextField
                  label='Street:'
                  placeholder="For example: Szarych Szeregow"
                  name="street"
                  value={dataAddress.street}
                  onChange={handleChange}
                  errors={errors}
                  submitType='address'
                />
                <TextField
                  label='apartment:'
                  placeholder="For example: 13/12"
                  name="houseNumber"
                  value={dataAddress.houseNumber}
                  onChange={handleChange}
                  errors={errors}
                  submitType='address'
                />
              </div>
            </div>
            <div className='buttons'>
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
      : (
        <div>
          <div className="accordion-page-item-content__title">My Account Information</div>
          <div className="accordion-page-item-content__subtitle">Your Personal Details</div>

          <form className="form-container" onSubmit={(e) => handleSubmit(e, 'account')}>
            <div className="form-container__row">
              <div className="text-fields">
                <TextField
                  label='Name:'
                  placeholder="Enter your name"
                  name="name"
                  value={dataAccount.name}
                  onChange={handleChange}
                  errors={errors}
                  submitType='account'
                />
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
            <div className='buttons'>
              <button
                type="submit"
                disabled={!isValid}
                className="submit"
              >
                Save data
              </button>
              {authedUser._id === user._id &&
                <button
                  onClick={deleteAccount}
                  className="remove"
                >
                  Delete account
                </button>
              }
            </div>
          </form>
        </div>
      )
    }
  </div>
  )
}

SettingItemContent.propTypes = {
  contentType: PropTypes.string,
  user: PropTypes.object
}

export default SettingItemContent
