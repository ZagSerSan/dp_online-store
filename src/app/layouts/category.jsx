import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import CategoryNav from '../components/categoryNav'

const Category = () => {
  const { type } = useParams()

  return (
    <div className="container">
      <CategoryNav type={type}/>
      {!type && <h1>товары из разных категорий</h1>}
    </div>
  )
}
 
export default Category
