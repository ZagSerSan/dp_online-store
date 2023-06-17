import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Icon from '../icon'

const ProductItem = ({ item, onClick }) => {
  const { _id, name, preview, title, price } = item
  return (
    <div key={_id} className="popular-item">
      <div className="popular-item__img">
        <Link to={`/category/${item.type}/_id`}>
          <img src={preview} alt={title} />
        </Link>
        <div className="popular-item__img-popap">
          <button onClick={onClick}>
            <Icon id='view' data-modal='1'/>
          </button>
          <button>
            <Icon id='cart'/>
          </button>
        </div>
      </div>

      <div className="popular-item__content">
        <h4 className="popular-item__title">
        <Link to={`/category/${item.type}/_id`}>{name}</Link>
        </h4>
        <p className="popular-item__price">${price}.00</p>
      </div>
    </div>
  )
}

export default ProductItem
