import React from 'react'
import useStore from '../../../store/createStore'
import Icon from '../../common/icon'
import './profile.css'

const Profile = () => {
  const { authedUser } = useStore()

  return (
    <div className="container wrapper">
      {authedUser
        ? (<>
          <h1>Profile</h1>

          <div className="">
            <img src={authedUser.image} alt="" />
            <h2>Your name: {authedUser.name}</h2>
          </div>
        </>)
        : <Icon id='loader'/>
      }
      
    </div>
  )
}

export default Profile