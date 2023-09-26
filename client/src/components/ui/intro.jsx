import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import './css/intro.css'

const Intro = () => {
  // slick imgs
  const SLIDER_URL_1 = 'http://localhost:8080/images/intro/slider_1.png'
  const SLIDER_URL_2 = 'http://localhost:8080/images/intro/slider_2.png'
  const SLIDER_URL_3 = 'http://localhost:8080/images/intro/slider_3.png'
  const SLIDER_URL_4 = 'http://localhost:8080/images/intro/slider_4.png'

  var settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const sliders = [
    {
      src: SLIDER_URL_1,
      supTitle: 'We keep pets for pleasure.',
      title: 'Food & Vitamins For all Pets',
      alt: 'slider_1'
    },
    {
      src: SLIDER_URL_2,
      supTitle: 'We keep pets for pleasure.',
      title: `Food & Vitamins For all Pets`,
      alt: 'slider_2'
    },
    {
      src: SLIDER_URL_3,
      supTitle: 'We keep pets for pleasure.',
      title: `Food & Vitamins For all Pets`,
      alt: 'slider_2'
    },
    {
      src: SLIDER_URL_4,
      supTitle: 'We keep pets for pleasure.',
      title: `Food & Vitamins For all Pets`,
      alt: 'slider_2'
    }
  ]
  return (
    <div  className='intro'>
      <Slider className='my-container' {...settings}>
        {sliders.map(slider => (
          <div key={slider.alt}>
            <div className='slider-item'>
              <div className="slider-item__column">
                <div className="slider-item__content">
                  <h3>{slider.supTitle}</h3>
                  <h1>{slider.title}</h1>
                  <Link to='/category/fordog/id'>SHOP NOW</Link>
                </div>
              </div>
              <div className="slider-item__column">
                <img src={slider.src} alt={slider.alt} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Intro