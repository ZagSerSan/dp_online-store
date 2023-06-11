import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './categoryNav.css'
// img
import IMG_DOG from '../assets/img/category-nav/dog.jpg' 
import IMG_CAT from '../assets/img/category-nav/cat.jpg' 
import IMG_FISH from '../assets/img/category-nav/fish.jpg' 

const CategoryNav = () => {
  return (
    <div className='category-nav container'>
      <Link to='/category/fordog' className="category-nav-item">
        <img src={IMG_DOG} alt="for dog" />
        <h3>Dogs Food</h3>
      </Link>
      <Link to='/category/forcat' className="category-nav-item">
        <img src={IMG_CAT} alt="for cat" />
        <h3>Cats Food</h3>
      </Link>
      <Link to='/category/forfish' className="category-nav-item">
        <img src={IMG_FISH} alt="for fish" />
        <h3>Fishs Food</h3>
      </Link>
    </div>
  )
}

export default CategoryNav
