import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './css/categoryNav.css'
// массив для рендера категорий
import { productCategories } from '../../data/categories/productCategories'

const CategoryNav = () => {
  const { type } = useParams()

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
            item.active && (
              <div className={'category-nav-item' + (type === item.type ? ' active' : '')}>
                <Link
                  key={item.id}
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
