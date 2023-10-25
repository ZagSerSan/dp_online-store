import React from 'react'
import { Intro, CategoryNav, ProductsList } from '../../ui'
import BestProduct from '../../ui/bestProduct'

const HomePage = () => {
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
