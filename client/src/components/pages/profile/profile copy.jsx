import React from 'react'
import { NavLink } from 'react-router-dom'
import Icon from '../../common/icon'
import './profile.css'
import userStore from '../../../store/userStore'

const Profile = () => {
  const { authedUser, logOut} = userStore()

  return (
    <div className="my-container flex flex-col items-center">
      {authedUser
        ? (<>
          <h1 className='text-[50px] font-normal mb-[40px]'>Profile</h1>
          <div className="wrapper flex flex-row h-[190px]">
            <img 
              src={authedUser.image}
              className='rounded-[10px] w-[150px]' 
              alt=""
            />
            <div className='ml-[20px] flex flex-col justify-between'>
              <div>
                <p className='text-[#7e4c4f] text-[20px] mb-[10px]'>
                  Name:
                  <span className='text-[#f6ab44]'> {authedUser.name}</span>
                </p>
                <p className='text-[#7e4c4f] text-[20px]'>
                  Email:
                  <span className='text-[#f6ab44]'> {authedUser.email}</span>
                </p>
              </div>
              <div className='mt-[15px]'>
                <NavLink to='/auth/login' onClick={logOut} className='text-[red] text-[20px] mt-[20px]'>LogOut</NavLink>
              </div>
            </div>
            
          </div>
        </>)
        : <Icon id='loader'/>
      }
      
    </div>
  )
}

export default Profile