import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import './css/bestProduct.css'
import productStore from '../../store/productStore'
// todo = timer
import moment from 'moment'
import Timer from '../common/timer/timer'

const BestProduct = () => {
  const { productsEntity } = productStore()
  // продукт, максимального рейтинга
  const maxRatingProduct = _.orderBy(productsEntity, ['rate'], ['desc'])[0]

// todo = timer
  const counterItems = [
    {type: 'DD', name: 'Days'},
    {type: 'HH', name: 'Hours'},
    {type: 'mm', name: 'Min'},
    {type: 'ss', name: 'Sec'},
  ]

  
  const nowDate = moment(Date.now())
  const futureDate = moment('2024-01-31T22:00:00')
  const [timeDiff, setTimeDiff] = useState()

  // let updateTimer = () => {
  //   if (timeDiff > 0) {
  //     setTimeDiff(moment.utc(futureDate.diff(Date.now())))
  //   } else {
  //     // clearInterval(timer);
  //     console.log('else')
  //   }
  // }
  // let timer = setInterval(updateTimer, 1000);
  // console.log('timer :>> ', timer)

  useEffect(() => {

    setTimeDiff(moment.utc(futureDate.diff(nowDate)))

    // let updateTimer = () => {
    //   if (timeDiff > 0) {
    //     setTimeDiff(prev => prev - 1000)
    //   } else {
    //     // clearInterval(timer);
    //     console.log('else')
    //   }
    // }
    // let timer = setInterval(updateTimer, 1000)
    // updateTimer()

  }, [])

  // let updateTimer = () => {
  //   if (timeDiff > 0) {
  //     setTimeDiff(moment.utc(futureDate.diff(Date.now())))
  //   } else {
  //     // clearInterval(timer);
  //     console.log('else')
  //   }
  // }
  // let timer = setInterval(updateTimer, 1000);
  // console.log('timer :>> ', timer)
  // updateTimer()

  const getTimeValue = (formatType) => {
    return timeDiff.format(formatType)
  }

  return (<>
    {maxRatingProduct && (
      <div className='my-container best-product'>
        <h3 className="best-product__title">Best Product</h3>
        <h2 className="best-product__subtitle">Deal of the Week</h2>
        <div className="best-product__wrapper">
          <div className="best-product__col">
            <div className="best-product-image">
              <img src={maxRatingProduct.preview} alt="preview" />
            </div>
          </div>
          <div className="best-product__col">
            <div className="best-product-content">
              <h3 className="best-product-content__name">
                <Link
                  to={`/category/${maxRatingProduct.type}/${maxRatingProduct._id}`}
                >
                  {maxRatingProduct.name}
                </Link>
              </h3>
              <div className="best-product-content__price">
                
                {maxRatingProduct.discount?.endTime > Date.now()
                  ? <p>
                      <span>{(maxRatingProduct.price - (maxRatingProduct.price / 100 * maxRatingProduct.discount.percentage)).toFixed(2)} - </span>
                      <strike>${(maxRatingProduct.price).toFixed(2)}</strike>
                    </p>
                  : <p className="preview-info__price">${maxRatingProduct.price}.00</p>
                }

              </div>
              <p className="best-product-content__description">
                Lorem ipsum dolor sit amet, co adipisicing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercita ullamco laboris nisi ut aliquip ex ea commodo
              </p>
              <Timer endDate={maxRatingProduct.discount?.endTime}/>
              <Link
                className="best-product-content__shop-btn"
                to={`/category/${maxRatingProduct.type}/${maxRatingProduct._id}`}
              >
                shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
  </>)
}

export default BestProduct
