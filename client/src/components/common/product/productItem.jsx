import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/productItem.css'
import Icon from '../icon'
import cartStore from '../../../store/cartStore'
import userStore from '../../../store/userStore'

const ProductItem = ({ item, setModalState, setModalItem }) => {
  const { _id: id, name, preview, title, price, type } = item
  const navigate = useNavigate()
  const [cartHover, setCartHover] = useState(false)

  //todo
  const { authedUser, localUser, updateUser, updLocalUserCart, updLocalUserBookmarks } = userStore()
  const { addToCart, toggleBookmark } = cartStore()

  const isBookmarked = authedUser
    ? authedUser.bookmarks.includes(id)
    : (localUser ? localUser.bookmarks?.includes(id) : false)
  const isInCart = authedUser
    ? authedUser.cart.find(cartItem => cartItem._id === id)
    : (localUser ? localUser.cart.find(cartItem => cartItem._id === id) : false)

  const openItemPage = (e) => {
    e.stopPropagation()
    navigate(`/category/${type}/${id}`)
  }

  const showItem = (e, item) => {
    e.stopPropagation()
    setModalState(true)
    setModalItem(item)
    //todo, теперь это будет вызыватся из стора
    // setCartItemDataIsChanged(true)

    // open modal window animation
    const target = e.target
    const targetCoords = target.getBoundingClientRect()
    const modalWindow = document.querySelector('.product-modal__wrapper')
    const prodItem_height = document.querySelector('.popular-item__img').clientHeight
    
    modalWindow.style.top = `${targetCoords.top - 130}px`
    modalWindow.style.left = `${targetCoords.left - 90}px`
    modalWindow.style.height = `${prodItem_height}px`
    modalWindow.style.width = `${prodItem_height}px`
  }

  return (
    <div key={id} className="popular-item">
      <div onClick={openItemPage} className="popular-item__img">
        <img src={preview} alt={title} />
        <div className="popular-item__img-popap">
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

      <div className="popular-item__content">
        <div className="popular-item__title">
          <Link to={`/category/${item.type}/${item._id}`}>{name}</Link>
          <button
            onClick={(e) => toggleBookmark(e, item._id, authedUser, updateUser, updLocalUserBookmarks)}
            className={'w-[24px] h-[24px] z-10' + (isBookmarked ? ' active' : '')}
          >
            <Icon id='heart'/>
          </button>
        </div>
        <p className="popular-item__price">${price}.00</p>
      </div>
    </div>
  )
}

export default ProductItem
