import React, { useState } from 'react'
import './adminPage.css'
import UserTabPage from './userTabPage'
import ProductsTabPage from './productsTabPage'
// import EditFormList from '../profile/editFormList'

const AdminPage = () => {
  // users, products
  const tabs = ['users', 'products']
  const [tabState, setTabState] = useState('users')

  const toggleTabs = (tab) => {
    setTabState(tab)
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
          // : <ProductsTabPage />
          : <p>Products Tab Page</p>
        }
      </div>
    </div>
    </div>

  )
}

export default AdminPage
