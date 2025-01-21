import React from 'react'
import { Link } from 'react-router-dom'
import './css/cartPage.css'
import userStore from '../../../store/userStore'
import MyProductsList from '../../common/table/myProductsList'
import productStore from '../../../store/productStore'
import { getFullUserCartItems } from '../../../utils/getFullUserCartItems'

const CartPage = () => {
  // получение выполнившего вход пользователя или из localStore
  const { authedUser, localUser } = userStore()
  // получение сущности продуктов из productStore
  const { productsEntity } = productStore()

  // Сопоставляем актуальные полные данные продуктов на основе корзины
  const cartItems = authedUser
  ? getFullUserCartItems(productsEntity, authedUser.cart)
  : localUser
    ? getFullUserCartItems(productsEntity, localUser.cart)
    : []

  // если вдруг сущности не загрузились (тестовый момент)
  if (!cartItems || !productsEntity) return

  return (
    <div className="my-container">
      <div className="cart-page">
        <h3 className='cart-page__title'>YOUR cart ITEMS</h3>
        {(authedUser && authedUser.cart.length > 0) || (localUser && localUser?.cart.length > 0)
          ? <MyProductsList cartItems={cartItems}/>
          : <div className='cart-empty'>
              <p>There's nothing here...</p>
              <Link to='/category'>View products</Link>
            </div>
        }
      </div>
    </div>
  )
}

export default CartPage
