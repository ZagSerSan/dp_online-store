import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useStore from '../../../store/createStore'
import userStore from '../../../store/userStore'
import localStorageService from '../../../service/localStorage.service'
import ErrorPage from '../../pages/error'
import Icon from '../../common/icon'

const AppLoader = ({ children }) => {
  const { loadProductsList, setGlobalLoading, globalLoading } = useStore()
  const { setAuthedUser, loadUsersList } = userStore()
  const [error, setError] = useState(false)
  
  const loadEntities = async () => {
    try {
      await loadProductsList()
      await loadUsersList()
      if (localStorageService.getAccessToken()) {
        await setAuthedUser()
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
