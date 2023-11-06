import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import './css/productItem.css'
//store, components
import cartStore from '../../../store/cartStore'
import userStore from '../../../store/userStore'
import Icon from '../icon'

const ProductItem = ({ item, setModalState, setModalItem }) => {
  const navigate = useNavigate()
  const { authedUser, localUser, updateUser, updLocalUserCart, updLocalUserBookmarks } = userStore()
  const { addToCart, toggleBookmark } = cartStore()
  const { _id: id, name, preview, title, price, type } = item
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

  return (
    <div key={id} className="product-item">
      <div onClick={openItemPage} className="product-item__img">
        <img src={preview} alt={title} />
        <div className="product-item__img-popap">
          <button onClick={(e) => showItem(e, item)}>
            <Icon id='view' data-modal='1'/>
          </button>
          <button
            onClick={(e) => addToCart(e, authedUser, updateUser, updLocalUserCart, item, isInCart )}
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

      <div className="product-item__content">
        <div className="product-item__title">
          <Link to={`/category/${item.type}/${item._id}`}>{name}</Link>
          <button
            onClick={(e) => toggleBookmark(e, item._id, authedUser, updateUser, updLocalUserBookmarks)}
            className={'w-[24px] h-[24px] z-10' + (isBookmarked ? ' active' : '')}
          >
            <Icon id='heart'/>
          </button>
        </div>
        <p className="product-item__price">${price}.00</p>
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
