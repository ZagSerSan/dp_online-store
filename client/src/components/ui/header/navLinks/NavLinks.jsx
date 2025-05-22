import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { productCategories } from '../../../../data/categories/productCategories'
import styles from './navLinks.module.scss'
import DropdownMenu from '../../../common/dropdownMenu/DropdownMenu' // путь подкорректируй под свой

const NavLinks = () => {
  const { t } = useTranslation('header')

  return (
    <nav aria-label="Main Navigation">
      <ul className={styles.nav}>
        <li className={styles.link}><Link to="/">{t('mainNav_home')}</Link></li>
        <li className={styles.link}>
          <DropdownMenu
            toggleContent={
              <span>{t('mainNav_category')}</span>
            }
          >
            {productCategories.map(category => (
              <Link
                key={category.id}
                to={category.to}
                className="dropdown-option" // переиспользуемый класс
              >
                {t(category.label)}
              </Link>
            ))}
          </DropdownMenu>
        </li>
        <li className={styles.link}><Link to="/information">{t('mainNav_information')}</Link></li>
      </ul>
    </nav>
  )
}

export default NavLinks
