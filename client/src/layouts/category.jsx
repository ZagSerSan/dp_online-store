import React from 'react'
import { useParams } from 'react-router-dom'
// components
import CategoryPage from '../components/pages/category'
import { CategoryNav, ProductsList } from '../components/ui'

// Higher-Order Component (func)
const withCategory = (CategoryNav, ProductsList) => {
  return () => {
    const { type } = useParams()
    
    return (
      <div className="category" style={type && {backgroundColor: '#f6f6f6'}}>
        {/* условный рендер не/выбраной категории */}
        <CategoryNav/>
        {type ? <CategoryPage/> : <ProductsList/>}
      </div>
    )
  }
}
 
export default withCategory(CategoryNav, ProductsList)
