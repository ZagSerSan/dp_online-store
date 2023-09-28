import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../icon'
import useStore from '../../../store/createStore'
import productService from '../../../service/product.service'

const ProductItem = ({ item, onClick }) => {
  const { _id, name, preview, title, price, type } = item
  const navigate = useNavigate()
  const { setBookmarkForProduct } = useStore()

  const openItemPage = (e) => {
    e.stopPropagation()
    navigate(`/category/${type}/${_id}`)
  }

  const toggleBookmark = async (e, item) => {
    // console.log('e.target :>> ', e.target)
    // console.log('item :>> ', item)
    e.stopPropagation()
    const newItemData = {
      ...item,
      bookmark: item.bookmark === true ? false : true
    }
    try {
      const { content } = await productService.toggleBookmark(newItemData)
      setBookmarkForProduct(content)
    } catch (e) {
      console.log('e :>> ', e)
    }
  }

  return (
    <div key={_id} className="popular-item">
      <div onClick={openItemPage} className="popular-item__img">
        <img src={preview} alt={title} />
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
        <div className="popular-item__title">
          <Link to={`/category/${item.type}/${item._id}`}>{name}</Link>
          <button onClick={(e) => toggleBookmark(e, item)} className='w-[24px] h-[24px] z-10'>
            <Icon id='heart' fill={item.bookmark && '#000'}/>
          </button>
        </div>
        <p className="popular-item__price">${price}.00</p>
      </div>
    </div>
  )
}

export default ProductItem
