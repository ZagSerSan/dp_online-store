import React from 'react'
import '../../ui/css/popularProducts.css'
import { CategoryNav, ProductsList } from '../../ui'

const CategoryPage = () => {
  return (
    <div className="container">
      <CategoryNav />
      <ProductsList />
    </div>
  )
}

export default CategoryPage
