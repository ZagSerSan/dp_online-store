import IMG_MAN from '../../assets/img/category-nav/manCateg.png' 
import IMG_WOMAN from '../../assets/img/category-nav/womanCateg.png' 
import IMG_CAR from '../../assets/img/category-nav/carCateg.png' 

const categories = [
  {
    id: '1',
    to: '/category/man',
    type: 'man',
    img: IMG_MAN,
    alt: 'For man',
    label: 'Man\'s',
    styleClass: ' man-color'
  },
  {
    id: '2',
    to: '/category/woman',
    type: 'woman',
    img: IMG_WOMAN,
    alt: 'For woman',
    label: 'Woman\'s',
    styleClass: ' woman-color'
  },
  {
    id: '3',
    to: '/category/car',
    type: 'car', img: IMG_CAR, alt:
    'For car',
    label: 'Car\'s',
    styleClass: ' car-color'
  }
]

// имитация поступления данных
const fetchCategories = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(categories)
    }, 1500)
  })

export default {
  fetchCategories
}
