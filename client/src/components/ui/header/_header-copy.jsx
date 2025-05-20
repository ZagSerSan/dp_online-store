import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './css/header.css'
// store, service, utils
import productStore from '../../../store/productStore'
import userStore from '../../../store/userStore'
import globalStore from '../../../store/globalStore'
// import { cartAnimation } from '../../utils/cartAnimation'
// components
import Icon from '../../common/icon'
import TextField from '../../common/form/textField'
import applyDiscount from '../../../utils/applyDiscount'
import cartStore from '../../../store/cartStore'
import { getFullUserCartItems } from '../../../utils/getFullUserCartItems'
// import { productCategories } from '../../../data/categories/productCategories'
// import LanguageSwitcher from './LanguageSwitcher'

//todo целевой импорт
import StoreLogo from './StoreLogo'
import NavLinks from './NavLinks'
// import LanguageSwitcher from './LanguageSwitcher'
// import SearchButton from './SearchButton'
// import UserMenu from './UserMenu'
// import CartButton from './CartButton'

const Header = () => {
  // язык
  const [language, setLanguage] = useState("en")
  const { t } = useTranslation('header')
  
  // сущности и функции сторов
  const { authedUser, updateUser, updLocalUserCart, localUser, logOut } = userStore()
  const { removeFromCart } = cartStore()
  const { productsEntity } = productStore()
  const { globalLoading } = globalStore()
  // локальное состояния компонента
  const [filteredProducts, setFilteredProducts] = useState()
  // дроп меню
  const [dropMenu, setDropMenu] = useState(false)
  const [cartMenu, setCartMenu] = useState(false)
  const [authDropMenu, setAuthDropMenu] = useState(false)

  const [showSearch, setShowSearch] = useState(false)
  const [searchData, setSearchData] = useState({search: ''})

  const [burgerMenu, setBurgerMenu] = useState(false)

  // после загрузки приложения отслеживать скролл и переключать фиксацию header
  // так же скрывать дроп-меню при скролле
  // useEffect(() => {
  //   if (!globalLoading) {
  //     const header = document.querySelector('.header')
  //     const limitHeigth = (window.innerHeight / 3) < 200 ? 200 : window.innerHeight / 3

  //     window.addEventListener('scroll', (e) => {
  //       e.stopPropagation()
        
  //       if (window.scrollY > limitHeigth) {
  //         header.classList.add('fixed')
  //       } else {
  //         header.classList.remove('fixed')
  //       }

  //       setDropMenu(false)
  //       setCartMenu(false)
  //       setAuthDropMenu(false)
  //       setShowSearch(false)
  //       setBurgerMenu(false)
  //     })
  //   }
  // }, [globalLoading])

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
      {/* <div className='cart-helper'>
        <Icon id='cart'/>
      </div> */}

      <div className="my-container header__inner">
        {/* ------ логотип ----- */}
        <StoreLogo/>
        {/* ------ навигационные ссылки ----- */}
        <NavLinks authedUser={authedUser}/>
        
        {/* ------ правая панель действий ----- */}
        <div className='header-panel'>

          {/* <LanguageSwitcher currentLang={language} onChange={setLanguage} /> */}

          {/* кнопка поиска */}
          <button className='header-panel__icon' onClick={handleSearch}>
            {showSearch ? <Icon id='close'/> : <Icon id='search'/>}
          </button>

          {/* дроп-меню поиска */}
          {showSearch &&
            <div
              className='drop-menu search'
            >
              <TextField
                placeholder={t('search_placeholder')}
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
                : searchData.search ? <p className='not-found'>{t('search_notFound')}</p> : null
              }
            </div>
          }

          {/* кнопка и дроп-меню пользователя */}
          <div
            className='header-panel__user-container'
            onMouseEnter={toggleUserMenu}
            onMouseLeave={toggleUserMenu}
          >
            <button
              onClick={toggleUserMenu}
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
                    <NavLink onClick={() => setAuthDropMenu(false)} className='drop-menu__link' to={`/profile/${authedUser._id}`}>{t('userPanelItem_profile')}</NavLink>
                    <NavLink onClick={() => setAuthDropMenu(false)} className='drop-menu__link' to='/favourites'>{t('userPanelItem_favourites')}</NavLink>
                    <NavLink onClick={() => setAuthDropMenu(false)} className='drop-menu__link' to='/cart'>{t('userPanelItem_cart')}</NavLink>
                    <NavLink onClick={logout} className='drop-menu__link' to='/auth/login' style={{color: 'red'}}>{t('userPanelItem_logout')}</NavLink>
                  </div>
              )
              : (authDropMenu &&
                <div
                  onMouseEnter={() => setAuthDropMenu(true)}
                  onMouseLeave={() => setAuthDropMenu(false)}
                  className='drop-menu user'
                >
                  <NavLink onClick={() => setAuthDropMenu(false)} className='drop-menu__link' to='/favourites'>{t('userPanelItem_favourites')}</NavLink>
                  <NavLink className='drop-menu__link' to='/auth/login'>{t('userPanelItem_login')}</NavLink>
                  <NavLink className='drop-menu__link' to='/auth/register'>{t('userPanelItem_register')}</NavLink>
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
                        {t('cart_goToCart')}
                      </NavLink>
                    </div>
                  </div>
                  : <p className='cart-is-empty'>{t('cart_empty')}</p>
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
                <Link className='burger-menu__link' to="/">{t('mainNav_home')}</Link>
                <Link className='burger-menu__link' to="/category">{t('mainNav_category')}</Link>
                <Link className='burger-menu__link' to="/information">{t('mainNav_information')}</Link>
                {
                  (authedUser && authedUser.admin) &&
                  <Link className='burger-menu__link' to="/admin">{t('mainNav_admin')}</Link>
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
