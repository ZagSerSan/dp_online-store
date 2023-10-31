import React from 'react'
import './css/cartPage.css'
import userStore from '../../../store/userStore'
import MyProductsList from '../../common/table/myProductsList'
import { Navigate } from 'react-router-dom'


const CartPage = () => {
  const { authedUser } = userStore()

  return (
    <div className="my-container">
      <div className="cart-page">
        <h3 className='favourites-page__title'>YOUR cart ITEMS</h3>
        {authedUser && authedUser.cart
          ? <MyProductsList cartItems={authedUser.cart}/>
          : <Navigate to='/home'/>
        }
      </div>
    </div>
  )
}

export default CartPage
