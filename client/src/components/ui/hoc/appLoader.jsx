import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// store, service
import globalStore from '../../../store/globalStore'
import productStore from '../../../store/productStore'
import userStore from '../../../store/userStore'
import localStorageService from '../../../service/localStorage.service'
// components
import ErrorPage from '../../pages/error'
import Icon from '../../common/icon'

const AppLoader = ({ children }) => {
  const { setGlobalLoading, globalLoading } = globalStore()
  const { loadProductsList } = productStore()
  const { setAuthedUser, setLocalUser, loadUsersList } = userStore()
  const [error, setError] = useState(false)
  
  const loadEntities = async () => {
    try {
      await loadProductsList()
      await loadUsersList()
      if (localStorageService.getAccessToken()) {
        await setAuthedUser()
      } else {
        await setLocalUser()
      }
      setGlobalLoading()
    } catch (error) {
      console.log('appLoader log', error)
      setError(true)
    }
  }

  useEffect(() => {
    loadEntities()
  }, [globalLoading])

  if (globalLoading && !error) {
    return <Icon id='loader' />
  } else if (error) {
    return <ErrorPage/>
  } else {
    return children
  }
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AppLoader
