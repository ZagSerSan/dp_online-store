import React, { useEffect } from 'react'
import useStore from '../../../store/createStore'
import PropTypes from 'prop-types'
import Icon from '../../common/icon'

const AppLoader = ({ children }) => {
  const { loadProductsList, productsLoadingStatus } = useStore()
  
  useEffect(() => {
    loadProductsList()
  }, [])

  if (productsLoadingStatus) {
    return <Icon id='loader' />
    return 'loading...'
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
