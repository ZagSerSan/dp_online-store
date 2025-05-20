import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const UserMenu = ({ authedUser, logOut }) => {
  const [authDropMenu, setAuthDropMenu] = useState(false)
  const { t } = useTranslation('header')

  // открыть/закрыть меню пользователя
  const toggleUserMenu = () => {
    if (authDropMenu) {
      setAuthDropMenu(false)
    } else {
      setAuthDropMenu(true)
    }
  }

  const logout = () => {
    logOut()
    setAuthDropMenu(false)
  }

  return (
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
  )
}

export default UserMenu