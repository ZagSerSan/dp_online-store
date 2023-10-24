function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateUserData() {
  return {
    bookmarks: [],
    cart: [],
    image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  }
}

//todo
function generateProductData() {
  return {
    name: 'Man item 1',
    type: 'man',
    title: 'Some title',
    price: 14,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    modalOptionTypes: [
      {
        name: 'Size',
        options: [
          {type: 'size', value: '3ml', selected: true},
          {type: 'size', value: '6ml', selected: false}
        ]
      },
      {
        name: 'Color',
        options: [
          {type: 'color', value: 'default', selected: true},
          {type: 'color', value: 'black', selected: false},
        ] 
      }
    ],
    introSlider: {
      switched: false,
      // slide: manItem1.introSliderPreview
    },
    preview: manItem1.list,
    slider_dots: manItem1.dots,
    slider: [
      {
        id: 'slider_1',
        preview: manItem1.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: manItem1.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: manItem1.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  }
}

module.exports = {
  generateUserData
}
