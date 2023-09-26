import React from 'react'
import { useParams } from 'react-router-dom'

const ItemPage = () => {
  const { itemId } = useParams()

  return (
    <div className="my-container text-center pt-[80px]">
      <div className="my-container text-[40px]">Item Page: {itemId}</div>
    </div>
  )
}

export default ItemPage
