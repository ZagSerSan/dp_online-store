import React, { useEffect } from 'react'
import userStore from '../../../store/userStore'
import { Link } from 'react-router-dom'

const UserTabPage = () => {
  const { usersEntity, loadUsersList, removeUser, usersLoaded, setUsersLoaded } = userStore()
  const usersWithoutAdmin = usersEntity
    ? usersEntity.filter(user => user.admin === false)
    : usersEntity
  console.log('usersEntity :>> ', usersEntity)

  useEffect(() => {
    if (!usersLoaded) {
      loadUsersList()
    }
  }, [usersLoaded])

  const deleteUser = (userId) => {
    removeUser(userId)
  }

  return (
    <div className='user-tab-page'>
      {usersWithoutAdmin
        ? <div>
            <Link to='/admin/create-user' className='add-user'>create user</Link>
            <div className="user-list">
              {usersWithoutAdmin.map((user, index) => (
                <div key={index} className='flex'>
                  <p>{index + 1 + ') ' + user.name}</p>
                  <button onClick={() => deleteUser(user._id)} className='text-[red] ml-[20px]'>X</button>
                </div>
              ))}
            </div>
          </div>
        : <p>users not loaded..</p>
      }
    </div>
  )
}

export default UserTabPage
