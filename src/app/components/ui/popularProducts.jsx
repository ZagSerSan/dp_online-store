import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
// css, components
import './css/popularProducts.css'
import Icon from '../common/icon'
// img
import IMG_ITEM_MEN from '../../assets/img/popular/men_item.png'
import IMG_ITEM_WOMEN from '../../assets/img/popular/women_item.png'
import IMG_ITEM_CAR from '../../assets/img/popular/car_item.png'

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

  return (
    <div className="popular">
      <div className="container">
        <h3 className="popular__toptitle">Most Populer</h3>
        <h2 className="popular__bottomtitle">Recent Products</h2>
        <div className="popular-content">
          {items.map(item => (
            <div key={item.id} className="popular-item">
              <div className="popular-item__img">
                <Link to='/category/fordog/id'>
                  <img src={item.src} alt={item.name} />
                </Link>
                <div className="popular-item__img-popap">
                  <Link to=''>
                    <Icon id='view'/>
                  </Link>
                  <Link to=''>
                    <Icon id='cart'/>
                  </Link>
                </div>
              </div>

              <div className="popular-item__content">
                <h4 className="popular-item__title">
                  <Link to='/category/fordog/id'>{item.name}</Link>
                </h4>
                <p className="popular-item__price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularProducts