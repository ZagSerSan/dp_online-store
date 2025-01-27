import configFile from '../../config.json'

// изображения категорий
const api_staticUrl = configFile.apiEndPoint
const IMG_MEN = `${api_staticUrl}images/category-nav/manCateg.png`
const IMG_WOMEN = `${api_staticUrl}images/category-nav/womanCateg.png`
// todo
const IMG_SPRAY = `${api_staticUrl}images/category-nav/spray.png`
const IMG_VOLKSWAGEN = `${api_staticUrl}images/category-nav/volkswagen.png`
const IMG_SACHET = `${api_staticUrl}images/category-nav/sachet.png`

export const productCategories = [
  {
    id: '1',
    to: '/category/men',
    type: 'men',
    img: IMG_MEN,
    alt: 'For men',
    label: 'Men\'s',
    styleClass: ' man-color'
  },
  {
    id: '2',
    to: '/category/women',
    type: 'women',
    img: IMG_WOMEN,
    alt: 'For women',
    label: 'Women\'s',
    styleClass: ' woman-color'
  },
  {
    id: '3',
    to: '/category/pendant',
    type: 'pendant', img: IMG_VOLKSWAGEN,
    alt: 'Aroma Pendant',
    label: 'Pendant',
    styleClass: ' pendant-color'
  },
  {
    id: '4',
    to: '/category/spray',
    type: 'spray', img: IMG_SPRAY,
    alt: 'Spray',
    label: 'Spray',
    styleClass: ' spray-color'
  },
  {
    id: '5',
    to: '/category/sachet',
    type: 'sachet', img: IMG_SACHET,
    alt: 'Fragrance Sachet',
    label: 'Sachet',
    styleClass: ' sachet-color'
  },
  
]
