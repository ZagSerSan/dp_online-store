import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { productCategories } from '../../../../data/categories/productCategories'
import styles from './navLinks.module.scss'

const NavLinks = () => {
  const { t } = useTranslation('header')
  const [dropMenu, setDropMenu] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setDropMenu(false)
  }, [location])

  return (
    <nav aria-label="Main Navigation">
      <ul className={styles.nav}>
        <li className={styles.link}><Link to="/">{t('mainNav_home')}</Link></li>
        <li className={styles.link}>
          <Link
            to="/category"
            onMouseEnter={() => setDropMenu(true)}
            onMouseLeave={() => setDropMenu(false)}
          >
            {t('mainNav_category')}
          </Link>
          {dropMenu && <ul
            onMouseEnter={() => setDropMenu(true)}
            onMouseLeave={() => setDropMenu(false)}
            className={`dropdown`} // глобальный класс
          >
            {productCategories.map(category => (
              <li key={category.id}>
                <Link
                  to={category.to}
                  className="dropdown-option" // глобальный класс
                >
                  {t(category.label)}
                </Link>
              </li>
            ))}
          </ul>}
        </li>
        <li className={styles.link}><Link to="/information">{t('mainNav_information')}</Link></li>
      </ul>

    </nav>
  )
}

export default NavLinks
