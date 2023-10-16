import React from 'react'
import { useParams } from 'react-router-dom'

const AuthLayout = () => {
  const { params } = useParams()
  console.log('params :>> ', params)
  return null
}
 
export default AuthLayout
