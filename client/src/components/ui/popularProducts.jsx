import React, { useEffect, useState } from 'react'
// css, api
import './css/popularProducts.css'
import productService from '../../service/product.service'
// import API from '../../api'
// img
// import IMG_ITEM_MEN from '../../assets/img/popular/men_item.png'
// import IMG_ITEM_WOMEN from '../../assets/img/popular/women_item.png'
// import IMG_ITEM_CAR from '../../assets/img/popular/car_item.png'
// components
import ProductItem from '../common/product/productItem'
import ProductModal from '../common/product/productModal'

const PopularProducts = () => {
  const [data, setData] = useState()
  // const [test, setTest] = useState()

  useEffect(() => {
    productService.get().then(data => setData(data))

    // if (localStorage.getItem("popularProducts")) {
    //   setData(JSON.parse(localStorage.getItem("popularProducts")))
    // } else {
    //   API.products.getPopularProducts().then(data => {
    //     setData(data)
    //     localStorage.setItem("popularProducts", JSON.stringify(data))
    //   })
    // }
  }, [])

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
          {data && data.map(item => (
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