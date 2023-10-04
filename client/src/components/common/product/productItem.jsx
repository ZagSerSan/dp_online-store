import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../icon'
import useStore from '../../../store/createStore'
import userService from '../../../service/user.service'
import { cartAnimation } from '../../../utils/cartAnimation'

const ProductItem = ({ item, setModalState, setModalItem }) => {
  const { _id, name, preview, title, price, type } = item
  const navigate = useNavigate()
  const { authedUser, updAuthedUser, localUser, updLocalUserBookmarks, updLocalUserCart } = useStore()
  const [cartHover, setCartHover] = useState(false)

  const isBookmarked = authedUser
    ? authedUser.bookmarks.includes(_id)
    : (localUser ? localUser.bookmarks?.includes(_id) : false)
  const isInCart = authedUser
    ? authedUser.cart.includes(_id)
    : (localUser ? localUser.cart?.includes(_id) : false)

  const openItemPage = (e) => {
    e.stopPropagation()
    navigate(`/category/${type}/${_id}`)
  }

  const addToCart = async (e, id) => {
    e.stopPropagation()
    cartAnimation(e.target, isInCart)
    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          cart: authedUser.cart.includes(id)
            ? authedUser.cart.filter(item => item !== id)
            : [...authedUser.cart, id]
        }
        const { content } = await userService.updateUser(newUserData)
        updAuthedUser(content)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserCart(id)
    }
  }
  const showItem = (e, item) => {
    e.stopPropagation()
    setModalState(true)
    setModalItem(item)

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

  const toggleBookmark = async (e, id) => {
    e.stopPropagation()
    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          bookmarks: authedUser.bookmarks.includes(id)
            ? authedUser.bookmarks.filter(item => item !== id)
            : [...authedUser.bookmarks, id]
        }
        const { content } = await userService.updateUser(newUserData)
        updAuthedUser(content)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserBookmarks(id)
    }
  }

  return (
    <div key={_id} className="popular-item">
      <div onClick={openItemPage} className="popular-item__img">
        <img src={preview} alt={title} />
        <div className="popular-item__img-popap">
          <button onClick={(e) => showItem(e, item)}>
            <Icon id='view' data-modal='1'/>
          </button>
          <button
            onClick={(e) => addToCart(e, item._id)}
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
          <button onClick={(e) => toggleBookmark(e, item._id)} className='w-[24px] h-[24px] z-10'>
            <Icon id='heart' fill={isBookmarked && '#000'}/>
          </button>
        </div>
        <p className="popular-item__price">${price}.00</p>
      </div>
    </div>
  )
}

export default ProductItem
