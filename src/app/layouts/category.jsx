import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import CategoryNav from '../components/categoryNav'
import PopularProducts from '../components/popularProducts'

const Category = () => {
  const { type } = useParams()

  return (
    <div className="">
      <CategoryNav type={type}/>
      {!type && <PopularProducts />}
    </div>
  )
}
 
export default Category
