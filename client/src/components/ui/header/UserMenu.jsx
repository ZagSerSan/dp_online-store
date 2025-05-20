import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../../common/icon'

const UserMenu = ({ authedUser, logOut }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('header')

  // открыть/закрыть меню пользователя
  const handleClick = () => setIsOpen((prev) => !prev)

  const logout = () => {
    logOut()
    setIsOpen(false)
  }

  return (
    <div
      className='header-panel__user-container'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button onClick={handleClick}>
        {authedUser // показ разных иконок в завис-сти от наличия логина
          ? <img src={authedUser.image} alt="avatar" />
          : <Icon id='user'/>
        }
      </button>
      {authedUser // показ разных меню в завис-сти от наличия логина
        ? (isOpen &&
            <div
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className='drop-menu user'
            >
              <NavLink onClick={() => setIsOpen(false)} className='drop-menu__link' to={`/profile/${authedUser._id}`}>{t('userPanelItem_profile')}</NavLink>

              { authedUser.admin &&
                <NavLink onClick={() => setIsOpen(false)} className='drop-menu__link' to={`/admin`}>{t('mainNav_admin')}</NavLink>
              }

              <NavLink onClick={() => setIsOpen(false)} className='drop-menu__link' to='/favourites'>{t('userPanelItem_favourites')}</NavLink>
              <NavLink onClick={() => setIsOpen(false)} className='drop-menu__link' to='/cart'>{t('userPanelItem_cart')}</NavLink>
              <NavLink onClick={logout} className='drop-menu__link' to='/auth/login' style={{color: 'red'}}>{t('userPanelItem_logout')}</NavLink>
            </div>
        )
        : (isOpen &&
          <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className='drop-menu user'
          >
            <NavLink onClick={() => setIsOpen(false)} className='drop-menu__link' to='/auth/login'>{t('userPanelItem_login')}</NavLink>
            <NavLink onClick={() => setIsOpen(false)} className='drop-menu__link' to='/favourites'>{t('userPanelItem_favourites')}</NavLink>
            <NavLink onClick={() => setIsOpen(false)} className='drop-menu__link' to='/cart'>{t('userPanelItem_cart')}</NavLink>
          </div>
        )
      }
    </div>
  )
}

export default UserMenu