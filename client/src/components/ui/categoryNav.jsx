import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './css/categoryNav.css'

const CategoryNav = () => {
  const { type } = useParams()
  // изображения категорий
  const IMG_MAN = 'http://localhost:8080/images/category-nav/manCateg.png'
  const IMG_WOMAN = 'http://localhost:8080/images/category-nav/womanCateg.png'
  const IMG_CAR = 'http://localhost:8080/images/category-nav/carCateg.png'
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
    // Hight Wrapper. Изменения стилей при выборе категории
    <div className={'category-nav_HW' + (type ? ' litle-padding' : '')}>
      <div className="my-container">
        <div className={'category-nav' + (type ? ' small' : '')}>
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
