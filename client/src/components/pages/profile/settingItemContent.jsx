import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import { validatorConfig } from '../../../utils/validatorConfig'
import { validator } from '../../../utils/validator'
import useStore from '../../../store/createStore'

const SettingItemContent = ({ contentType }) => {
  const [errors, setErrors] = useState({})
  const { authedUser } = useStore()
  // значение полей формы

  const [data, setData] = useState({
    name: authedUser ? authedUser.name : '',
    email: authedUser ? authedUser.email : '',
    password: '',
    passwordConfirm: '',
    сountry: '',
    city: '',
    street: '',
    houseNumber: '',
    // sex: 'male',
    // admin: false,
    // image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  })
  // const { setAuthedUser, authorizated } = useStore()

  useEffect(() => {
    setData(prev => (
      {
        ...prev,
        name: authedUser ? authedUser.name : '',
        email: authedUser ? authedUser.email : '',
      }
    ))
  }, [authedUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    if (!ifValid) return

    console.log('data :>> ', data)
    // try {
    //   await authService.register(data)
    //   setAuthedUser()
    // } catch (e) {
    //   console.log('e', e)
    // }
  }
  const handleChange = ({ name, value }) => {
    setData(prev => ({
      ...prev,
      [name]: value
    }))
    
  }

  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    
    if (data.password !== data.passwordConfirm) {
      errors.passwordConfirm = "Passwords don't match"
    } else {
      delete errors.passwordConfirm
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  // if (authorizated) {
  //   return <Navigate to='/home'/>
  // }

  return (<>
    {contentType === 'password'
      ? (
        <div>
          <div className="setting-item-content__title">CHANGE PASSWORD</div>
          <div className="setting-item-content__subtitle">Your Password</div>
          <form className="setting-item-content-form-container" onSubmit={handleSubmit}>
            <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Password:'
                  placeholder="Enter a new password.."
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Password Confirm:'
                  placeholder="Confirm new password"
                  name="passwordConfirm"
                  value={data.passwordConfirm}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>
            </div>
            <div className="setting-item-content-form-container__col">
            <button
              type="submit"
              // disabled={!isValid}
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
          <form className="setting-item-content-form-container" onSubmit={handleSubmit}>
            <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Сountry:'
                  placeholder="For example: Polish"
                  name="сountry"
                  value={data.сountry}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='City:'
                  placeholder="For example: Bydgoszcz"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>
            </div>
            <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Street:'
                  placeholder="For example: Szarych Szeregow"
                  name="street"
                  value={data.street}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='House/apartment number:'
                  placeholder="For example: 13/12"
                  name="houseNumber"
                  value={data.houseNumber}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>
            </div>
            <button
              type="submit"
              // disabled={!isValid}
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
          <form className="setting-item-content-form-container" onSubmit={handleSubmit}>
            <div className="setting-item-content-form-container__col">
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Name:'
                  // placeholder="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>
              <div className="setting-item-content-form-container__row">
                <TextField
                  label='Email:'
                  // placeholder="Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  errors={errors}
                />
              </div>
            </div>
            <button
              type="submit"
              // disabled={!isValid}
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
