import configFile from '../../config.json'
const api_staticUrl = configFile.apiEndPoint
const mainCategoryImagesDir = `${api_staticUrl}images/category-nav/`

// изображения категорий
const IMG_MEN = `${mainCategoryImagesDir}man.jpg`
const IMG_WOMEN = `${mainCategoryImagesDir}woman.jpg`
const IMG_PENDANT = `${mainCategoryImagesDir}pendant.jpg`
const IMG_SPRAY = `${mainCategoryImagesDir}spray.jpg`
const IMG_SACHET = `${mainCategoryImagesDir}sachet.jpg`
const IMG_DIFFUSERS = `${mainCategoryImagesDir}diffusers.jpg`
const IMG_CANDLES = `${mainCategoryImagesDir}candles.jpg`
const IMG_REFILL = `${mainCategoryImagesDir}refill.jpg`

export const productCategories = [
  {
    // мужские
    // active: true,
    id: '1',
    to: '/category/men',
    type: 'men',
    name: 'Men',
    value: 'men',
    img: IMG_MEN,
    alt: 'For men',
    label: 'categoryItem_mens',
    // label: 'Men\'s',
  },
  {
    // женские
    // active: true,
    id: '2',
    to: '/category/women',
    type: 'women',
    name: 'Women',
    value: 'women',
    img: IMG_WOMEN,
    alt: 'For women',
    label: 'categoryItem_womens',
  },
  {
    // подвеска (медальён)
    // active: true,
    id: '3',
    to: '/category/pendant',
    type: 'pendant', img: IMG_PENDANT,
    name: 'Pendant',
    value: 'pendant',
    img: IMG_PENDANT,
    alt: 'Aroma Pendant',
    label: 'categoryItem_pendant',
  },
  {
    // спрей
    // active: true,
    id: '4',
    to: '/category/spray',
    type: 'spray', img: IMG_SPRAY,
    name: 'Spray',
    value: 'spray',
    alt: 'Spray',
    label: 'categoryItem_spray',
  },
  {
    // Аромасаше (в гардироб)
    // active: true,
    id: '5',
    to: '/category/sachet',
    type: 'sachet', img: IMG_SACHET,
    name: 'Sachet',
    value: 'sachet',
    alt: 'Fragrance Sachet',
    label: 'categoryItem_sachet',
  },
  {
    // Арома Дифузоры / Aroma Diffusers
    // active: true,
    id: '6',
    to: '/category/diffusers',
    type: 'diffusers', img: IMG_DIFFUSERS,
    name: 'Diffusers',
    value: 'diffusers',
    alt: 'Aroma Diffusers',
    label: 'categoryItem_diffusers',
  },
  {
    // Арома Свечи / Aroma Candles
    // active: true,
    id: '7',
    to: '/category/candles',
    type: 'candles', img: IMG_CANDLES,
    name: 'Candles',
    value: 'candles',
    alt: 'Aroma Candles',
    label: 'categoryItem_candles',
  },
  {
    // Рефил / Refill
    // active: true,
    id: '8',
    to: '/category/refill',
    type: 'refill', img: IMG_REFILL,
    name: 'Refill',
    value: 'refill',
    alt: 'Aroma Refill',
    label: 'categoryItem_refill',
  }
]
