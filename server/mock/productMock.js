const configFile = require('../config/default.json')
const apiServerUrl = configFile.apiEndPoint
const mainImagesDir = 'images/products/'

// initialProducts
const initialProducts = {
  men: {
    1: {
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
    3: {
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
    4: {
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
    5: {
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
    6: {
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
    3: {
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
    4: {
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
    5: {
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
    6: {
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
    3: {
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
    4: {
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
    5: {
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
    6: {
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
  },
}

/* Cтруктура:
  1 - Получение типов с кол-вом: getItemsTypes => itemsTypes
  2 - создание данных о путях файлов продукта
  3 - создание полного обекта данных посредством добавления путей файлов
? 4 - преобразование в старую структуру (массив во всеми подряд)
*/

// Получение типов с кол-вом: itemsTypes
function getItemsTypes(products) {
  let result = {}

  // Перебираем все ключи первого уровня в объекте "products"
  for (let category in products) {
    if (products.hasOwnProperty(category)) {
      // Считаем количество элементов в каждой категории (men, women)
      // result[category] = Object.keys(products[category]).length
      result = {
        ...result,
        [category]: {
          quantity: Object.keys(products[category]).length,
          imagesPath: apiServerUrl +  mainImagesDir + [category]
        }
      }
    }
  }

  return result
}
const itemsTypes = getItemsTypes(initialProducts)

// создание данных о путях файлов продукта
const getAllItems = (itemsTypes) => {
  let allItems = {}

  Object.keys(itemsTypes).map(key => {
    let collectionName = `${key}`

    // сначала для каждого map(key создать всю коллекцию этого типа
    // а потом добавить её в общий обект
    let itemsCollection = {} // {manItem1: {...}, manItem1: {...}, ...} 
    let itemsQuantity = itemsTypes[key].quantity

    for (let i = 1; i < (itemsQuantity + 1); i++) {
      // сначала для каждого map(key создать всю коллекцию этого типа
      let itemName = `${i}`

      itemsCollection = {
        ...itemsCollection,
        [itemName]: {
          filesName: {
            preview: ['listItemPreview.png'],
            sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
            dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
          },
          filesPath: `./static/images/products/${key}/item_${i}`,
          introSlider: {
            switched: false,
            slide: `${itemsTypes[key].imagesPath}/item_${i}/introSlide.png`,
          },
          preview: `${itemsTypes[key].imagesPath}/item_${i}/listItemPreview.png`,
          slider_dots: [
            `${itemsTypes[key].imagesPath}/item_${i}/dot_1.png`,
            `${itemsTypes[key].imagesPath}/item_${i}/dot_2.png`,
            `${itemsTypes[key].imagesPath}/item_${i}/dot_3.png`
          ],
          slider: [
            {
              id: `slider_1`,
              preview: `${itemsTypes[key].imagesPath}/item_${i}/slide_1.png`,
              title: 'Some title'
            },
            {
              id: 'slider_2',
              preview: `${itemsTypes[key].imagesPath}/item_${i}/slide_2.png`,
              title: 'Some title'
            },
            {
              id: 'slider_3',
              preview: `${itemsTypes[key].imagesPath}/item_${i}/slide_3.png`,
              title: 'Some title'
            }
          ]
        }
      }
    }
    // а потом добавить её в общий обект
    allItems = {
      ...allItems,
      [collectionName]: itemsCollection
    }
  })
  // для экспорта всех айтемов
  return allItems
}
const titles = getAllItems(itemsTypes)

// создание полного обекта данных посредством добавления путей файлов
function mergeProductData(testProducts, titles) {
  // Перебираем ключи в объекте titles
  for (let key in titles) {
    if (titles.hasOwnProperty(key) && testProducts.hasOwnProperty(key)) {
      // Перебираем вложенные элементы, например menItems
      for (let subKey in titles[key]) {
        if (titles[key].hasOwnProperty(subKey) && testProducts[key].hasOwnProperty(subKey)) {
          // Добавляем свойства title и description в соответствующий объект testProducts
          testProducts[key][subKey] = {
            ...testProducts[key][subKey],  // Сохраняем существующие свойства
            ...titles[key][subKey],         // Добавляем новые свойства
          }
        }
      }
    }
  }
  return testProducts
}
const newProductsData = mergeProductData(initialProducts, titles)

// преобразование в старую структуру
function convertToOldStructure(newStructure) {
  const oldStructure = []

  // Преобразуем menItems в men
  Object.values(newStructure).forEach(category => {
    Object.values(category).forEach(item => {
      oldStructure.push(item)
    })
  })

  return oldStructure
}

const products = convertToOldStructure(newProductsData)

module.exports = products
