import React from 'react'
import { Link, useParams } from 'react-router-dom'
import productStore from '../../store/productStore'
import './css/categoryNav.css'
// массив для рендера категорий
import { productCategories } from '../../data/categories/productCategories'
// utils
import { checkStock } from '../../utils/checkStock'

const CategoryNav = () => {
  const { type } = useParams()
  const { productsEntity } = productStore()

  // если выбрана категория, скроллить вверх
  if (type) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className='category-nav-hw'>
      <div className="my-container">
        <div className={'category-nav' + (type ? ' type-selected' : '')}>
          {/* рендер категорий */}
          {productCategories.map(item => (
            // проверка наличия продуктов этого типа (не ренднерить при отсутствии)
            checkStock(productsEntity, item.type) && (
              <div key={item.id} className={'category-nav-item' + (type === item.type ? ' active' : '')}>
                <Link
                  to={item.to}
                >
                  <img src={item.img} alt={item.alt} />
                  <h3 >{item.label}</h3>
                </Link>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryNav
