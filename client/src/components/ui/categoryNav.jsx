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
    <div className='category-nav_HW'>
      <div className="my-container">
        <div className={'category-nav' + (type ? ' type-selected' : '')}>
          {/* категории */}
          {productCategories.map(item => (
            <Link
              key={item.id}
              to={item.to}
              className={'category-nav-item' + (type === item.type ? ' active' : '')}
              // className={'category-nav-item' + item.styleClass + (type === item.type ? ' active' : '')}
            >
              <img src={item.img} alt={item.alt} />
              <h3>{item.label}</h3>
            </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryNav
