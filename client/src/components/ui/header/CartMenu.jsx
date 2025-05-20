import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import productStore from '../../../store/productStore'
import cartStore from '../../../store/cartStore'
import userStore from '../../../store/userStore'

import Icon from '../../common/icon'
import applyDiscount from '../../../utils/applyDiscount'
import { getFullUserCartItems } from '../../../utils/getFullUserCartItems'

const CartMenu = ({ productsEntity, authedUser, localUser, updateUser}) => {
  const { t } = useTranslation('header')
  const { removeFromCart } = cartStore()
  const [cartMenu, setCartMenu] = useState(false)

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

  // открыть/закрыть меню корзины
  const toggleCartMenu = () => {
    if (cartMenu) {
      setCartMenu(false)
    } else {
      setCartMenu(true)
      // closeSearch()
    }
  }

  return (
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
  )
}

export default CartMenu
