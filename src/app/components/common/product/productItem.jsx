import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Icon from '../icon'

const ProductItem = ({ item, onClick }) => {
  const { id, src, name, price } = item
  return (
    <div key={id} className="popular-item">
      <div className="popular-item__img">
        <Link to='/category/fordog/id'>
          <img src={src} alt={name} />
        </Link>
        <div className="popular-item__img-popap">
          <button onClick={onClick}>
            <Icon id='view'/>
          </button>
          <button>
            <Icon id='cart'/>
          </button>
        </div>
      </div>

      <div className="popular-item__content">
        <h4 className="popular-item__title">
          <Link to='/category/fordog/id'>{name}</Link>
        </h4>
        <p className="popular-item__price">{price}</p>
      </div>
    </div>
  )
}

export default ProductItem
