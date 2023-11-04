import React from 'react'
import './css/cartPage.css'
import userStore from '../../../store/userStore'
import MyProductsList from '../../common/table/myProductsList'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { authedUser } = userStore()

  return (
    <div className="my-container">
      <div className="cart-page">
        <h3 className='favourites-page__title'>YOUR cart ITEMS</h3>
        {authedUser && authedUser.cart.length > 0
          ? <MyProductsList cartItems={authedUser.cart}/>
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
