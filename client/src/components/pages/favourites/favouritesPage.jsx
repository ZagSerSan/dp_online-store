import React from 'react'
import useStore from '../../../store/createStore'

const FavouritesPage = () => {
  const { authedUser } = useStore()
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
