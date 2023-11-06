import React, { useEffect, useState } from 'react'
import userStore from '../../../store/userStore'
import { Link } from 'react-router-dom'
import Pagination from '../../common/pagination'

const UserTabPage = () => {
  const { usersEntity, loadUsersList, removeUser, usersLoaded } = userStore()
  const [currentPage, setCurrentPage] = useState(0)
  const countOnPage = 5

  const usersWithoutAdmin = usersEntity
    ? usersEntity.filter(user => user.admin === false)
    : []
  const splicedEntity = usersWithoutAdmin
    ? usersWithoutAdmin.slice(currentPage * countOnPage, (currentPage * countOnPage) + countOnPage)
    : []
  if (splicedEntity.length === 0) {
    setCurrentPage(prev => prev - 1)
  }

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
            <Link to='/admin/users/create-user' className='add-user'>create user</Link>
            <div className="user-list">
              {splicedEntity.map((user, index) => (
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
            <Pagination
              countOnPage={countOnPage}
              itemsCount={usersWithoutAdmin.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        : <p>users not loaded..</p>
      }
    </div>
  )
}

export default UserTabPage
