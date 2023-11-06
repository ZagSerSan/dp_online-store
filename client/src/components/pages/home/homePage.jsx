import React from 'react'
import { Intro, CategoryNav, ProductsList } from '../../ui'
import BestProduct from '../../ui/bestProduct'

const HomePage = () => {
  // skroll top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })

  return (
    <>
      <Intro/>
      <CategoryNav />
      <ProductsList role='homePage'/>
      <BestProduct/>
    </>
  )
}
 
export default HomePage
