import React from 'react'
import { Link, useParams } from 'react-router-dom'
// import categoriesApi from '../../api/fake.api/categories.api'
import './css/categoryNav.css'
// images
import IMG_MAN from '../../assets/img/category-nav/manCateg.png' 
import IMG_WOMAN from '../../assets/img/category-nav/womanCateg.png' 
import IMG_CAR from '../../assets/img/category-nav/carCateg.png'

const CategoryNav = () => {
  const { type } = useParams()
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
 
  return (
    <div className="category-nav_HW my-container">
      <div className={'category-nav' + (type ? ' small' : '')}>
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
  )
}

export default CategoryNav
