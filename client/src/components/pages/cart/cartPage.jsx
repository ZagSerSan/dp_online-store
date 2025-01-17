import React from 'react'
import { Link } from 'react-router-dom'
import './css/cartPage.css'
import userStore from '../../../store/userStore'
import MyProductsList from '../../common/table/myProductsList'
import productStore from '../../../store/productStore'

// todo получать скидки из отдельной сущности скидок на сервере (прежде создав её)
// не нужно создавать доп сущность на mongo, а продолжить хранить скидку discount в продукте
// и оттуда юзать эту инфу.. а доп скидки для этого пользователя (залогиненного)
// хранить в его сущности в свойстве/поле discount: {delivery: 10} // напр доставка и прочее

const CartPage = () => {
  // получение выполнившего вход пользователя или из localStore
  const { authedUser, localUser } = userStore()
  // получение сущности продуктов из productStore
  const { productsEntity } = productStore()
  // получение продуктов корзины из сущности пользователя (выполнившего вход или из localStore)
  const cartItems = authedUser
    ? authedUser?.cart
    : localUser?.cart

  // если вдруг сущности не загрузились (тестовый момент)
  if (!cartItems || !productsEntity) return

  // Сопоставляем данные из корзины с актуальными данными о продуктах
  const updatedCart = cartItems.map(item => {
    const productData = productsEntity.find(product => product._id === item._id)
    return {
      ...item,
      ...productData // Обновляем информацию о продукте
    }
  })

  return (
    <div className="my-container">
      <div className="cart-page">
        <h3 className='cart-page__title'>YOUR cart ITEMS</h3>
        {(authedUser && authedUser.cart.length > 0) || (localUser && localUser?.cart.length > 0)
          ? <MyProductsList cartItems={updatedCart}/>
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
