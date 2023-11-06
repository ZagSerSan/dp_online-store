import React from 'react'
import { Link } from 'react-router-dom'
import './css/cartPage.css'
import userStore from '../../../store/userStore'
import MyProductsList from '../../common/table/myProductsList'

const CartPage = () => {
  const { authedUser, localUser } = userStore()
  const cartItems = authedUser
    ? authedUser?.cart
    : localUser?.cart

  // {authedUser && authedUser?.cart.length > 0
  //   ? <div className="card-index">{authedUser.cart.length}</div>
  //   : localUser && localUser?.cart.length > 0
  //     ? <div className="card-index">{localUser.cart.length}</div>
  //     : null
  // }

  return (
    <div className="my-container">
      <div className="cart-page">
        <h3 className='cart-page__title'>YOUR cart ITEMS</h3>
        {(authedUser && authedUser.cart.length > 0)
          || 
        (localUser && localUser?.cart.length > 0)
          ? <MyProductsList cartItems={cartItems}/>
          // ? <MyProductsList cartItems={authedUser.cart}/>
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
