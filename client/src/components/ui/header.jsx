import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useRef } from 'react'
// css
import './css/header.css'
// components
import Icon from '../common/icon'
import useStore from '../../store/createStore'

const Header = () => {
  const [dropMenu, setDropMenu] = useState(false)
  const [authDropMenu, setAuthDropMenu] = useState(false)
  const searchInputRef = useRef()
  const [searchInputState, setSearchInputState] = useState(false)
  const { authedUser, logOut, globalLoading } = useStore()
  const LOGO_URL = 'http://localhost:8080/images/logo/logoSapach.jpg'  
  
  if (!globalLoading) {
    const header = document.querySelector('.header')
    const limitHeigth = (window.innerHeight / 3) < 200 ? 200 : window.innerHeight / 3

    window.addEventListener('scroll', (e) => {
      if (window.scrollY > limitHeigth) {
        header.classList.add('fixed')
      } else {
        header.classList.remove('fixed')
      }
    })
  }

  const handleSearch = () => {
    searchInputRef.current.classList.toggle('active')
    searchInputRef.current.focus()
    setSearchInputState(Boolean(searchInputRef.current.className))
  }
 
  return (
    <header className='header'>
      <div className="my-container header__inner">

        <div className='header-logo'>
          <img src={LOGO_URL} alt="logo" />
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
                <Link className='drop-menu__link' to='/category/man'>Men's</Link>
                <Link className='drop-menu__link' to='/category/woman'>Women's</Link>
                <Link className='drop-menu__link' to='/category/car'>For Car</Link>
              </div>}
            </li>
            <li className='header-nav__link'><Link to="/delivery">Delivery</Link></li>
            <li className='header-nav__link'><Link to="/about">About us</Link></li>
            <li className='header-nav__link'><Link to="/contacts">Contacts</Link></li>
          </ul>
        </nav>
        <div className='header-cart'>
          <input ref={searchInputRef} type="text" className=''/>
          <button className='header-cart__icon' onClick={handleSearch}>
            {searchInputState ? <Icon id='close'/> : <Icon id='search'/>}
          </button>
          <div className='header-cart__user-container'>
            <button
              className=''
              onMouseEnter={() => setAuthDropMenu(true)}
              onMouseLeave={() => setAuthDropMenu(false)}
            >
              {authedUser
                ? <img src={authedUser.image} alt="avatar" />
                : <Icon id='user'/>
              }
            </button>
            {authedUser
              ? (authDropMenu &&
                  <div
                    onMouseEnter={() => setAuthDropMenu(true)}
                    onMouseLeave={() => setAuthDropMenu(false)}
                    className='drop-menu'
                  >
                    <NavLink to='/profile'>Profile</NavLink>
                    <NavLink to='/auth/login' onClick={logOut} style={{color: 'red'}}>LogOut</NavLink>
                  </div>
              )
              : (authDropMenu &&
                <div
                  onMouseEnter={() => setAuthDropMenu(true)}
                  onMouseLeave={() => setAuthDropMenu(false)}
                  className='drop-menu'
                >
                  <NavLink to='/auth/login'>Login</NavLink>
                  <NavLink to='/auth/register'>Register</NavLink>
                </div>
              )
            }
            
          </div>
          <button className='header-cart__icon'>
            <Icon id='cart'/>
          </button>
        </div>
      </div>
    </header>
  )
}
 
export default Header