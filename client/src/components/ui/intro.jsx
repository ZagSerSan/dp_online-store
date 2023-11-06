import React from 'react'
import { Link } from 'react-router-dom'
import './css/intro.css'
import productStore from '../../store/productStore'
import Slider from 'react-slick'

const Intro = () => {
  // получение продуктов, предназначенных для слайдера
  const sliderItems = productStore(
    state => state.productsEntity.filter(item => item.introSlider.switched === true)
  )
  // настройки для слайдера
  var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  
  return (
    <div className='intro'>
      <Slider className='my-container' {...settings}>
        {sliderItems.map(slider => (
          <div key={slider._id}>
            {/* slider-item */}
            <div className='slider-item'>
              {/* left part */}
              <div className="slider-item__column">
                <div className="slider-item__content">
                  <h3>{slider.name}</h3>
                  <h1>{slider.title}</h1>
                  <Link to={`/category/${slider.type}/${slider._id}`}>SHOP NOW</Link>
                </div>
              </div>
              {/* right part (image) */}
              <div className="slider-item__column">
                <img 
                  src={slider.introSlider.slide}
                  alt={slider.name}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Intro
