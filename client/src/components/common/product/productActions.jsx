import React from 'react'
import PropTypes from 'prop-types'
import './css/productActions.css'
import userStore from '../../../store/userStore'
import cartStore from '../../../store/cartStore'
import Icon from '../icon'

const ProductActions = ({ item }) => {
  const { authedUser, updateUser, localUser, updLocalUserCart, updLocalUserBookmarks } = userStore()
  const { cartItemData, setCartItemData, addToCart, toggleBookmark } = cartStore()
            
  let isBookmarked
  let isInCart
  if (item) {
    isBookmarked = authedUser
      ? authedUser.bookmarks.includes(item._id)
      : (localUser ? localUser.bookmarks?.includes(item._id) : false)
    isInCart = authedUser
      ? authedUser.cart.find(cartItem => cartItem._id === item._id)
      : (localUser ? localUser.cart.find(cartItem => cartItem._id === item._id) : false)
  }

  return (
    <div className="product-actions">
      <div className="product-actions-counter">
        <button onClick={() => setCartItemData('decrement')}>-</button>
        <p>{cartItemData.count}</p>
        <button onClick={() => setCartItemData('increment')}>+</button>
      </div>
      <button
        className={"product-actions-cartadd" + (isInCart ? ' added' : '')}
        onClick={(e) => addToCart(e, authedUser, localUser, updateUser, updLocalUserCart, item, isInCart )}
      >
        ADD TO CART
      </button>
      <button
        className={"product-actions-bookmark" + (isBookmarked ? ' active' : '')}
        onClick={(e) => toggleBookmark(e, item._id, authedUser, updateUser, updLocalUserBookmarks)}
      >
        <Icon id='heart'/>
      </button>
    </div>
  )
}

ProductActions.propTypes = {
  item: PropTypes.object
}

export default ProductActions
