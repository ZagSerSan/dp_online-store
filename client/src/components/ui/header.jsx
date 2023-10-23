import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
// css
import './css/header.css'
// components
import Icon from '../common/icon'
import useStore from '../../store/createStore'
import userService from '../../service/user.service'
import { cartAnimation } from '../../utils/cartAnimation'
import TextField from '../common/form/textField'
import userStore from '../../store/userStore'

const Header = () => {
  const LOGO_URL = 'http://localhost:8080/images/logo/logoSapach.png'  
  const { authedUser, updAuthedUser, updLocalUserCart, localUser, logOut } = userStore()
  const { globalLoading, productsEntity } = useStore()

  const [dropMenu, setDropMenu] = useState(false)
  const [cartMenu, setCartMenu] = useState(false)
  const [authDropMenu, setAuthDropMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchData, setSearchData] = useState({search: ''})
  const [filteredProducts, setFilteredProducts] = useState()
  
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

  const logout = () => {
    logOut()
    setAuthDropMenu(false)
  }

  const handleChange = ({ name, value }) => {
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }))
    setFilteredProducts(value
      ? productsEntity.filter(entity => entity.name.toLowerCase().includes(value.toLowerCase())).splice(0, 4)
      : []
    )
  }
  
  const closeSearch = () => {
    setShowSearch(false)
    setSearchData({search: ''})
    setFilteredProducts([])
  }

  const handleSearch = () => {
    if (showSearch) {
      setShowSearch(false)
      closeSearch()
    } else {
      setShowSearch(true)
    }
  }

  const removeFromCart = async (e, item) => {
    cartAnimation(e.target, true)
    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          cart: authedUser.cart.filter(cartItem => cartItem._id !== item._id)
        }
        const { content } = await userService.updateUser(newUserData)
        updAuthedUser(content)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserCart(item)
    }
    
  }

  const cartItemsForDropMenu = authedUser
    ? authedUser.cart
    : localUser ? localUser.cart : null

  return (
    <header className='header'>
      <div className='cart-helper'>
        <Icon id='cart'/>
      </div>
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
            {
              (authedUser && authedUser.admin) &&
              <li className='header-nav__link'><Link to="/admin">Admin</Link></li>
            }
          </ul>
        </nav>
        
        <div className='header-panel'>
          {showSearch &&
            <div
              className='drop-menu search'
            >
              <TextField
                placeholder="write to search.."
                name="search"
                value={searchData.search}
                onChange={handleChange}
              />
              {(filteredProducts && filteredProducts.length > 0)
                ? <div className='search-wrapper'>
                  {(filteredProducts.map(item => (
                    <div key={item._id} className='search-wrapper__col'>
                      <div className="search-wrapper__row">
                        <NavLink onClick={closeSearch} to={`/category/${item.type}/${item._id}`}>
                          <img src={item.preview} alt={item.name} />
                        </NavLink>
                      </div>
                      <div className="search-wrapper__row">
                        <NavLink onClick={closeSearch} to={`/category/${item.type}/${item._id}`}>
                          {item.name}
                        </NavLink>
                        <p>${item.price}</p>
                      </div>
                    </div>
                    ))
                  )}
                  <div className='to-search-btn'>
                    <NavLink className='drop-menu__link to-search-btn' to='/cart'>
                      Wiew more
                    </NavLink>
                  </div>
                </div>
                : searchData.search ? <p className='not-found'>not found</p> : null
              }
            </div>
            }
          <button className='header-panel__icon' onClick={handleSearch}>
            {showSearch ? <Icon id='close'/> : <Icon id='search'/>}
          </button>
          <div className='header-panel__user-container'>
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
                    className='drop-menu user'
                  >
                    <NavLink onClick={() => setAuthDropMenu(false)} className='drop-menu__link' to={`/profile/${authedUser._id}`}>Profile</NavLink>
                    <NavLink onClick={() => setAuthDropMenu(false)} className='drop-menu__link' to='/favourites'>Favourites</NavLink>
                    <NavLink onClick={() => setAuthDropMenu(false)} className='drop-menu__link' to='/cart'>My cart</NavLink>
                    <NavLink onClick={logout} className='drop-menu__link' to='/auth/login' style={{color: 'red'}}>LogOut</NavLink>
                  </div>
              )
              : (authDropMenu &&
                <div
                  onMouseEnter={() => setAuthDropMenu(true)}
                  onMouseLeave={() => setAuthDropMenu(false)}
                  className='drop-menu user'
                >
                  <NavLink className='drop-menu__link' to='/auth/login'>Login</NavLink>
                  <NavLink className='drop-menu__link' to='/auth/register'>Register</NavLink>
                </div>
              )
            }
            
          </div>
          <div className={'header-panel__icon cart' + (cartMenu ? ' big-zone' : '')}
            data-cart='cart'
            onMouseEnter={() => setCartMenu(true)}
            onMouseLeave={() => setCartMenu(false)}
          >
            <div className="card-index">
              {
                (authedUser && authedUser.cart.length > 0 ? authedUser.cart.length : null)
                || (localUser && localUser?.cart.length > 0 ? localUser.cart.length : null)
              }
            </div>
            <Icon id='cart'/>
            {cartMenu &&
              <div
                onMouseEnter={() => setCartMenu(true)}
                onMouseLeave={() => setCartMenu(false)}
                className='drop-menu cart'
              >
                {(cartItemsForDropMenu && cartItemsForDropMenu.length > 0)
                  ? <div className='cart-wrapper'>
                    {(cartItemsForDropMenu.map(item => (
                      <div key={item._id} className='cart-wrapper__col'>
                        <div className="cart-wrapper__row">
                          <NavLink to={`/category/${item.type}/${item._id}`}>
                            <img src={item.image} alt={item.name} />
                          </NavLink>
                        </div>
                        <div className="cart-wrapper__row">
                          <NavLink to={`/category/${item.type}/${item._id}`}>
                            {item.name}
                          </NavLink>
                          <p>{item.price} x {item.count} = <span className='total-price'>{item.totalPrice}</span></p>
                        </div>
                        <button onClick={(e) => removeFromCart(e, item)}><Icon id='close'/></button>
                      </div>
                      ))
                    )}
                    <div className='to-cart-btn'>
                      <NavLink className='drop-menu__link to-cart-btn' to='/cart'>
                        Go to cart
                      </NavLink>
                    </div>
                  </div>
                  : <p className='cart-is-empty'>cart is empty</p>
                }
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  )
}
 
export default Header