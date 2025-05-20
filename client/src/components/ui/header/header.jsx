import React, { useEffect } from 'react'
import './css/header.css'
// store, service, utils
import productStore from '../../../store/productStore'
import userStore from '../../../store/userStore'
import globalStore from '../../../store/globalStore'
// components
import StoreLogo from './StoreLogo'
import NavLinks from './NavLinks'
import LanguageSwitcher from './LanguageSwitcher'
import SearchButton from './SearchButton'
import UserMenu from './UserMenu'
import CartMenu from './CartMenu'
import BurgerMenu from './BurgerMenu'

const Header = () => {
  // сущности и функции сторов
  const { authedUser, updateUser, localUser, updLocalUserCart, logOut } = userStore()
  const { productsEntity } = productStore()
  const { globalLoading } = globalStore()

  // после загрузки приложения отслеживать скролл и переключать фиксацию header
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

      //? так же скрывать дроп-меню при скролле
        // setDropMenu(false)
        // setCartMenu(false)
        // setAuthDropMenu(false)
        // setShowSearch(false)
        // setBurgerMenu(false)
      })
    }
  }, [globalLoading])
  
  return (
    <header className='header'>
      <div className="my-container header__inner">
        {/* логотип */}
        <StoreLogo/>
        {/* навигация */}
        <NavLinks {...{ authedUser }}/>
        {/* правая панель действий */}
        <div className='header-panel'>
          {/* переключатель языков */}
          <LanguageSwitcher />
          {/* поиск */}
          <SearchButton {...{ productsEntity }}/>
          {/* меню профиля */}
          <UserMenu {...{ authedUser, logOut }}/>
          {/* меню корзины */}
          <CartMenu {...{ productsEntity, authedUser, updateUser, localUser, updLocalUserCart}}/>
          {/* бургер-меню */}
          <BurgerMenu {...{ authedUser }}/>
        </div>
      </div>
    </header>
  )
}
 
export default Header
