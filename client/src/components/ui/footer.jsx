import React from 'react'
import './css/footer.css'
import Icon from '../common/icon'

const Footer = () => {
  const LOGO_URL = 'http://localhost:8080/images/logo/logoSapach.png'  

  return (
    <footer className='footer'>
      <div className="my-container footer__inner">
        {/* <div className="footer__inner"></div> */}
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
          <h4>Subscribe to our newsletter and get 10% off your first purchase..</h4>
          <form action="">

          </form>
          <div className="payment-methods">
            <div className="payment-methods-item"></div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer