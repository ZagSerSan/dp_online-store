import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import './css/productsList.css'
// store
import productStore from '../../store/productStore'
// components
import ProductItem from '../common/product/productItem'
import ProductModal from '../common/product/productModal'

const ProductsList = ({role = '', bookmarks}) => {
  const { type } = useParams()
  const { productsEntity } = productStore()

  // product modal state and body scroll
  const [modalState, setModalState] = useState(false)
  const [modalItem, setModalItem] = useState()
  // блокировать скролл если окно открыто
  modalState ? document.body.classList.add('modal-is-open') : document.body.classList.remove('modal-is-open')

  // фильтриаци продуктов по категории, если они есть
  let filteredProductsByType = type
    ? productsEntity.filter(item => item.type === type)
    : productsEntity

  // сортировка
  let sortedProducts = _.orderBy(filteredProductsByType, ['name'], ['asc'])

  // показ макс отдельной старинце
  if (role === 'homePage') {
    sortedProducts = _.orderBy(sortedProducts, ['rate'], ['desc'])
    sortedProducts.splice(8, sortedProducts.length)
  } else if (role === 'productItem') {
    sortedProducts = _.orderBy(sortedProducts, ['rate'], ['desc'])
    sortedProducts.splice(4, sortedProducts.length)
  } else if (role === 'favourites') {
    // показывать только избранные
    let bookmarksproducts = []
    bookmarks.map(bookId => {
      let filteredProduct = productsEntity.find(item => item._id === bookId)
      bookmarksproducts.push(filteredProduct)
    })
    sortedProducts = bookmarksproducts
  }

  return (
    <div className={'products-list' + (type || role === 'favourites' ? ' litle-padding' : '')}>
      {/* модальное окно */}
      <ProductModal
        item={modalItem}
        modalState={modalState}
        onToggleState={setModalState}
      />
      <div className="my-container">
        {/* показ заголовок на определ странице */}
        {role !== 'category' && role !== 'favourites' &&
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
            />
          ))}
        </div>
      </div>
    </div>
  )
}

ProductsList.propTypes = {
  bookmarks: PropTypes.array,
  role: PropTypes.string
}

export default ProductsList
