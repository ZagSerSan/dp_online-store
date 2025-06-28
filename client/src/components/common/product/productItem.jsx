import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import './css/productItem.scss'
//store, components
import cartStore from '../../../store/cartStore'
import userStore from '../../../store/userStore'
import Icon from '../icon'
import applyDiscount from '../../../utils/applyDiscount'

const ProductItem = ({ item, setModalState, setModalItem }) => {
  const navigate = useNavigate()
  const { authedUser, localUser, updateUser, updLocalUserCart, updLocalUserBookmarks } = userStore()
  const { addToCart, removeFromCart, toggleBookmark } = cartStore()
  const { _id: id, name, preview, title, price, type, discount } = item
  const [cartHover, setCartHover] = useState(false)

  // является ли айтем избранным ?
  const isBookmarked = authedUser
    ? authedUser.bookmarks.includes(id)
    : (localUser ? localUser.bookmarks?.includes(id) : false)
  // является ли айтем в корзине ?
  const isInCart = authedUser
    ? authedUser.cart.find(cartItem => cartItem._id === id)
    : (localUser ? localUser.cart.find(cartItem => cartItem._id === id) : false)

  // открыть страницу этого продукта
  const openItemPage = (e) => {
    e.stopPropagation()
    navigate(`/category/${type}/${id}`)
  }
  // показать айтем в модальном окне
  const showItem = (e, item) => {
    e.stopPropagation()
    setModalState(true)
    setModalItem(item)

    // open modal window animation
    const target = e.target
    const targetCoords = target.getBoundingClientRect()
    const modalWindow = document.querySelector('.product-modal__wrapper')
    const prodItem_height = document.querySelector('.product-item__img').clientHeight
    
    modalWindow.style.top = `${targetCoords.top - 130}px`
    modalWindow.style.left = `${targetCoords.left - 90}px`
    modalWindow.style.height = `${prodItem_height}px`
    modalWindow.style.width = `${prodItem_height}px`
  }

  // handleCartChange
  const handleAddToCart = (e, params) => {
    e.stopPropagation()
    addToCart(e, authedUser, localUser, updateUser, updLocalUserCart, item, isInCart)
  }
  const handleRemoveFromCart = (e, params) => {
    e.stopPropagation()
    removeFromCart(e, isInCart, authedUser, localUser, updateUser, updLocalUserCart)
  }

  return (
    <div key={id} className="product-item">
      {/* product item image */}
      <div onClick={openItemPage} className="product-item__img">
        <img src={preview} alt={title} />
        {/* image popap */}
        <div className="product-item__img-popap">
          <button onClick={(e) => showItem(e, item)}>
            <Icon id='view' data-modal='1'/>
          </button>
          <button
            onClick={isInCart
              ? (e) => handleRemoveFromCart(e, isInCart, authedUser, localUser, updateUser, updLocalUserCart)
              : (e) => handleAddToCart(e, authedUser, localUser, updateUser, updLocalUserCart, item, isInCart)
            }
            onMouseEnter={() => setCartHover(true)}
            onMouseLeave={() => setCartHover(false)}
          >
            {isInCart
              ? (cartHover ? <Icon id='cart-del'/> : <Icon id='cart-check'/>)
              : (cartHover ? <Icon id='cart-add'/> : <Icon id='cart-init'/>)
            }
          </button>
        </div>
      </div>
      {/* product item content */}
      <div className="product-item__content">
        <div className="product-item__title">
          <Link to={`/category/${item.type}/${item._id}`}>{name}</Link>
          <button
            onClick={(e) => toggleBookmark(e, item._id, authedUser, updateUser, updLocalUserBookmarks)}
            className={isBookmarked ? ' active' : ''}
          >
            <Icon id='heart'/>
          </button>
        </div>

        {discount?.endTime > Date.now()
          ? <p className="product-item__price">
              <span>{applyDiscount(price, discount).toFixed(2)} zł - </span>
              <strike>{(price).toFixed(2)} zł</strike>
            </p>
          : <p className="product-item__price">{price.toFixed(2)} zł</p>
        }
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  item: PropTypes.object,
  setModalState: PropTypes.func,
  setModalItem: PropTypes.func
}

export default ProductItem
