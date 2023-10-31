import React from 'react'
import './css/favouritesPage.css'
import userStore from '../../../store/userStore'
import MyProductsList from '../../common/table/myProductsList'
import { Link, Navigate } from 'react-router-dom'
import { ProductsList } from '../../ui'

const FavouritesPage = () => {
  const { authedUser } = userStore()

  return (
    <div className="my-container">
      <div className="favourites-page">
        <h3 className='favourites-page__title'>YOUR favourites ITEMS</h3>
        {authedUser && authedUser.bookmarks.length > 0
          ? <ProductsList role='favourites' bookmarks={authedUser.bookmarks}/>
          : <div className='cart-empty'>
              <p>There's nothing here...</p>
              <Link to='/category'>View products</Link>
            </div>
        }
      </div>
    </div>
  )
}

export default FavouritesPage
