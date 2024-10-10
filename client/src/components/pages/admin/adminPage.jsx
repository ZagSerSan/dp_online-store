import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useNavigate } from 'react-router-dom'
import './css/adminPage.css'
import UserTabPage from './userTabPage'
import ProductsTabPage from './productsTabPage'
import userStore from '../../../store/userStore'
import StatisticsTabPage from './statisticsTabPage'

const AdminPage = ({ tabState }) => {
  const navigate = useNavigate()
  const { authedUser } = userStore()
  const tabs = ['users', 'products', 'statistics']

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
            : tabState === 'products'
            ? <ProductsTabPage />
            : <StatisticsTabPage/>
          }
        </div>
          </div>
        : <Navigate to='/home'/>
      }
    </div>
  )
}

AdminPage.propTypes = {
  tabState: PropTypes.string
}

export default AdminPage
