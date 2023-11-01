import React from 'react'
import PropTypes from 'prop-types'
import './css/myProductsList.css'
import { Link, Navigate } from 'react-router-dom'
import Icon from '../icon'
import { cartAnimation } from '../../../utils/cartAnimation'
import userStore from '../../../store/userStore'
import userService from '../../../service/user.service'

const MyProductsList = ({ cartItems }) => {
  const { authedUser, updateUser, updLocalUserCart } = userStore()

  const removeFromCart = async (e, item) => {
    cartAnimation(e.target, true)
    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          cart: authedUser.cart.filter(cartItem => cartItem._id !== item._id)
        }
        const { content } = await userService.updateUser(newUserData)
        updateUser(content)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserCart(item)
    }
  }

  const calculateTotalPrice = (products) => {
    let sum = 0
    for (let i = 0; i < products.length; i++) {
      sum += products[i].totalPrice
    }
    return sum
  }

  return (
      <div className='my-products'>

        <div className="my-products-list">
          {cartItems
            ? cartItems.map(item => (
              <div key={item._id} className="item">
                <img src={item.image} alt="product image" />
                <div className='item-content'>
                  <div className="item-content__name">
                    <Link to={`/category/${item.type}/${item._id}`} className='item-content__name'>{item.name}</Link>
                    <button
                      className='delete'
                      onClick={(e) => removeFromCart(e, item)}
                    >
                      <Icon id='close'/>
                    </button>
                  </div>
                  <div className="item-content-info">
                    <div className="item-content-info__col">
                      {Object.keys(item.optionTypes).map(key => (
                        <p key={key}>
                          <span className='darkened-text'>{key}: </span>
                          <span>{item.optionTypes[key]}</span>
                        </p>
                      ))}
                    </div>
                    <div className="item-content-info__col">
                      <p className='item-content__price'>
                        <span className='darkened-text'>price: </span>
                        ${item.price}
                      </p>
                      <p className='item-content__price'>
                        <span className='darkened-text'>count: </span>
                        {item.count}
                      </p>
                    </div>
                    <div className="item-content-info__col">
                      <p>Total price:</p>
                      <p>
                        <span className='darkened-text'>${item.price} x {item.count} = </span>
                        ${item.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
            : <Navigate to='/home'/>
          }
        </div>

        <div className="my-products-actions">
          <div className="my-products-actions__total">
            <p>Total price:</p>
            <p>${calculateTotalPrice(cartItems)}</p>
          </div>
          <div className="my-products-actions-buttons">
            <button>pay for products</button>
            <button>Clear cart</button>
          </div>
        </div>
      </div>
  )
}

MyProductsList.propTypes = {
  cartItems: PropTypes.array
}

export default MyProductsList
