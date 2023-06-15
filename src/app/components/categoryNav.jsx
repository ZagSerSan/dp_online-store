import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import categoriesApi from '../api/fake.api/categories.api'
import './categoryNav.css'

const CategoryNav = ({ type }) => {
  // Загрузка файлов с fake.api
  const [test, setTest] = useState()
  useEffect(() => {
    if (localStorage.getItem("categories")) {
      setTest(JSON.parse(localStorage.getItem("categories")))
    } else {
      categoriesApi.fetchCategories().then(data => {
        setTest(data)
        localStorage.setItem("categories", JSON.stringify(data))
      })
    }
  }, [])
 
  return (
    <div className="container">
      <div className={'category-nav' + (type ? ' small' : '')}>
        {test && (test.map(item => (
          <Link
            key={item.id}
            to={item.to}
            className={'category-nav-item' + item.styleClass + (type === item.type ? ' active' : '')}
            style={test && {backgroundColor: '#fff'}}
          >
            {test && <img src={item.img} alt={item.alt} />}
            <h3>{item.label}</h3>
          </Link>
          )))}
      </div>
    </div>
  )
}

export default CategoryNav
