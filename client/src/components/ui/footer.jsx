import React, { useEffect, useState } from 'react'
import './css/footer.css'
import Icon from '../common/icon'
import TextField from '../common/form/textField'
import { validatorConfig } from '../../utils/validatorConfig'
import { validator } from '../../utils/validator'
const LOGO_URL = 'http://localhost:8080/images/logo/logoSapach.png'  

const Footer = () => {
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    email: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ifValid = validate()
    if (!ifValid) return

    console.log('data :>> ', data)
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
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  return (
    <footer className='footer'>
      <div className="my-container footer__inner">
        <div className="footer__col footer-firstcol">
          <img src={LOGO_URL} alt="logo" className="footer-firstcol__logo" />
          <p className="footer-firstcol__description">Lorem ipsum dolor sit amet, co adipisi elit, sed eiusmod tempor incididunt ut labore et dolore</p>
          <div className="footer-firstcol__social">
            <Icon id='facebook'/>
            <Icon id='instagram'/>
            <Icon id='twitter'/>
            <Icon id='telegram'/>
          </div>
        </div>
        <div className="footer__col footer-useful">
          <p>USEFUL LINKS</p>
          <a href="">Help & Contact Us</a>
          <a href="">Returns & Refunds</a>
          <a href="">Online Stores</a>
          <a href="">Terms & Conditions</a>
        </div>
        <div className="footer__col footer-help">
          <p>HELP</p>
          <a href="">Faq's</a>
          <a href="">Pricing Plans</a>
          <a href="">Order Traking</a>
          <a href="">Returns</a>
        </div>
        <div className="footer__col subscribe">
          <p>Subscribe to our newsletter and get 10% off your first purchase..</p>
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Your mail address"
              name="email"
              value={data.email}
              onChange={handleChange}
              errors={errors}
              switchErrMsg={false}
            />
            <button
              type="submit"
              disabled={!isValid}
              className={'submit' + (!isValid ? ' disabled' : '')}
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}

export default Footer
