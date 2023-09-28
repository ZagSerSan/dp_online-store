import React from 'react'
import '../../ui/css/popularProducts.css'
import { CategoryNav, ProductsList } from '../../ui'
import { Navigate, useParams } from 'react-router-dom'

const CategoryPage = () => {
  const { type } = useParams()
  const typeIsValid = (type === 'car' || type === 'woman' || type === 'man')

  if (!typeIsValid) return <Navigate to='/category'/>
  
  return (
    <div>
      <CategoryNav />
      <ProductsList />
    </div>
  )
}

export default CategoryPage
