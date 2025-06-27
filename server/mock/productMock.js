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
    Million: {
      name: '1 Million',
      type: 'men',
      title: 'LeMien',
      price: 24,
      rate: 0,
      stock: 0,
      // percentage - 5%, fixed - $5, shipping/delivery/ect(especiality) -> prod - delivery ($5)
      discount: {
        type: 'percentage',
        value: 15,
        endTime: 0
      },
      description: '1 Million marki LeMien jest talizmanem sukcesu materialnego jego właściciela i elementem jego wizerunku. Drzewno-korzenny aromat może wykreować wizerunek mężczyzny solidnego, luksusowego i bogatego. Świetna propozycja dla nowoczesnego mężczyzny – lidera w życiu.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 24,
      rate: 0,
      stock: 5,
      discount: {
        type: 'percentage',
        value: 0,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 24,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage',
        value: 0,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: false},
            {type: 'size', value: '6ml', selected: true}
          ]
        },
        {
          name: 'color',
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
      price: 24,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage',
        value: 0,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 56,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage',
        value: 0,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 56,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage',
        value: 0,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 45,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 45,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 39,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 39,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 59,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 59,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 58,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 58,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 76,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
      price: 76,
      rate: 0,
      stock: 1,
      discount: {
        type: 'percentage', 
        value: 15,
        endTime: 0
      },
      description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',
      modalOptionTypes: [
        {
          name: 'size',
          options: [
            {type: 'size', value: '3ml', selected: true},
            {type: 'size', value: '6ml', selected: false}
          ]
        },
        {
          name: 'color',
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
