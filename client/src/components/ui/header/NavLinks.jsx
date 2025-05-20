import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { productCategories } from '../../../data/categories/productCategories'

const NavLinks = ({ authedUser }) => {
  const { t } = useTranslation('header')
  const [dropMenu, setDropMenu] = useState(false)
  
  return (
    <nav>
      <ul className='header-nav'>
        <li className='header-nav__link'><Link to="/">{t('mainNav_home')}</Link></li>
        <li className='header-nav__link'>
          <Link
            to="/category"
            onMouseEnter={() => setDropMenu(true)}
            onMouseLeave={() => setDropMenu(false)}
          >
            {t('mainNav_category')}
          </Link>
          {dropMenu && <div
            onMouseEnter={() => setDropMenu(true)}
            onMouseLeave={() => setDropMenu(false)}
            className='drop-menu'
          >
            {productCategories.map(category => (
              <Link key={category.id} className='drop-menu__link' to={category.to}>{t(category.label)}</Link>
            ))}
          </div>}
        </li>
        <li className='header-nav__link'><Link to="/information">{t('mainNav_information')}</Link></li>
        <li className='header-nav__link'><Link to="/information">{t('mainNav_partnership')}</Link></li>
        {/* {
          (authedUser && authedUser.admin) &&
          <li className='header-nav__link'><Link to="/admin">{t('mainNav_admin')}</Link></li>
        } */}
      </ul>
    </nav>
  )
}

export default NavLinks
