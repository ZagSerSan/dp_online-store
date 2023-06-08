import React from 'react'
import './header.css'
import LOGO from '../assets/img/logo/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='container header'>
      <div className='header__logo'>
        <img src={LOGO} alt="logo" />
      </div>
      <nav className='header-nav'>
        <Link to="/" className='header-nav__link'>Home</Link>
        <Link to="/category" className='header-nav__link'>Category</Link>
        <Link to="/delivery" className='header-nav__link'>Delivery</Link>
        <Link to="/about" className='header-nav__link'>About us</Link>
        <Link to="/contacts" className='header-nav__link'>Contacts</Link>
      </nav>
      <div className='header__cart'>card</div>
    </header>
  )
}
 
export default Header