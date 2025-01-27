// items
const { menItems, womenItems, sprayItems, pendantItems } = require("../static/images")

const { menItem1, menItem2, menItem3, menItem4, menItem5, menItem6 } = menItems
const { womenItem1, womenItem2, womenItem3, womenItem4, womenItem5, womenItem6 } = womenItems
const { sprayItem1, sprayItem2, sprayItem3, sprayItem4, sprayItem5, sprayItem6 } = sprayItems
const { pendantItem1 } = pendantItems

// const initialProducts
const products = [
  //todo ----------------------------------------------------
  {
    name: 'Pendant item 1',
    type: 'pendant',
    title: 'Some title',
    price: 23,
    rate: 0,
    discount: {
      type: 'percentage', 
      value: 15,
      endTime: 0
    },
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

    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
    filesPath: `./static/images/products/pendant/item_1`,
    introSlider: {
      switched: false,
      slide: menItem1.introSliderPreview
    },
    preview: pendantItem1.list,
    slider_dots: menItem1.dots,
    slider: [
      {
        id: 'slider_1',
        preview: menItem1.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: menItem1.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: menItem1.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  //todo ----------------------------------------------------

  {
    name: 'men item 1',
    type: 'men',
    title: 'Some title',
    price: 25,
    rate: 0,
    // percentage - 5%, fixed - $5, shipping/delivery/ect(especiality) -> prod - delivery ($5)
    discount: {
      type: 'percentage', 
      value: 15,
      endTime: 0
    },
    // пример структуры для некскольних скидок
    // discount: [
    //   {
    //     name: 'New year',
    //     type: 'percentage',
    //     value: 15,
    //     endTime: 0
    //   },
    //   {
    //     name: 'Delivery',
    //     type: 'delivery',
    //     value: 10,
    //     endTime: 0
    //   }
    // ],
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/men/item_1`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: menItem1.introSliderPreview
    },
    preview: menItem1.list,
    slider_dots: menItem1.dots,
    slider: [
      {
        id: 'slider_1',
        preview: menItem1.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: menItem1.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: menItem1.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Women item 1',
    type: 'women',
    title: 'Some title',
    price: 16,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/women/item_1`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: womenItem1.introSliderPreview
    },
    preview: womenItem1.list,
    slider_dots: womenItem1.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womenItem1.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womenItem1.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womenItem1.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Spray item 1',
    type: 'spray',
    title: 'Some title',
    price: 18,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/spray/item_1`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: sprayItem1.introSliderPreview
    },
    preview: sprayItem1.list,
    slider_dots: sprayItem1.dots,
    slider: [
      {
        id: 'slider_1',
        preview: sprayItem1.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: sprayItem1.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: sprayItem1.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'men item 2',
    type: 'men',
    title: 'Some title',
    price: 20,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/men/item_2`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: menItem2.introSliderPreview
    },
    preview: menItem2.list,
    slider_dots: menItem2.dots,
    slider: [
      {
        id: 'slider_1',
        preview: menItem2.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: menItem2.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: menItem2.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Women item 2',
    type: 'women',
    title: 'Some title',
    price: 22,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/women/item_2`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: womenItem2.introSliderPreview
    },
    preview: womenItem2.list,
    slider_dots: womenItem2.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womenItem2.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womenItem2.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womenItem2.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Spray item 2',
    type: 'spray',
    title: 'Some title',
    price: 24,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/spray/item_2`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: sprayItem2.introSliderPreview
    },
    preview: sprayItem2.list,
    slider_dots: sprayItem2.dots,
    slider: [
      {
        id: 'slider_1',
        preview: sprayItem2.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: sprayItem2.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: sprayItem2.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Women item 3',
    type: 'women',
    title: 'Some title',
    price: 26,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/women/item_3`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: womenItem3.introSliderPreview
    },
    preview: womenItem3.list,
    slider_dots: womenItem3.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womenItem3.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womenItem3.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womenItem3.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'men item 3',
    type: 'men',
    title: 'Some title',
    price: 28,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/men/item_3`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: menItem3.introSliderPreview
    },
    preview: menItem3.list,
    slider_dots: menItem3.dots,
    slider: [
      {
        id: 'slider_1',
        preview: menItem3.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: menItem3.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: menItem3.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Spray item 3',
    type: 'spray',
    title: 'Some title',
    price: 39,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/spray/item_3`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: sprayItem3.introSliderPreview
    },
    preview: sprayItem3.list,
    slider_dots: sprayItem3.dots,
    slider: [
      {
        id: 'slider_1',
        preview: sprayItem3.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: sprayItem3.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: sprayItem3.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'men item 4',
    type: 'men',
    title: 'Some title',
    price: 14,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/men/item_4`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: menItem4.introSliderPreview
    },
    preview: menItem4.list,
    slider_dots: menItem4.dots,
    slider: [
      {
        id: 'slider_1',
        preview: menItem4.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: menItem4.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: menItem4.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Women item 4',
    type: 'women',
    title: 'Some title',
    price: 16,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/women/item_4`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: womenItem4.introSliderPreview
    },
    preview: womenItem4.list,
    slider_dots: womenItem4.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womenItem4.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womenItem4.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womenItem4.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Spray item 4',
    type: 'spray',
    title: 'Some title',
    price: 18,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/spray/item_4`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: sprayItem4.introSliderPreview
    },
    preview: sprayItem4.list,
    slider_dots: sprayItem4.dots,
    slider: [
      {
        id: 'slider_1',
        preview: sprayItem4.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: sprayItem4.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: sprayItem4.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'men item 5',
    type: 'men',
    title: 'Some title',
    price: 20,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/men/item_5`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: menItem5.introSliderPreview
    },
    preview: menItem5.list,
    slider_dots: menItem5.dots,
    slider: [
      {
        id: 'slider_1',
        preview: menItem5.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: menItem5.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: menItem5.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Women item 5',
    type: 'women',
    title: 'Some title',
    price: 22,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/women/item_5`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: womenItem5.introSliderPreview
    },
    preview: womenItem5.list,
    slider_dots: womenItem5.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womenItem5.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womenItem5.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womenItem5.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Spray item 5',
    type: 'spray',
    title: 'Some title',
    price: 24,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/spray/item_5`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: sprayItem5.introSliderPreview
    },
    preview: sprayItem5.list,
    slider_dots: sprayItem5.dots,
    slider: [
      {
        id: 'slider_1',
        preview: sprayItem5.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: sprayItem5.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: sprayItem5.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Women item 6',
    type: 'women',
    title: 'Some title',
    price: 26,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/women/item_6`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: womenItem6.introSliderPreview
    },
    preview: womenItem6.list,
    slider_dots: womenItem6.dots,
    slider: [
      {
        id: 'slider_1',
        preview: womenItem6.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: womenItem6.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: womenItem6.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'men item 6',
    type: 'men',
    title: 'Some title',
    price: 28,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/men/item_6`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: menItem6.introSliderPreview
    },
    preview: menItem6.list,
    slider_dots: menItem6.dots,
    slider: [
      {
        id: 'slider_1',
        preview: menItem6.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: menItem6.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: menItem6.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Spray item 6',
    type: 'spray',
    title: 'Some title',
    price: 39,
    rate: 0,
    discount: {
      type: 'percentage',
      value: 0,
      endTime: 0
    },
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
    filesPath: `./static/images/products/spray/item_6`,
    filesName: {
      preview: ['listItemPreview.png'],
      sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
      dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
    },
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
      slide: sprayItem6.introSliderPreview
    },
    preview: sprayItem6.list,
    slider_dots: sprayItem6.dots,
    slider: [
      {
        id: 'slider_1',
        preview: sprayItem6.modalPreviews.slide1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: sprayItem6.modalPreviews.slide2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: sprayItem6.modalPreviews.slide3,
        title: 'Some title'
      }
    ]
  },
]

//todo функция получения всех путей картинок

// const products = getImagesPaths(initialProducts)
module.exports = products
