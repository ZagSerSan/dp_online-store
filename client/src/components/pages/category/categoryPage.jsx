import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CategoryNav, ProductsList } from '../../ui'

const CategoryPage = () => {
  const { type } = useParams()

  if (!type) return <Navigate to='/category'/>
  
  return (
    <div>
      <CategoryNav />
      <ProductsList role='category'/>
    </div>
  )
}

export default CategoryPage
