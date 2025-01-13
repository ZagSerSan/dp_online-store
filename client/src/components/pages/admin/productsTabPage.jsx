import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import productStore from '../../../store/productStore'
import Pagination from '../../common/pagination'

// todo - добавить кнопку сортировки по скидкам, или сдедать отдельну вкладку для скидочных продуктов...

const ProductsTabPage = () => {
  const { productsEntity, removeProduct, loadProductsList, productsLoaded } = productStore()
  const [currentPage, setCurrentPage] = useState(0)
  const countOnPage = 5

  const splicedEntity = productsEntity
    ? productsEntity.slice(currentPage * countOnPage, (currentPage * countOnPage) + countOnPage)
    : []
  if (splicedEntity.length === 0) {
    setCurrentPage(prev => prev - 1)
  }

  const deleteProduct = (productId) => {
    removeProduct(productId)
  }

  useEffect(() => {
    if (!productsLoaded) {
      loadProductsList()
    }
  }, [productsLoaded])

  return (
    <div className='user-tab-page'>
      {productsEntity
        ? <div>
            <Link to='/admin/products/create-product' className='add-user'>create product</Link>
            ---
            <Link to='' className='add-user'><strike>sort by discount</strike></Link>

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
                    </div>
                  </div>
                  <div className='user-list-item__buttons'>
                    <Link to={`/admin/products/edit-product/${product._id}`}>edit</Link>
                    <button onClick={() => deleteProduct(product._id)}>remove</button>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              countOnPage={countOnPage}
              itemsCount={productsEntity.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        : <p>users not loaded..</p>
      }
    </div>
  )
}

export default ProductsTabPage
