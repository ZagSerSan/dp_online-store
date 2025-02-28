const { getConvertedProducts } = require("./getConvertedProducts")

/*//*новая структура
initialProducts = {
  product_type: {
    product_name: {product_name's initial_data}
  },
  ...
*/
      
const initialProducts = {
  men: {
    men_item_1: {
      name: 'Men item 1',
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
    },
    perfume_gold: {
      name: 'Men item 2',
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
    },
  },
  women: {
    1: {
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
    },
    2: {
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
    },
  },
  spray: {
    1: {
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
    },
    2: {
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
    },
  },
  pendant: {
    1: {
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
    },
    2: {
      name: 'Pendant item 2',
      type: 'pendant',
      title: 'Some title',
      price: 32,
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
    },
  },
  sachet: {
    1: {
      name: 'Sachet item 1',
      type: 'sachet',
      title: 'Some title',
      price: 44,
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
    },
    2: {
      name: 'Sachet item 2',
      type: 'sachet',
      title: 'Some title',
      price: 34,
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
    },
  },
  diffusers: {
    1: {
      name: 'Diffusers item 1',
      type: 'diffusers',
      title: 'Some title',
      price: 43,
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
    },
    2: {
      name: 'Diffusers item 2',
      type: 'diffusers',
      title: 'Some title',
      price: 41,
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
    },
  },
  candles: {
    1: {
      name: 'Candles item 1',
      type: 'candles',
      title: 'Some title',
      price: 43,
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
    },
    2: {
      name: 'Candles item 2',
      type: 'candles',
      title: 'Some title',
      price: 41,
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
    },
  },
  refill: {
    1: {
      name: 'Refill item 1',
      type: 'refill',
      title: 'Some title',
      price: 43,
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
    },
    2: {
      name: 'Refill item 2',
      type: 'refill',
      title: 'Some title',
      price: 41,
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
    },
  },
}

module.exports = getConvertedProducts(initialProducts)
