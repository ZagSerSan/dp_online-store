import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import TextField from '../../../common/form/textField'
import Icon from '../../../common/icon'

const SearchButton = ({ productsEntity }) => {
  const { t } = useTranslation('header')
  const [filteredProducts, setFilteredProducts] = useState()
  const [showSearch, setShowSearch] = useState(false)
  const [searchData, setSearchData] = useState({search: ''})
  // изменение состояния поиска
  const handleChange = ({ name, value }) => {
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }))
    setFilteredProducts(value
      ? productsEntity.filter(entity => entity.name.toLowerCase().includes(value.toLowerCase())).splice(0, 4)
      : []
    )
  }
  // открыть/закрыть поиск
  const handleSearch = () => {
    if (showSearch) {
      setShowSearch(false)
      closeSearch()
    } else {
      setShowSearch(true)
    }
  }
  // обнуление состояния поиска
  const closeSearch = () => {
    setShowSearch(false)
    setSearchData({search: ''})
    // setFilteredProducts([])
  }

  return (
    <div>
      {/* кнопка поиска */}
      <button className='header-panel__icon dropdown-toggle' onClick={handleSearch}>
        {showSearch ? <Icon id='close'/> : <Icon id='search'/>}
      </button>

      {/* дроп-меню поиска */}
      {showSearch && <div className='drop-menu search dropdown-animated'>
        <TextField
          placeholder={t('search_placeholder')}
          name="search"
          value={searchData.search}
          onChange={handleChange}
        />
        {(filteredProducts && filteredProducts.length > 0)
          ? <div className='search-wrapper'>
            {(filteredProducts.map(item => (
              <div key={item._id} className='search-wrapper__col'>
                <div className="search-wrapper__row">
                  <NavLink onClick={closeSearch} to={`/category/${item.type}/${item._id}`}>
                    <img src={item.preview} alt={item.name} />
                  </NavLink>
                </div>
                <div className="search-wrapper__row">
                  <NavLink onClick={closeSearch} to={`/category/${item.type}/${item._id}`}>
                    {item.name}
                  </NavLink>
                  <p>{item.price} zl</p>
                </div>
              </div>
              ))
            )}
            <div className='to-search-btn'>
              <NavLink onClick={closeSearch} className='drop-menu__link to-search-btn' to='/category'>
                View more
              </NavLink>
            </div>
          </div>
          : searchData.search ? <p className='not-found'>{t('search_notFound')}</p> : null
        }
      </div>}
    </div>
  )
}

export default SearchButton