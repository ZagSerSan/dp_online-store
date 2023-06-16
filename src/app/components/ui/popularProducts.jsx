import React, { useState } from 'react'
// css
import './css/popularProducts.css'
// img
import IMG_ITEM_MEN from '../../assets/img/popular/men_item.png'
import IMG_ITEM_WOMEN from '../../assets/img/popular/women_item.png'
import IMG_ITEM_CAR from '../../assets/img/popular/car_item.png'
// components
import ProductItem from '../common/product/productItem'
import ProductModal from '../common/product/productModal'

const PopularProducts = () => {
  const items = [
    {id: '1', name: 'Men item', src: IMG_ITEM_MEN, price: '$24.50'},
    {id: '2', name: 'Momen item', src: IMG_ITEM_WOMEN, price: '$24.50'},
    {id: '3', name: 'Car item', src: IMG_ITEM_CAR, price: '$24.50'},
    {id: '4', name: 'Men item', src: IMG_ITEM_MEN, price: '$24.50'},
    {id: '5', name: 'Momen item', src: IMG_ITEM_WOMEN, price: '$24.50'},
    {id: '6', name: 'Car item', src: IMG_ITEM_CAR, price: '$24.50'},
    {id: '7', name: 'Momen item', src: IMG_ITEM_WOMEN, price: '$24.50'},
    {id: '8', name: 'Men item', src: IMG_ITEM_MEN, price: '$24.50'},
  ]
  // product modal state and body scroll
  const [modalState, setModalState] = useState(false)
  // 'no-scroll' for body tag
  modalState ? document.body.classList.add('modal-is-open') : document.body.classList.remove('modal-is-open')

  return (
    <div className="popular">
      <ProductModal modalState={modalState} onToggleState={setModalState}/>
      {/* {modalState && <ProductModal modalState={modalState} onToggleState={setModalState}/>} */}
      <div className="container">
        <h3 className="popular__toptitle">Most Populer</h3>
        <h2 className="popular__bottomtitle">Recent Products</h2>
        <div className="popular-content">
          {items.map(item => (
            <ProductItem
              key={item.id}
              item={item}
              onClick={()=> setModalState(true)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularProducts