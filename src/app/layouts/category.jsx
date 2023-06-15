import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import CategoryNav from '../components/categoryNav'
import CategoryPage from '../components/pages/category/categoryPage'
import PopularProducts from '../components/popularProducts'

// Higher-Order Component
const withCategory = (CompCategoryNav, CompPopularProducts) => {
  return () => {
    const { type } = useParams()

    return (
      <div className="">
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
