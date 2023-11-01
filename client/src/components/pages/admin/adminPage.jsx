import React from 'react'
import './css/adminPage.css'
import UserTabPage from './userTabPage'
import ProductsTabPage from './productsTabPage'
import { Navigate, useNavigate } from 'react-router-dom'
import userStore from '../../../store/userStore'

const AdminPage = ({ tabState }) => {
  const { authedUser } = userStore()
  const navigate = useNavigate()
  // users, products
  const tabs = ['users', 'products']

  const toggleTabs = (tab) => {
    navigate(`/admin/${tab}`)
  }

  return (
    <div className='admin-page'>
      {authedUser && authedUser.admin
        ? <div className="my-container">
        <div className="admin-page-tabs">
          {tabs.map(tab => (
            <button key={tab} className={tab === tabState ? ' active' : ''} onClick={() => toggleTabs(tab)}>{tab}</button>
          ))}
        </div>
        <div className="admin-page-content">
          {tabState === 'users'
            ? <UserTabPage />
            : <ProductsTabPage />
          }
        </div>
          </div>
        : <Navigate to='/home'/>
      }
    </div>

  )
}

export default AdminPage
