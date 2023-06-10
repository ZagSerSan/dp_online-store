import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// css
import './header.css'
// components
import LOGO from '../assets/img/logo/logo.png'
import Icon from './common/icon'

const Header = () => {
  const [dropMenu, setDropMenu] = useState(false)

  return (
    <header className='container header'>
      <div className='header-logo'>
        <img src={LOGO} alt="logo" />
      </div>
      <nav>
        <ul className='header-nav'>
          <li className='header-nav__link'><Link to="/">Home</Link></li>
          <li className='header-nav__link'>
            <Link
              to="/category"
              onMouseEnter={() => setDropMenu(true)}
              onMouseLeave={() => setDropMenu(false)}
            >
              Category
            </Link>
            {dropMenu && <div
              onMouseEnter={() => setDropMenu(true)}
              onMouseLeave={() => setDropMenu(false)}
              className='drop-menu'
            >
              <Link className='drop-menu__link' to='/category/forher'>For her</Link>
              <Link className='drop-menu__link' to='/category/forhim'>For him</Link>
              <Link className='drop-menu__link' to='/category/forcar'>For a car</Link>
            </div>}
          </li>
          <li className='header-nav__link'><Link to="/delivery">Delivery</Link></li>
          <li className='header-nav__link'><Link to="/about">About us</Link></li>
          <li className='header-nav__link'><Link to="/contacts">Contacts</Link></li>
        </ul>
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