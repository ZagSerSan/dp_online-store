import React from 'react'
import { Link } from 'react-router-dom'
// css
import './header.css'
// components
import LOGO from '../assets/img/logo/logo.png'
import Icon from './common/icon'

const Header = () => {
  return (
    <header className='container header'>
      <div className='header-logo'>
        <img src={LOGO} alt="logo" />
      </div>
      <nav className='header-nav'>
        <Link to="/" className='header-nav__link'>Home</Link>
        <Link to="/category" className='header-nav__link'>Category</Link>
        <Link to="/delivery" className='header-nav__link'>Delivery</Link>
        <Link to="/about" className='header-nav__link'>About us</Link>
        <Link to="/contacts" className='header-nav__link'>Contacts</Link>
      </nav>
      <div className='header-cart'>
        <Icon className='header-cart__icon' id='search'/>
        <Icon className='header-cart__icon' id='user'/>
        <Icon className='header-cart__icon' id='cart'/>
      </div>
    </header>
  )
}
 
export default Header