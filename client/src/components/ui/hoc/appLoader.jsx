import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useStore from '../../../store/createStore'
import userStore from '../../../store/userStore'
import localStorageService from '../../../service/localStorage.service'
import ErrorPage from '../../pages/error'
import Icon from '../../common/icon'

const AppLoader = ({ children }) => {
  const { loadProductsList, productsLoadingStatus, setGlobalLoading } = useStore()
  const { setAuthedUser } = userStore()
  const [error, setError] = useState(false)
  
  const test = async () => {
    try {
      await loadProductsList()
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
    test()
  }, [])

  if (productsLoadingStatus && !error) {
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
