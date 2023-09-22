import React, { useEffect } from 'react'
import useStore from '../../../store/createStore'
import PropTypes from 'prop-types'
import Icon from '../../common/icon'
import localStorageService from '../../../service/localStorage.service'

const AppLoader = ({ children }) => {
  const { loadProductsList, productsLoadingStatus, setAuthedUser } = useStore()
  
  useEffect(() => {
    loadProductsList()
    if (localStorageService.getAccessToken()) {
      setAuthedUser()
    }
  }, [])

  if (productsLoadingStatus) {
    return <Icon id='loader' />
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
