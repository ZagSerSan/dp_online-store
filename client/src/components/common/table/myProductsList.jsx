import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './css/myProductsList.css'
import { Link, Navigate } from 'react-router-dom'
import Icon from '../icon'
import userStore from '../../../store/userStore'
import Pagination from '../pagination'
import applyDiscount from '../../../utils/applyDiscount'
import cartStore from '../../../store/cartStore'
import { calculateTotalPrice } from '../../../utils/calculateTotalPrice'

const MyProductsList = ({ cartItems }) => {
  const { authedUser, localUser, updateUser, updLocalUserCart } = userStore()
  const { removeFromCart } = cartStore()

  const [currentPage, setCurrentPage] = useState(0)
  // кол-во отображаемых на одной странице
  const countOnPage = 5
  // обрезка кол-ва для текущей страницы
  const splicedEntity = cartItems.slice(currentPage * countOnPage, (currentPage * countOnPage) + countOnPage)
  // кол-во всех в корзине
  const itemsCount = cartItems.length

  // вернуть на предыдушую страницу если 0 элементов на текущей
  if (splicedEntity.length === 0) {
    setCurrentPage(prev => prev - 1)
  }

  return (
      <div className='my-products'>

        <div className="my-products-list">
          {splicedEntity
            ? splicedEntity.map(item => (
              <div key={item.key} className="item">
                <img src={item.preview} alt="product preview" />
                <div className='item-content'>
                  <div className="item-content__name">
                    <Link to={`/category/${item.type}/${item._id}`} className='item-content__name'>{item.name}</Link>
                    <button
                      className='delete'
                      onClick={(e) => removeFromCart(e, item, authedUser, localUser, updateUser, updLocalUserCart)}
                    >
                      <Icon id='close'/>
                    </button>
                  </div>
                  <div className="item-content-info">
                    <div className="item-content-info__col">
                      {Object.keys(item.options).map(key => (
                        <p key={key}>
                          <span className='darkened-text'>{key}: </span>
                          <span>{item.options[key]}</span>
                        </p>
                      ))}
                    </div>
                    <div className="item-content-info__col">
                      {item.discount?.endTime > Date.now()
                        ? <p className="item-content__price">
                            <span className='darkened-text'>price: </span>
                            <span>${applyDiscount(item.price, item.discount).toFixed(2)} -
                            <strike> ${(item.price).toFixed(2)}</strike></span>
                          </p>
                        : <p className="item-content__price">${(item.price).toFixed(2)}</p>
                      }
                      <p className='item-content__price'>
                        <span className='darkened-text'>count: </span>
                        {item.count}
                      </p>
                    </div>
                    <div className="item-content-info__col">
                      <p>
                        <span className='darkened-text'>${applyDiscount(item.price, item.discount).toFixed(2)} x {item.count} = </span>
                        ${(applyDiscount(item.price, item.discount) * item.count).toFixed(2)}
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
          itemsCount={itemsCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <div className="my-products-actions">
          <div className="my-products-actions__total">
            <p>Total:</p>
            <p>${calculateTotalPrice(cartItems).toFixed(2)}</p>
          </div>
          <div className="my-products-actions-buttons">
            <button>pay for products</button>
            <button onClick={(e) => removeFromCart(e, null, authedUser, localUser, updateUser, updLocalUserCart, 'clear-all')}>Clear cart</button>
          </div>
        </div>
      </div>
  )
}

MyProductsList.propTypes = {
  cartItems: PropTypes.array
}

export default MyProductsList
