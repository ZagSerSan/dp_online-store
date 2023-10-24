import React, { useState, useEffect } from 'react'
import Icon from '../../../common/icon'
import './editProduct.css'
import { Navigate, useParams } from 'react-router-dom'
import useStore from '../../../../store/createStore'
import SettingProductContent from './settingProductContent'

const EditProduct = () => {
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'info', title: 'Edit your account information'},
    {number: 2, contentType: 'images', title: 'Change your password'},
    {number: 3, contentType: 'comments', title: 'Delete users comments'}
  ]
  const { productsEntity } = useStore()
  const { productId } = useParams()

  const editedProduct = productsEntity
    ? productsEntity.find(product => product._id === productId)
    : null

  const toggleSettingItem = (settingItemId) => {
    setSettingItemState(settingItemId)
  }

  // useEffect(() => {
  //   if (!usersLoaded) {
  //     loadUsersList()
  //   }
  // }, [usersEntity, usersLoaded])

  // if (!authorizated) {
  //   return <Navigate to='/home'/>
  // }

  return (
    <div className="my-container">
      {editedProduct
        ? (<div className='user-page'>
            {settingItems.map(settingItem => (
              <div key={settingItem.number} className={"setting-item" + (settingItemState === settingItem.number ? ' active' : '')}>
                <div className="setting-item-clicker" onClick={() => toggleSettingItem(settingItem.number)}>
                  <div className='setting-item-clicker__number'>{settingItem.number}</div>
                  <div className='setting-item-clicker__title'>{settingItem.title}</div>
                </div>
                <div className="setting-item-content">
                  <SettingProductContent
                    contentType={settingItem.contentType}
                    editedProduct={editedProduct}
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

export default EditProduct
