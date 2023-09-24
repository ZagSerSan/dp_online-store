import React from 'react'
import { useParams } from 'react-router-dom'
import './css/category.css'
// cmpts
import CategoryPage from '../components/pages/category'
import { CategoryNav, ProductsList } from '../components/ui'

// Higher-Order Component
const withCategory = (CategoryNav, ProductsList) => {
  return () => {
    const { type } = useParams()

    return (
      <div className="category" style={type && {backgroundColor: '#f6f6f6'}}>
        <CategoryNav/>
        {type ? <CategoryPage/> : <ProductsList/>}
      </div>
    )
  }
}
 
export default withCategory(CategoryNav, ProductsList)
