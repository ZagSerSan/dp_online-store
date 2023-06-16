import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './css/category.css'
// cmpts
import CategoryPage from '../components/pages/categoryPage'
import { CategoryNav, PopularProducts } from '../components/ui'

// Higher-Order Component
const withCategory = (CompCategoryNav, CompPopularProducts) => {
  return () => {
    const { type } = useParams()

    return (
      <div className="category" style={type && {backgroundColor: '#f6f6f6'}}>
        <CompCategoryNav type={type}/>
        {type ? <CategoryPage type={type}/> : <CompPopularProducts />}
      </div>
    )
  }
}
 
export default withCategory(CategoryNav, PopularProducts)

// const Category = () => {
//   const { type } = useParams()

//   return (
//     <div className="">
//       <CategoryNav type={type}/>
//       {!type && <PopularProducts />}
//     </div>
//   )
// }
 
// export default Category
