import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Slider from 'react-slick'
import './intro.css'
// slick imgs
import SLIDER_1 from '../assets/img/intro/slider_1.png'
import SLIDER_2 from '../assets/img/intro/slider_2.png'

const Intro = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const sliders = [
    {
      src: SLIDER_1,
      supTitle: 'We keep pets for pleasure.',
      title: 'Food & Vitamins For all Pets',
      alt: 'slider_1'
    },
    {
      src: SLIDER_2,
      supTitle: 'We keep pets for pleasure.',
      title: `Food & Vitamins For all Pets`,
      alt: 'slider_2'
    }
  ]
  return (
    <div  className='intro'>
      <Slider className='container' {...settings}>
        {sliders.map(slider => (
          <div>
            <div className='slider-item'>
              <div className="slider-item__column">
                <div className="slider-item__content">
                  <h3>{slider.supTitle}</h3>
                  <h1>{slider.title}</h1>
                  <Link to='/category/forhim/id'>SHOP NOW</Link>
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