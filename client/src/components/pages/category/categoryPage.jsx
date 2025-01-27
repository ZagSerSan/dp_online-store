import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { CategoryNav, ProductsList } from '../../ui'

const CategoryPage = () => {
  const { type } = useParams()

  // const typeIsValid = (type === 'car' || type === 'woman' || type === 'man')
  // if (!typeIsValid) return <Navigate to='/category'/>
  
  if (!type) return <Navigate to='/category'/>
  
  return (
    <div>
      <CategoryNav />
      <ProductsList role='category'/>
    </div>
  )
}

export default CategoryPage
