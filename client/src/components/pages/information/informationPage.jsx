import React, { useState } from 'react'
import InfoContent from './infoContent'

const InformationPage = () => {
  const [settingItemState, setSettingItemState] = useState(1)
  const settingItems = [
    {number: 1, contentType: 'delivery', title: 'Delivery info'},
    {number: 2, contentType: 'contacts', title: 'Our contacts'},
    {number: 3, contentType: 'about', title: 'About us'}
  ]
  
  const toggleSettingItem = (settingItemId) => {
    setSettingItemState(settingItemId)
  }

  return (
    <div className="my-container">
      <div className='accordion-page'>
        {settingItems.map(settingItem => (
          <div key={settingItem.number} className={"accordion-page-item" + (settingItemState === settingItem.number ? ' active' : '')}>
            <div className="accordion-page-item-clicker" onClick={() => toggleSettingItem(settingItem.number)}>
              <div className='accordion-page-item-clicker__number'>{settingItem.number}</div>
              <div className='accordion-page-item-clicker__title'>{settingItem.title}</div>
            </div>
            <div className="accordion-page-item-content">
              <InfoContent
                contentType={settingItem.contentType}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InformationPage
