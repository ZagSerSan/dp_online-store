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
    img: IMG_MEN,
    alt: 'For men',
    label: 'Men\'s',
  },
  {
    // женские
    // active: true,
    id: '2',
    to: '/category/women',
    type: 'women',
    img: IMG_WOMEN,
    alt: 'For women',
    label: 'Women\'s',
  },
  {
    // подвеска (медальён)
    // active: true,
    id: '3',
    to: '/category/pendant',
    type: 'pendant', img: IMG_PENDANT,
    img: IMG_PENDANT,
    alt: 'Aroma Pendant',
    label: 'Pendant',
  },
  {
    // спрей
    // active: true,
    id: '4',
    to: '/category/spray',
    type: 'spray', img: IMG_SPRAY,
    alt: 'Spray',
    label: 'Spray',
  },
  {
    // Аромасаше (в гардироб)
    // active: true,
    id: '5',
    to: '/category/sachet',
    type: 'sachet', img: IMG_SACHET,
    alt: 'Fragrance Sachet',
    label: 'Sachet',
  },
  {
    // Арома Дифузоры / Aroma Diffusers
    // active: true,
    id: '6',
    to: '/category/diffusers',
    type: 'diffusers', img: IMG_DIFFUSERS,
    alt: 'Aroma Diffusers',
    label: 'Diffusers',
  },
  {
    // Арома Свечи / Aroma Candles
    // active: true,
    id: '7',
    to: '/category/candles',
    type: 'candles', img: IMG_CANDLES,
    alt: 'Aroma Candles',
    label: 'Candles',
  },
  {
    // Рефил / Refill
    // active: true,
    id: '8',
    to: '/category/refill',
    type: 'refill', img: IMG_REFILL,
    alt: 'Aroma Refill',
    label: 'Refill',
  }
]
