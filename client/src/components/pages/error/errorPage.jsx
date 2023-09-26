import React from 'react'
import './errorPage.css'

const ErrorPage = () => {
  return (
    <div className="my-container flex flex-col items-center pt-[50px]">
      <h1 className='text-[50px] mb-[30px]'>Ooops...</h1>
      <h3 className='text-[24px]'>It is server error.. Try again later.</h3>
    </div>
  )
}

export default ErrorPage
