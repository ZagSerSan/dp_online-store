import React from 'react'
import Intro from '../components/intro'
import CategoryNav from '../components/categoryNav'
import PopularProducts from '../components/popularProducts'

const Home = () => {
  return (
    <>
      <Intro/>
      <CategoryNav />
      <PopularProducts/>
    </>
  )
}
 
export default Home
