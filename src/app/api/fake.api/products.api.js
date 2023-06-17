// items
import { IMG_ITEM_MAN, IMG_ITEM_WOMAN, IMG_ITEM_CAR } from "./images"
// modal
import {
  PREVIEW_1, PREVIEW_2, PREVIEW_3,
  DOT_IMG_1, DOT_IMG_2, DOT_IMG_3
} from "./images"

const products = [
  {
    _id: '1',
    name: 'Man item 1',
    type: 'man',
    title: 'Some title',
    price: 14,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_MAN,
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
    _id: '2',
    name: 'Moman item 1',
    type: 'woman',
    title: 'Some title',
    price: 16,
    bookmark: false,
    rate: 3,
    preview: IMG_ITEM_WOMAN,
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
    _id: '3',
    name: 'Car item 1',
    type: 'car',
    title: 'Some title',
    price: 18,
    bookmark: false,
    rate: 4,
    preview: IMG_ITEM_CAR,
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
    _id: '4',
    name: 'Man item 2',
    type: 'man',
    title: 'Some title',
    price: 20,
    bookmark: false,
    rate: 5,
    preview: IMG_ITEM_MAN,
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
    _id: '5',
    name: 'Moman item 2',
    type: 'woman',
    title: 'Some title',
    price: 22,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_WOMAN,
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
    _id: '6',
    name: 'Car item 2',
    type: 'car',
    title: 'Some title',
    price: 24,
    bookmark: false,
    rate: 3,
    preview: IMG_ITEM_CAR,
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
    _id: '7',
    name: 'Moman item 3',
    type: 'woman',
    title: 'Some title',
    price: 26,
    bookmark: false,
    rate: 4,
    preview: IMG_ITEM_WOMAN,
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
    _id: '8',
    name: 'Man item 3',
    type: 'man',
    title: 'Some title',
    price: 28,
    bookmark: false,
    rate: 5,
    preview: IMG_ITEM_MAN,
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
    _id: '9',
    name: 'Car item 3',
    type: 'car',
    title: 'Some title',
    price: 39,
    bookmark: false,
    rate: 2,
    preview: IMG_ITEM_CAR,
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
]

const getPopularProducts = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(products.filter(product => product.rate > 3))
    }, 1000)
  })

const getProductById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(products.filter(product => product._id === id))
    }, 1000)
  })

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(products)
    }, 2000)
  })

export default {
  fetchAll,
  getProductById,
  getPopularProducts
}
