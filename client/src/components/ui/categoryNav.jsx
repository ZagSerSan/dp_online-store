import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './css/categoryNav.css'

const CategoryNav = () => {
  const { type } = useParams()
  // изображения категорий
  const IMG_MAN = 'http://3.91.27.138/images/category-nav/manCateg.png'
  const IMG_WOMAN = 'http://3.91.27.138/images/category-nav/womanCateg.png'
  const IMG_CAR = 'http://3.91.27.138/images/category-nav/carCateg.png'
  // массив для рендера
  const categories = [
    {
      id: '1',
      to: '/category/man',
      type: 'man',
      img: IMG_MAN,
      alt: 'For man',
      label: 'Man\'s',
      styleClass: ' man-color'
    },
    {
      id: '2',
      to: '/category/woman',
      type: 'woman',
      img: IMG_WOMAN,
      alt: 'For woman',
      label: 'Woman\'s',
      styleClass: ' woman-color'
    },
    {
      id: '3',
      to: '/category/car',
      type: 'car', img: IMG_CAR,
      alt: 'For car',
      label: 'Car\'s',
      styleClass: ' car-color'
    }
  ]
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
          {categories.map(item => (
            <Link
              key={item.id}
              to={item.to}
              className={'category-nav-item' + item.styleClass + (type === item.type ? ' active' : '')}
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
