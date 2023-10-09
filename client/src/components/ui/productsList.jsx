import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
// css, api
import './css/productsList.css'
import useStore from '../../store/createStore'
// components
import ProductItem from '../common/product/productItem'
import ProductModal from '../common/product/productModal'
import Icon from '../common/icon'
import userService from '../../service/user.service'
import { cartAnimation } from '../../utils/cartAnimation'

const ProductsList = ({role = ''}) => {
  const { type } = useParams()
  // store entities
  const {productsEntity, authedUser, updAuthedUser, updLocalUserBookmarks,
    updLocalUserCart, cartItemData, setCartItemData, cartWasChanged, setCartItemDataIsChanged
  } = useStore()
  
  // product modal state and body scroll
  const [modalState, setModalState] = useState(false)
  modalState ? document.body.classList.add('modal-is-open') : document.body.classList.remove('modal-is-open')
  const [modalItem, setModalItem] = useState()

  let filteredProductsByType = type
    ? productsEntity.filter(item => item.type === type)
    : productsEntity

  let sortedProducts = _.orderBy(filteredProductsByType, ['name'], ['asc'])

  if (role === 'homePage') {
    sortedProducts = _.orderBy(sortedProducts, ['rate'], ['desc'])
    sortedProducts.splice(8, sortedProducts.length)
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

  const addToCart = async (e, id, isInCart, item) => {
    e.stopPropagation()
    cartAnimation(e.target, isInCart)

    // create new cart item for send to server
    let newCartItemData = {
      ...cartItemData,
      _id: id,
      name: item.name,
      type: item.type,
      price: `$${item.price}`,
      totalPrice: `$${item.price * cartItemData.count}`,
      image: item.preview
    }

    // if default options is was not changed
    if (!cartWasChanged) {
      const test = item.modalOptionTypes
      test.forEach(optionItem => {
        const { options } = optionItem
        for (let i = 0; i < options.length; i++) {
          const filtered = options.filter(item => item.selected === true)
          // console.log('filtered :>> ', filtered[0].value)
          newCartItemData = {
            ...newCartItemData,
            [optionItem.type]: filtered[0].value
          }
        }
      })
    }

    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          cart: authedUser.cart.find(item => item._id === id)
            ? authedUser.cart.filter(item => item._id !== id)
            : [...authedUser.cart, newCartItemData]
        }
        const { content } = await userService.updateUser(newUserData)
        updAuthedUser(content)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserCart(newCartItemData)
    }
  }

  // const changeCount = (type) => {
  //   setCartItemDataIsChanged(true)
  //   switch (type) {
  //     case 'decrement':
  //       if (cartData.count > 1) {
  //         setCartData(prev => (
  //           {...prev, count: prev.count - 1 }
  //         ))
  //       }
  //     break
  //     case 'increment':
  //       if (cartData.count < 10) {
  //         setCartData(prev => (
  //           {...prev, count: prev.count + 1 }
  //         ))
  //       }
  //     break
  //     default:
  //       break
  //   }
  // }

  // const changeCount = (type) => {
  //   setCartItemDataIsChanged(true)
  //     switch (type) {
  //       case 'decrement':
  //         setCartItemData('decrement')
  //       break
  //       case 'increment':
  //         setCartItemData('increment')
  //       break
  //       default:
  //         break
  //     }
  //   }

  return (
    <div className={'products-list' + (type ? ' litle-padding' : '')}>
      <div className='cart-helper'>
        <Icon id='cart'/>
      </div>
      <ProductModal
        item={modalItem}
        modalState={modalState}
        onToggleState={setModalState}
        toggleBookmark={toggleBookmark}
        addToCart={addToCart}
        // changeCount={changeCount}
        cartItemData={cartItemData}
        setCartItemData={setCartItemData}
        // initialCartData={initialCartData}
        setCartItemDataIsChanged={setCartItemDataIsChanged}
      />
      <div className="my-container">
        {!type &&
          <>
            <h3 className="products-list__toptitle">Most Populer</h3>
            <h2 className="products-list__bottomtitle">Recent Products</h2>
          </>
        }
        <div className="products-list-content">
          {sortedProducts.map(item => (
            <ProductItem
              key={item._id}
              item={item}
              setModalState={setModalState}
              setModalItem={setModalItem}
              toggleBookmark={toggleBookmark}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsList
