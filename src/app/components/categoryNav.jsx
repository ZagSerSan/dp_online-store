import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './categoryNav.css'
// img
import IMG_DOG from '../assets/img/category-nav/menCateg.png' 
import IMG_CAT from '../assets/img/category-nav/womenCateg.png' 
import IMG_FISH from '../assets/img/category-nav/carCateg.png' 

const CategoryNav = ({ type }) => {

  return (
    <div className="container">
      <div className={'category-nav' + (type ? ' small' : '')}>
        <Link to='/category/formen' className={'category-nav-item men-color' + (type === 'formen' ? ' active' : '')}>
          <img src={IMG_DOG} alt="for Men" />
          <h3>Men's</h3>
        </Link>
        <Link to='/category/forwomen' className={'category-nav-item women-color' + (type === 'forwomen' ? ' active' : '')}>
          <img src={IMG_CAT} alt="for women" />
          <h3>Women's</h3>
        </Link>
        <Link to='/category/forcar' className={'category-nav-item car-color' + (type === 'forcar' ? ' active' : '')}>
          <img src={IMG_FISH} alt="for car" />
          <h3>Car</h3>
        </Link>
      </div>
      {type && <h1>categoryNav.jsx: {type}</h1>}
    </div>
  )
}

export default CategoryNav
