// items
const {
  IMG_ITEM_MAN_1, IMG_ITEM_MAN_2, IMG_ITEM_MAN_3, IMG_ITEM_MAN_4, IMG_ITEM_MAN_5, IMG_ITEM_MAN_6,
  IMG_ITEM_WOMAN,
  IMG_ITEM_CAR
} = require("../static/images")
// modal
const {
  PREVIEW_1, PREVIEW_2, PREVIEW_3, PREVIEW_TEST,
  DOT_IMG_1, DOT_IMG_2, DOT_IMG_3, DOT_IMG_TEST
} = require("../static/images")

const products = [
  {
    name: 'Man item 1',
    type: 'man',
    title: 'Some title',
    price: 14,
    bookmark: false,
    rate: 4,
    preview: IMG_ITEM_MAN_1,
    slider_dots: [DOT_IMG_1, DOT_IMG_2, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 1',
    type: 'woman',
    title: 'Some title',
    price: 16,
    bookmark: false,
    rate: 3,
    preview: IMG_ITEM_WOMAN,
    slider_dots: [DOT_IMG_2, DOT_IMG_1, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 1',
    type: 'car',
    title: 'Some title',
    price: 18,
    bookmark: false,
    rate: 4,
    preview: IMG_ITEM_CAR,
    slider_dots: [DOT_IMG_3, DOT_IMG_1, DOT_IMG_2],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_3,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_2,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 2',
    type: 'man',
    title: 'Some title',
    price: 20,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_MAN_2,
    slider_dots: [DOT_IMG_1, DOT_IMG_2, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 2',
    type: 'woman',
    title: 'Some title',
    price: 22,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_WOMAN,
    slider_dots: [DOT_IMG_2, DOT_IMG_1, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 2',
    type: 'car',
    title: 'Some title',
    price: 24,
    bookmark: false,
    rate: 3,
    preview: IMG_ITEM_CAR,
    slider_dots: [DOT_IMG_3, DOT_IMG_1, DOT_IMG_2],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_3,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_2,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 3',
    type: 'woman',
    title: 'Some title',
    price: 26,
    bookmark: false,
    rate: 4,
    preview: IMG_ITEM_WOMAN,
    slider_dots: [DOT_IMG_2, DOT_IMG_1, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 3',
    type: 'man',
    title: 'Some title',
    price: 28,
    bookmark: false,
    rate: 5,
    preview: IMG_ITEM_MAN_3,
    slider_dots: [DOT_IMG_1, DOT_IMG_2, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 3',
    type: 'car',
    title: 'Some title',
    price: 39,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_CAR,
    slider_dots: [DOT_IMG_3, DOT_IMG_1, DOT_IMG_2],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_3,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_2,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 4',
    type: 'man',
    title: 'Some title',
    price: 14,
    bookmark: false,
    rate: 4,
    preview: IMG_ITEM_MAN_4,
    slider_dots: [DOT_IMG_1, DOT_IMG_2, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 4',
    type: 'woman',
    title: 'Some title',
    price: 16,
    bookmark: false,
    rate: 3,
    preview: IMG_ITEM_WOMAN,
    slider_dots: [DOT_IMG_2, DOT_IMG_1, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 4',
    type: 'car',
    title: 'Some title',
    price: 18,
    bookmark: false,
    rate: 4,
    preview: IMG_ITEM_CAR,
    slider_dots: [DOT_IMG_3, DOT_IMG_1, DOT_IMG_2],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_3,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_2,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 5',
    type: 'man',
    title: 'Some title',
    price: 20,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_MAN_5,
    slider_dots: [DOT_IMG_1, DOT_IMG_2, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 5',
    type: 'woman',
    title: 'Some title',
    price: 22,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_WOMAN,
    slider_dots: [DOT_IMG_2, DOT_IMG_1, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 5',
    type: 'car',
    title: 'Some title',
    price: 24,
    bookmark: false,
    rate: 3,
    preview: IMG_ITEM_CAR,
    slider_dots: [DOT_IMG_3, DOT_IMG_1, DOT_IMG_2],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_3,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_2,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Woman item 6',
    type: 'woman',
    title: 'Some title',
    price: 26,
    bookmark: false,
    rate: 4,
    preview: IMG_ITEM_WOMAN,
    slider_dots: [DOT_IMG_2, DOT_IMG_1, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Man item 6',
    type: 'man',
    title: 'Some title',
    price: 28,
    bookmark: false,
    rate: 5,
    preview: IMG_ITEM_MAN_6,
    slider_dots: [DOT_IMG_1, DOT_IMG_2, DOT_IMG_3],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_2,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_3,
        title: 'Some title'
      }
    ]
  },
  {
    name: 'Car item 6',
    type: 'car',
    title: 'Some title',
    price: 39,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_CAR,
    slider_dots: [DOT_IMG_3, DOT_IMG_1, DOT_IMG_2],
    slider: [
      {
        id: 'slider_1',
        preview: PREVIEW_3,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: PREVIEW_1,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: PREVIEW_2,
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
