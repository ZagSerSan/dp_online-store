import React, { useState } from 'react'
import Icon from '../../common/icon'
import './profile.css'
import SettingItemContent from './settingItemContent'
import userStore from '../../../store/userStore'
import EditFormList from './editFormList'

const Profile = () => {
  const { authedUser, logOut} = userStore()

  //todo setting items
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'account', title: 'Edit your account information'},
    {number: 2, contentType: 'password', title: 'Change your password'},
    {number: 3, contentType: 'address', title: 'Modify your address book entries'}
  ]

  const toggleSettingItem = (settingItemId) => {
    setSettingItemState(settingItemId)
  }

  return (
    <div className="my-container">
      {authedUser
        ? (
        <>
        <div className='user-page'>
          {settingItems.map(settingItem => (
            <div key={settingItem.number} className={"setting-item" + (settingItemState === settingItem.number ? ' active' : '')}>
              <div className="setting-item-clicker" onClick={() => toggleSettingItem(settingItem.number)}>
                <div className='setting-item-clicker__number'>{settingItem.number}</div>
                <div className='setting-item-clicker__title'>{settingItem.title}</div>
              </div>
              <div className="setting-item-content">
                <SettingItemContent contentType={settingItem.contentType}/>
              </div>
            </div>
          ))}
        </div>
        </>)
        : <Icon id='loader'/>
      }
      
    </div>
  )
}

export default Profile