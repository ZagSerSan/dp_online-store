import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import userStore from '../../../store/userStore'
import SettingItemContent from './settingItemContent'
import Icon from '../../common/icon'

const Profile = () => {
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'account', title: 'Edit your account information'},
    {number: 2, contentType: 'password', title: 'Change your password'},
    {number: 3, contentType: 'address', title: 'Modify your address book entries'}
  ]
  const { usersEntity, usersLoaded, loadUsersList, authorizated } = userStore()
  const { userId } = useParams()

  const editedUser = usersEntity
    ? usersEntity.find(user => user._id === userId)
    : null

  useEffect(() => {
    if (!usersLoaded) {
      loadUsersList()
    }
  }, [usersEntity, usersLoaded, authorizated])

  const toggleSettingItem = (settingItemId) => {
    setSettingItemState(settingItemId)
  }

  if (!authorizated) {
    return <Navigate to='/home'/>
  }

  return (
    <div className="my-container">
      {editedUser
        ? (<div className='accordion-page'>
            {settingItems.map(settingItem => (
              <div key={settingItem.number} className={"accordion-page-item" + (settingItemState === settingItem.number ? ' active' : '')}>
                <div className="accordion-page-item-clicker" onClick={() => toggleSettingItem(settingItem.number)}>
                  <div className='accordion-page-item-clicker__number'>{settingItem.number}</div>
                  <div className='accordion-page-item-clicker__title'>{settingItem.title}</div>
                </div>
                <div className="accordion-page-item-content">
                  <SettingItemContent
                    contentType={settingItem.contentType}
                    user={editedUser}
                  />
                </div>
              </div>
            ))}
          </div>)
        : <Icon id='loader'/>
      }
    </div>
  )
}

export default Profile
