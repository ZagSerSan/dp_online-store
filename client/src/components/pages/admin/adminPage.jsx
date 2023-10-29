import React from 'react'
import './css/adminPage.css'
import UserTabPage from './userTabPage'
import ProductsTabPage from './productsTabPage'
import { useNavigate } from 'react-router-dom'

const AdminPage = ({ tabState }) => {
  const navigate = useNavigate()
  // users, products
  const tabs = ['users', 'products']

  const toggleTabs = (tab) => {
    navigate(`/admin/${tab}`)
  }

  return (
    <div className='admin-page'>

    <div className="my-container">
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
    </div>

  )
}

export default AdminPage
