import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../../../store/createStore'

const ProductsTabPage = () => {
  const { productsEntity, removeProduct } = useStore()
  const [currentPage, setCurrentPage] = useState(0)
  const countOnPage = 5

  const pages = productsEntity.length / countOnPage

  const pagesHeler = (numberOfPages) => {
    const pagesArray = []
    for (let i = 0; i < numberOfPages; i++) {
      pagesArray.push(i)
    }
    return pagesArray
  }

  const splicedEntity = productsEntity
    ? productsEntity.slice(currentPage * countOnPage, (currentPage * countOnPage) + countOnPage)
    : []

  // useEffect(() => {
  //   if (!usersLoaded) {
  //     loadUsersList()
  //   }
  // }, [usersEntity, usersLoaded])

  const deleteProduct = (productId) => {
    removeProduct(productId)
  }

  return (
    <div className='user-tab-page'>
      {productsEntity
        ? <div>
            <Link to='/admin/products/create-product' className='add-user'>create product</Link>

            <div className="user-list">
              {splicedEntity.map((product, index) => (
                <div key={index} className='user-list-item'>
                  <div className='user-list-item__info'>
                    <Link to={`/category/${product.type}/${product._id}`}>
                      <img src={product.preview} alt="preview" />
                    </Link>
                    <div>
                      <p>
                        <Link to={`/category/${product.type}/${product._id}`}>{product.name}</Link>
                      </p>
                      <p className='address'>
                        {/* {product.address
                          ? `${product.address.сountry}, ${product.address.city}, ${product.address.street}, ${user.address.houseNumber}`
                          : ''
                        } */}
                      </p>
                    </div>
                  </div>
                  <div className='user-list-item__buttons'>
                    <Link to={`/admin/products/edit-product/${product._id}`}>edit</Link>
                    <button onClick={() => deleteProduct(product._id)}>remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="user-tab-page-pagination">
              {pagesHeler(pages).map(item => (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item)}
                  className={currentPage === item ? 'active' : ''}
                >
                  {item + 1}
                </button>
              ))}
            </div>

          </div>
        : <p>users not loaded..</p>
      }
    </div>
  )
}

export default ProductsTabPage
