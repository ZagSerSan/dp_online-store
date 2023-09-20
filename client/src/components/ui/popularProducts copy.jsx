import React, { useState } from 'react'
// css, api
import './css/popularProducts.css'
import useStore from '../../store/createStore'
// components
import ProductItem from '../common/product/productItem'
import ProductModal from '../common/product/productModal'

const PopularProducts = () => {
  // store entities
  const { productsEntity } = useStore()
  // product modal state and body scroll
  const [modalState, setModalState] = useState(false)
  modalState ? document.body.classList.add('modal-is-open') : document.body.classList.remove('modal-is-open')
  const [modalItem, setModalItem] = useState()
  const handleItem = (item) => {
    setModalState(true)
    setModalItem(item)
  }

  return (
    <div className="popular">
      <ProductModal item={modalItem} modalState={modalState} onToggleState={setModalState}/>
      {/* {modalState && <ProductModal modalState={modalState} onToggleState={setModalState}/>} */}
      <div className="container">
        <h3 className="popular__toptitle">Most Populer</h3>
        <h2 className="popular__bottomtitle">Recent Products</h2>
        <div className="popular-content">
          {productsEntity.map(item => (
            <ProductItem
              key={item._id}
              item={item}
              onClick={()=>handleItem(item)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularProducts