import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const BurgerMenu = ({ authedUser }) => {
  const [burgerMenu, setBurgerMenu] = useState(false)
  const { t } = useTranslation('header')

  const toggleBurger = () => {
    setBurgerMenu(prev => !prev)
    // closeSearch()
  }

  return (
    <div className="burger" onClick={toggleBurger}>
      <button className={"burger-button" + (burgerMenu ? " active" : '')}>
        <div className="burger-button__icon"></div>
      </button>

      {burgerMenu && (
        <div className="burger-menu">
          <Link className='burger-menu__link' to="/">{t('mainNav_home')}</Link>
          <Link className='burger-menu__link' to="/category">{t('mainNav_category')}</Link>
          <Link className='burger-menu__link' to="/information">{t('mainNav_information')}</Link>
        </div>
      )}
    </div>
  )
}

export default BurgerMenu
