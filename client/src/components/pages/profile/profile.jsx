import React from 'react'
import useStore from '../../../store/createStore'

const Profile = () => {
  const { authedUser } = useStore()

  return (
    <div className="container">
      <h1>Profile</h1>
      <h2>{authedUser.name}</h2>
    </div>
  )
}

export default Profile