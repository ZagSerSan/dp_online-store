import React from 'react'
import { useParams } from 'react-router-dom'
import useStore from '../../../store/createStore'

const ItemPage = () => {
  const { itemId } = useParams()
  const currentProduct = useStore((state) => state.productsEntity.find(item => item._id === itemId))
  const { name, preview } = currentProduct
  console.log('currentProduct :>> ', currentProduct)
  
  return (
    <div className="my-container text-center pt-[80px]">
      <img src={preview} alt={name} />
      <div className="my-container text-[40px]">Item name: {name}</div>
    </div>
  )
}

export default ItemPage
