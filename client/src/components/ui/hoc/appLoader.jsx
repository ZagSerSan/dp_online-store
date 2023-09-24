import React, { useEffect, useState } from 'react'
import useStore from '../../../store/createStore'
import PropTypes from 'prop-types'
import Icon from '../../common/icon'
import localStorageService from '../../../service/localStorage.service'
// import { Navigate, useNavigate } from 'react-router-dom'
import ErrorPage from '../../pages/error'

const AppLoader = ({ children }) => {
  const { loadProductsList, productsLoadingStatus, setAuthedUser } = useStore()
  const [error, setError] = useState(false)
  
  const test = async () => {
    try {
      await loadProductsList()
      if (localStorageService.getAccessToken()) {
        await setAuthedUser()
      }
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
