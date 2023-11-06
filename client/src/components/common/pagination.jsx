import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'

const Pagination = ({ countOnPage, itemsCount, setCurrentPage, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / countOnPage) // кол-во страниц
  const pages = _.range(0, pageCount) // массив страниц (целое число)

  // не отображать пагинацию если кол-в остраниц равно 1
  if (pageCount === 1) return null

  return (
    <nav className="user-tab-page-pagination">
      {pages.map(item => (
        <button
          key={item}
          onClick={() => setCurrentPage(item)}
          className={currentPage === item ? 'active' : ''}
        >
          {item + 1}
        </button>
      ))}
    </nav>
  )
}
Pagination.propTypes = {
  countOnPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
