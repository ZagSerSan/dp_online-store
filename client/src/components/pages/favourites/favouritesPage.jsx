import React from 'react'
import './css/favouritesPage.css'
import userStore from '../../../store/userStore'
import { Link } from 'react-router-dom'
import { ProductsList } from '../../ui'

const FavouritesPage = () => {
  const { authedUser, localUser } = userStore()
  const bookmarks = authedUser
  ? authedUser.bookmarks
  : localUser
    ? localUser.bookmarks
    : []

  return (
    <div className="my-container">
      <div className="favourites-page">
        <h3 className='favourites-page__title'>YOUR favourites ITEMS</h3>
        {bookmarks.length > 0
          ? <ProductsList role='favourites' bookmarks={bookmarks}/>
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
