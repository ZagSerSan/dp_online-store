import React from 'react'
import userStore from '../../../store/userStore'

const FavouritesPage = () => {
  const { authedUser } = userStore()
  return (
    <div className="my-container text-center pt-[80px]">
      <div className="my-container text-[40px]">Favourites Page</div>
      {authedUser && authedUser.bookmarks.map(item => (
        <p key={item}>{item}</p>
      ))}
      <hr/>
    </div>
  )
}

export default FavouritesPage
