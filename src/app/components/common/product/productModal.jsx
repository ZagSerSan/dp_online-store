import React from 'react'
import Slider from 'react-slick'
import Icon from '../icon'
import './css/productModal.css'
// images
// import SLIDER_1 from '../../../assets/img/modal/l1.jpg'
// import SLIDER_2 from '../../../assets/img/modal/l2.jpg'
// import SLIDER_3 from '../../../assets/img/modal/l3.jpg'
// import dot_img_1 from '../../../assets/img/modal/s1.jpg'
// import dot_img_2 from '../../../assets/img/modal/s2.jpg'
// import dot_img_3 from '../../../assets/img/modal/s3.jpg'
import SLIDER_1 from '../../../assets/img/modal/l1.png'
import SLIDER_2 from '../../../assets/img/modal/l2.png'
import SLIDER_3 from '../../../assets/img/modal/l3.png'
import dot_img_1 from '../../../assets/img/modal/s1.png'
import dot_img_2 from '../../../assets/img/modal/s2.png'
import dot_img_3 from '../../../assets/img/modal/s3.png'

const ProductModal = ({ modalState, onToggleState }) => {
  // preview slider
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  const sliders = [
    {
      id: 'slider_1',
      src: SLIDER_1,
      dot: dot_img_1,
      title: 'Food & Vitamins For all Pets',
    },
    {
      id: 'slider_2',
      src: SLIDER_2,
      dot: dot_img_2,
      title: 'Food & Vitamins For all Pets',
    },
    {
      id: 'slider_3',
      src: SLIDER_3,
      dot: dot_img_3,
      title: 'Food & Vitamins For all Pets',
    },
  ]

  // corretcing slider html
  const productModalPreview = document.querySelector('.product-modal-preview')
  if (productModalPreview) {
    const productModalPreview_slickDots = productModalPreview.querySelector('.slick-dots')
    productModalPreview_slickDots.style.display = 'flex'

    const slider_arrows = productModalPreview.querySelectorAll('.slick-arrow')
    slider_arrows.forEach(arrow => {
      arrow.style.display = 'none'
    });

    const productModalPreview_btn = productModalPreview.querySelectorAll('li > button')
    productModalPreview_btn.forEach((btn, index) => btn.innerHTML = `<img src=${sliders[index].dot} alt='${index}'/>`)
  }

  // modal close func
  const closeModal = () => {
    const el = document.querySelector('.product-modal')
    el.classList.add('hiding')
    setTimeout(() => {
      onToggleState(false)
    }, 400)
  }

  return (
    <div className={"product-modal" + (modalState ? ' active' : '')}>
      <div className="product-modal__wrapper">
        <button className='product-modal__close' onClick={closeModal}><Icon id={'close'}/></button>
        <div className="product-modal-preview">
          <Slider {...settings}>
            {sliders.map(slider => (
              <div key={slider.id}>
                <div className='slider-item'>
                  <img src={slider.src} alt={slider.title} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="product-modal-content"></div>
      </div>
    </div>
  )
}

export default ProductModal
