import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './css/header.css'
// store, service, utils
import productStore from '../../store/productStore'
import userStore from '../../store/userStore'
import globalStore from '../../store/globalStore'
import { cartAnimation } from '../../utils/cartAnimation'
import configFile from '../../config.json'
// components
import Icon from '../common/icon'
import TextField from '../common/form/textField'
import applyDiscount from '../../utils/applyDiscount'
import cartStore from '../../store/cartStore'
import { getFullUserCartItems } from '../../utils/getFullUserCartItems'

const Header = () => {
  const LOGO_URL = `${configFile.apiEndPoint}images/logo/logoSapach.png`  

  // сущности и функции сторов
  const { authedUser, updateUser, updLocalUserCart, localUser, logOut } = userStore()
  const { removeFromCart } = cartStore()
  const { productsEntity } = productStore()
  const { globalLoading } = globalStore()
  // локальное состояния компонента
  const [filteredProducts, setFilteredProducts] = useState()
  const [dropMenu, setDropMenu] = useState(false)
  const [cartMenu, setCartMenu] = useState(false)
  const [authDropMenu, setAuthDropMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchData, setSearchData] = useState({search: ''})
  const [burgerMenu, setBurgerMenu] = useState(false)

  // после загрузки приложения отслеживать скролл и переключать фиксацию header
  // так же скрывать дроп-меню при скролле
  useEffect(() => {
    if (!globalLoading) {
      const header = document.querySelector('.header')
      const limitHeigth = (window.innerHeight / 3) < 200 ? 200 : window.innerHeight / 3

      window.addEventListener('scroll', (e) => {
        e.stopPropagation()
        
        if (window.scrollY > limitHeigth) {
          header.classList.add('fixed')
        } else {
          header.classList.remove('fixed')
        }

        setDropMenu(false)
        setCartMenu(false)
        setAuthDropMenu(false)
        setShowSearch(false)
        setBurgerMenu(false)
      })
    }
  }, [globalLoading])
  // переключение бургер меню
  const toggleBurger = () => {
    setBurgerMenu(prev => !prev)
    closeSearch()
  }
  // изменение состояния поиска
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
  // открыть/закрыть меню пользователя
  const toggleUserMenu = () => {
    if (authDropMenu) {
      setAuthDropMenu(false)
    } else {
      setAuthDropMenu(true)
      closeSearch()
    }
  }
  // открыть/закрыть меню корзины
  const toggleCartMenu = () => {
    if (cartMenu) {
      setCartMenu(false)
    } else {
      setCartMenu(true)
      closeSearch()
    }
  }
  // открыть/закрыть поиск
  const handleSearch = () => {
    if (showSearch) {
      setShowSearch(false)
      closeSearch()
    } else {
      setShowSearch(true)
    }
  }
  // обнуление состояния поиска
  const closeSearch = () => {
    setShowSearch(false)
    setSearchData({search: ''})
    setFilteredProducts([])
  }
  const logout = () => {
    logOut()
    setAuthDropMenu(false)
  }

  // Сопоставляем актуальные полные данные продуктов на основе корзины
  const cartItemsForDropMenu = authedUser
    ? getFullUserCartItems(productsEntity, authedUser.cart)
    : localUser
      ? getFullUserCartItems(productsEntity, localUser.cart)
      : []

  // максимал кол-во показа продуктов в дроп меню
  const dropItemslimit = 5
  // обрезка
  const splicedItems = cartItemsForDropMenu?.length > dropItemslimit
    ? cartItemsForDropMenu.slice(0, dropItemslimit)
    : cartItemsForDropMenu

  return (
    <header className='header'>
      {/* хелпер для анимации полета корзины */}
      <div className='cart-helper'>
        <Icon id='cart'/>
      </div>
      <div className="my-container header__inner">
        {/* логотип */}
        <div className='header-logo'>
          <img src={LOGO_URL} alt="logo" />
        </div>
        {/* навигационные ссылки */}
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
            <li className='header-nav__link'><Link to="/information">Information</Link></li>
            {
              (authedUser && authedUser.admin) &&
              <li className='header-nav__link'><Link to="/admin">Admin</Link></li>
            }
          </ul>
        </nav>
        {/* правая панель действий */}
        <div className='header-panel'>
          {/* дроп-меню поиска */}
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
                    <NavLink onClick={closeSearch} className='drop-menu__link to-search-btn' to='/category'>
                      View more
                    </NavLink>
                  </div>
                </div>
                : searchData.search ? <p className='not-found'>not found</p> : null
              }
            </div>
          }
          {/* кнопка поиска */}
          <button className='header-panel__icon' onClick={handleSearch}>
            {showSearch ? <Icon id='close'/> : <Icon id='search'/>}
          </button>
          {/* кнопка и дроп-меню пользователя */}
          <div className='header-panel__user-container'>
            <button
              onClick={toggleUserMenu}
              onMouseEnter={toggleUserMenu}
              onMouseLeave={toggleUserMenu}
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
                  <NavLink onClick={() => setAuthDropMenu(false)} className='drop-menu__link' to='/favourites'>Favourites</NavLink>
                  <NavLink className='drop-menu__link' to='/auth/login'>Login</NavLink>
                  <NavLink className='drop-menu__link' to='/auth/register'>Register</NavLink>
                </div>
              )
            }
          </div>
          {/* кнопка и дроп-меню корзины */}
          <div className={'header-panel__icon cart' + (cartMenu ? ' big-zone' : '')}
            data-cart='cart'
            onClick={toggleCartMenu}
            onMouseEnter={toggleCartMenu}
            onMouseLeave={toggleCartMenu}
          >
            {authedUser && authedUser?.cart.length > 0
              ? <div className="card-index">{authedUser.cart.length}</div>
              : localUser && localUser?.cart.length > 0
                ? <div className="card-index">{localUser.cart.length}</div>
                : null
            }
            <Icon id='cart'/>
            {cartMenu &&
              <div
                onMouseEnter={() => setCartMenu(true)}
                onMouseLeave={() => setCartMenu(false)}
                className='drop-menu cart'
              >
                {(splicedItems && splicedItems.length > 0)
                  ? <div className='cart-wrapper'>
                    {(splicedItems.map(item => (
                      <div key={item.key} className='cart-wrapper__col'>
                        <div className="cart-wrapper__row">
                          <NavLink to={`/category/${item.type}/${item._id}`}>
                            <img src={item.preview} alt={item.name} />
                          </NavLink>
                        </div>
                        <div className="cart-wrapper__row">
                          <NavLink to={`/category/${item.type}/${item._id}`}>
                            {item.name}
                          </NavLink>

                          <p>{applyDiscount(item.price, item.discount).toFixed(2)} x {item.count} = <span className='total-price'>{applyDiscount(item.price, item.discount).toFixed(2) * item.count}</span></p>

                        </div>
                        <button onClick={(e) => removeFromCart(e, item, authedUser, localUser, updateUser, updLocalUserCart)}><Icon id='close'/></button>
                      </div>
                      ))
                    )}
                    <div className='to-cart-btn'>
                      <NavLink className='drop-menu__link to-cart-btn' to='/cart'>
                        Go to cart
                      </NavLink>
                    </div>
                  </div>
                  : <p className='cart-is-empty'>empty</p>
                }
              </div>
            }
          </div>
          {/* кнопка бургер-меню */}
          <div className="burger" onClick={toggleBurger}>
            {/* кнопка */}
            <button className={"burger-button" + (burgerMenu ? " active" : '')}>
	            <div className="burger-button__icon"></div>
            </button>
            {/* меню */}
            {burgerMenu && (
              <div className="burger-menu">
                <Link className='burger-menu__link' to="/">Home</Link>
                <Link className='burger-menu__link' to="/category">Category</Link>
                <Link className='burger-menu__link' to="/information">Information</Link>
                {
                  (authedUser && authedUser.admin) &&
                  <Link className='burger-menu__link' to="/admin">Admin</Link>
                }
              </div>
            )}
          </div>
        </div> 
      </div>
    </header>
  )
}
 
export default Header
