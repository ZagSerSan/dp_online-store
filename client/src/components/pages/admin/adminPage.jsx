import React, { useState } from 'react'
import './adminPage.css'
import UserTabPage from './userTabPage'
import ProductsTabPage from './productsTabPage'
import { useNavigate } from 'react-router-dom'
// import EditFormList from '../profile/editFormList'

const AdminPage = ({ tabState }) => {
  const navigate = useNavigate()
  // users, products
  const tabs = ['users', 'products']
  // const [tabState, setTabState] = useState('users')
  console.log('tabState :>> ', tabState)

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
