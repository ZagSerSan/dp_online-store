import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './css/header.css'
// store, service, utils
import productStore from '../../../store/productStore'
import userStore from '../../../store/userStore'
import globalStore from '../../../store/globalStore'

//todo целевой импорт
import StoreLogo from './StoreLogo'
import NavLinks from './NavLinks'
import LanguageSwitcher from './LanguageSwitcher'
import SearchButton from './SearchButton'
import UserMenu from './UserMenu'
import CartMenu from './CartMenu'

const Header = () => {
  // язык
  const [language, setLanguage] = useState("en")
  const { t } = useTranslation('header')
  // сущности и функции сторов
  const { authedUser, updateUser, updLocalUserCart, localUser, logOut } = userStore()
  const { productsEntity } = productStore()
  const { globalLoading } = globalStore()
  // бургер меню
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
  
  return (
    <header className='header'>

      <div className="my-container header__inner">
        {/* логотип ----- */}
        <StoreLogo/>
        {/* навигационные ссылки ----- */}
        <NavLinks authedUser={authedUser}/>
        {/* правая панель действий ----- */}
        <div className='header-panel'>
          {/* переключатель языков */}
          <LanguageSwitcher currentLang={language} onChange={setLanguage} />
          {/* поиск */}
          <SearchButton />
          {/* меню профиля */}
          <UserMenu authedUser={authedUser} logOut={logOut}/>
          {/* меню корзины */}
          <CartMenu {...{ productsEntity, authedUser, localUser, updateUser}}/>
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
