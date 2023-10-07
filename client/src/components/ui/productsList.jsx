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

const ProductsList = ({role = ''}) => {
  const { type } = useParams()
  // store entities
  const { productsEntity, authedUser, updAuthedUser, updBookmarks, updLocalUserCart} = useStore()

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
      updBookmarks(id)
    }
  }

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
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsList
