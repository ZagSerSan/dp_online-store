import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './css/myProductsList.css'
import { Link, Navigate } from 'react-router-dom'
import Icon from '../icon'
import { cartAnimation } from '../../../utils/cartAnimation'
import userStore from '../../../store/userStore'
import userService from '../../../service/user.service'
import Pagination from '../pagination'

const MyProductsList = ({ cartItems }) => {
  const { authedUser, updateUser, updLocalUserCart } = userStore()
  const [currentPage, setCurrentPage] = useState(0)
  const countOnPage = 5

  const splicedEntity = authedUser.cart
    ? authedUser.cart.slice(currentPage * countOnPage, (currentPage * countOnPage) + countOnPage)
    : []
  
  if (splicedEntity.length === 0) {
    setCurrentPage(prev => prev - 1)
  }

  const removeFromCart = async (e, item, role = '') => {
    cartAnimation(e.target, true)
    if (authedUser) {
      try {
        let cart
        if (role === 'clear-all') {
          cart = []
        } else {
          cart = authedUser.cart.filter(cartItem => cartItem._id !== item._id)
        }
        const newUserData = {
          _id: authedUser._id,
          cart
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
          {splicedEntity
            ? splicedEntity.map(item => (
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

        <Pagination
          countOnPage={countOnPage}
          itemsCount={authedUser.cart.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <div className="my-products-actions">
          <div className="my-products-actions__total">
            <p>Total:</p>
            <p>${calculateTotalPrice(cartItems)}</p>
          </div>
          <div className="my-products-actions-buttons">
            <button>pay for products</button>
            <button onClick={(e) => removeFromCart(e, null, 'clear-all')}>Clear cart</button>
          </div>
        </div>
      </div>
  )
}

MyProductsList.propTypes = {
  cartItems: PropTypes.array
}

export default MyProductsList
