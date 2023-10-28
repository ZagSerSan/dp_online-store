// items
const { manItems, womanItems, carItems } = require("../static/images")

const { manItem1, manItem2, manItem3, manItem4, manItem5, manItem6 } = manItems
const { womanItem1, womanItem2, womanItem3, womanItem4, womanItem5, womanItem6 } = womanItems
const { carItem1, carItem2, carItem3, carItem4, carItem5, carItem6 } = carItems

const products = [
  {
    name: 'Man item 1',
    type: 'man',
    title: 'Some title',
    price: 14,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/man/1`,
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
      slide: manItem1.introSliderPreview
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
  },
  {
    name: 'Woman item 1',
    type: 'woman',
    title: 'Some title',
    price: 16,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/woman/1`,
    modalOptionTypes: [
      {
        name: 'Size',
        options: [
          {type: 'size', value: '3ml', selected: false},
          {type: 'size', value: '6ml', selected: true}
        ]
      },
      {
        name: 'Color',
        options: [
          {type: 'color', value: 'default', selected: false},
          {type: 'color', value: 'black', selected: true},
        ] 
      }
    ],
    introSlider: {
      switched: false,
      slide: womanItem1.introSliderPreview
    },
    preview: womanItem1.list,
    slider_dots: womanItem1.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womanItem1.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womanItem1.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womanItem1.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 1',
    type: 'car',
    title: 'Some title',
    price: 18,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/car/1`,
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
      slide: carItem1.introSliderPreview
    },
    preview: carItem1.list,
    slider_dots: carItem1.dots,
    slider: [
      {
        id: 'slider_1',
        preview: carItem1.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: carItem1.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: carItem1.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 2',
    type: 'man',
    title: 'Some title',
    price: 20,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/man/2`,
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
      slide: manItem2.introSliderPreview
    },
    preview: manItem2.list,
    slider_dots: manItem2.dots,
    slider: [
      {
        id: 'slider_1',
        preview: manItem2.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: manItem2.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: manItem2.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 2',
    type: 'woman',
    title: 'Some title',
    price: 22,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/woman/2`,
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
      switched: true,
      slide: womanItem2.introSliderPreview
    },
    preview: womanItem2.list,
    slider_dots: womanItem2.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womanItem2.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womanItem2.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womanItem2.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 2',
    type: 'car',
    title: 'Some title',
    price: 24,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/car/2`,
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
      switched: true,
      slide: carItem2.introSliderPreview
    },
    preview: carItem2.list,
    slider_dots: carItem2.dots,
    slider: [
      {
        id: 'slider_1',
        preview: carItem2.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: carItem2.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: carItem2.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 3',
    type: 'woman',
    title: 'Some title',
    price: 26,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/woman/3`,
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
      slide: womanItem3.introSliderPreview
    },
    preview: womanItem3.list,
    slider_dots: womanItem3.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womanItem3.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womanItem3.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womanItem3.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 3',
    type: 'man',
    title: 'Some title',
    price: 28,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/man/3`,
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
      slide: manItem3.introSliderPreview
    },
    preview: manItem3.list,
    slider_dots: manItem3.dots,
    slider: [
      {
        id: 'slider_1',
        preview: manItem3.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: manItem3.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: manItem3.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 3',
    type: 'car',
    title: 'Some title',
    price: 39,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/car/3`,
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
      slide: carItem3.introSliderPreview
    },
    preview: carItem3.list,
    slider_dots: carItem3.dots,
    slider: [
      {
        id: 'slider_1',
        preview: carItem3.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: carItem3.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: carItem3.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 4',
    type: 'man',
    title: 'Some title',
    price: 14,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/man/4`,
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
      slide: manItem4.introSliderPreview
    },
    preview: manItem4.list,
    slider_dots: manItem4.dots,
    slider: [
      {
        id: 'slider_1',
        preview: manItem4.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: manItem4.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: manItem4.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 4',
    type: 'woman',
    title: 'Some title',
    price: 16,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/woman/4`,
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
      slide: womanItem4.introSliderPreview
    },
    preview: womanItem4.list,
    slider_dots: womanItem4.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womanItem4.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womanItem4.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womanItem4.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 4',
    type: 'car',
    title: 'Some title',
    price: 18,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/car/4`,
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
      slide: carItem4.introSliderPreview
    },
    preview: carItem4.list,
    slider_dots: carItem4.dots,
    slider: [
      {
        id: 'slider_1',
        preview: carItem4.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: carItem4.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: carItem4.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 5',
    type: 'man',
    title: 'Some title',
    price: 20,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/man/5`,
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
      slide: manItem5.introSliderPreview
    },
    preview: manItem5.list,
    slider_dots: manItem5.dots,
    slider: [
      {
        id: 'slider_1',
        preview: manItem5.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: manItem5.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: manItem5.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 5',
    type: 'woman',
    title: 'Some title',
    price: 22,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/woman/5`,
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
      slide: womanItem5.introSliderPreview
    },
    preview: womanItem5.list,
    slider_dots: womanItem5.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womanItem5.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womanItem5.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womanItem5.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 5',
    type: 'car',
    title: 'Some title',
    price: 24,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/car/5`,
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
      switched: true,
      slide: carItem5.introSliderPreview
    },
    preview: carItem5.list,
    slider_dots: carItem5.dots,
    slider: [
      {
        id: 'slider_1',
        preview: carItem5.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: carItem5.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: carItem5.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 6',
    type: 'woman',
    title: 'Some title',
    price: 26,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/woman/6`,
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
      slide: womanItem6.introSliderPreview
    },
    preview: womanItem6.list,
    slider_dots: womanItem6.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womanItem6.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womanItem6.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womanItem6.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 6',
    type: 'man',
    title: 'Some title',
    price: 28,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/man/6`,
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
      slide: manItem6.introSliderPreview
    },
    preview: manItem6.list,
    slider_dots: manItem6.dots,
    slider: [
      {
        id: 'slider_1',
        preview: manItem6.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: manItem6.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: manItem6.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 6',
    type: 'car',
    title: 'Some title',
    price: 39,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/car/6`,
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
      switched: true,
      slide: carItem6.introSliderPreview
    },
    preview: carItem6.list,
    slider_dots: carItem6.dots,
    slider: [
      {
        id: 'slider_1',
        preview: carItem6.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: carItem6.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: carItem6.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
]

// const fs = require('fs')
// const path = require('path')

// const image_1 = path.join(__dirname, '/images/items/man_item.png')
// const image_2 = path.join(__dirname, '/images/items/woman_item.png')
// const file_1 = fs.readFileSync(image_1, {encoding:'utf8'})
// const file_2 = fs.readFileSync(image_2, {encoding:'utf8'})

// const products = [
//   {img: image_1},
//   {img: image_2}
// ]
// const productsJSON = JSON.stringify(products)

module.exports = products
  // productsJSON
