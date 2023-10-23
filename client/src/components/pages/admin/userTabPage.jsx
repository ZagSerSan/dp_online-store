import React, { useEffect } from 'react'
import userStore from '../../../store/userStore'
import { Link } from 'react-router-dom'

const UserTabPage = () => {
  const { usersEntity, loadUsersList, removeUser, usersLoaded, setUsersLoaded } = userStore()
  const usersWithoutAdmin = usersEntity
    ? usersEntity.filter(user => user.admin === false)
    : []

  useEffect(() => {
    if (!usersLoaded) {
      loadUsersList()
    }
  }, [usersEntity, usersLoaded])

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
                <div key={index} className='user-list-item'>
                  <div className='user-list-item__info'>
                    <img src={user.image} alt="avatar" />
                    <div>
                      <p>
                        {user.name}
                        <span> - </span>
                        <a className='email' href={`mailto:${user.email}`}>{user.email}</a>
                      </p>
                      <p className='address'>
                        {user.address
                          ? `${user.address.сountry}, ${user.address.city}, ${user.address.street}, ${user.address.houseNumber}`
                          : ''
                        }
                      </p>
                    </div>
                  </div>
                  <div className='user-list-item__buttons'>
                    <Link to={`/profile/${user._id}`}>edit</Link>
                    <button onClick={() => deleteUser(user._id)}>remove</button>
                  </div>
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
