import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
// css, api
import './css/popularProducts.css'
import useStore from '../../store/createStore'
// components
import ProductItem from '../common/product/productItem'
import ProductModal from '../common/product/productModal'

const ProductsList = ({role = ''}) => {
  const { type } = useParams()
  // store entities
  const { productsEntity } = useStore()

  // product modal state and body scroll
  const [modalState, setModalState] = useState(false)
  modalState ? document.body.classList.add('modal-is-open') : document.body.classList.remove('modal-is-open')
  const [modalItem, setModalItem] = useState()

  const handleItem = (e, item) => {
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

  let filteredProductsByType = type
    ? productsEntity.filter(item => item.type === type)
    : productsEntity

  let sortedProducts = _.orderBy(filteredProductsByType, ['name'], ['asc'])

  if (role === 'homePage') {
    sortedProducts = _.orderBy(sortedProducts, ['rate'], ['desc'])
    sortedProducts.splice(8, sortedProducts.length)
  }

  return (
    <div className={'popular' + (type ? ' litle-padding' : '')}>
      <ProductModal item={modalItem} modalState={modalState} onToggleState={setModalState}/>
      <div className="my-container">
        {!type &&
          <>
            <h3 className="popular__toptitle">Most Populer</h3>
            <h2 className="popular__bottomtitle">Recent Products</h2>
          </>
        }
        <div className="popular-content">
          {sortedProducts.map(item => (
            <ProductItem
              key={item._id}
              item={item}
              onClick={(e)=>handleItem(e, item)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsList
