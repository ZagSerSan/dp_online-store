import React from 'react'

const InfoContent = ({ contentType }) => {
  // const navigate = useNavigate()

  return (
    <div className='info-page'>
    {contentType === 'delivery'
      ? (
        <div>
          <div className="accordion-page-item-content__title">Delivery info</div>
          <div className="accordion-page-item-content__subtitle">Delivery methods and other info</div>
          <div className='form-container'>
            <div className="form-container__row">
              <p className='delivery-text'>Delivery is carried out by local companies such as: "InPost", "NovaPost", "Poczta Polska" and others. Please specify by phone which method will be better for you.</p>
            </div>
          </div>
        </div>
        )
      : contentType === 'contacts'
      ? (
        <div>
          <div className="accordion-page-item-content__title">Contacts info</div>
          <div className="accordion-page-item-content__subtitle">Our contacts</div>
          <div className='form-container'>
            <div className="form-container__row">
              <a href='' className='contact-text'>+48 000 000 000</a>
              <a href='' className='contact-text'>email4421@gmail.com</a>
            </div>
          </div>
        </div>
      )
      : (
        <div>
          <div className="accordion-page-item-content__title">About us</div>
          <div className="accordion-page-item-content__subtitle">Your Personal Details</div>
          <div className='form-container'>
            <div className="form-container__row">
              <p className='about-text'>Here you can learn more about our company.</p>
              <br/>
              <p className='about-text'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. </p>
              <br/>
              <p className='about-text'>It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
            </div>
          </div>
        </div>
      )
    }
  </div>
  )
}

export default InfoContent
