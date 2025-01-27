const configFile = require('../../config/default.json')

// const apiServerUrl = 'http://3.91.27.138/'
// const apiServerUrl = 'http://localhost:8080/'
const apiServerUrl = configFile.apiEndPoint
// const LOGO_URL = `${configFile.apiEndPoint}images/logo/logoSapach.png`  

// it's main folder for images
const mainImagesDir = 'images/products/'

// пути к файлам типов
//todo получать кол-во товаров типа сюда из массива продуктов, а не вручную писать
const typesItems = {
  men: {
    quantity: 6,
    imagesPath: apiServerUrl +  mainImagesDir + 'men', // it's folder name
  },
  women: {
    quantity: 6,
    imagesPath: apiServerUrl +  mainImagesDir + 'women',
  },
  spray: {
    quantity: 6,
    imagesPath: apiServerUrl +  mainImagesDir + 'spray',
  },
  pendant: {
    quantity: 1,
    imagesPath: apiServerUrl +  mainImagesDir + 'pendant',
  }
}

// создание полного обекта данных о путях файлов
const getAllItems = (typesItems) => {
  let allItems = {}

  Object.keys(typesItems).map(key => {
    let collectionName = `${key}Items`

    // сначала для каждого map(key создать всю коллекцию этого типа
    // а потом добавить её в общий обект
    let itemsCollection = {} // {manItem1: {...}, manItem1: {...}, ...} 
    let itemsQuantity = typesItems[key].quantity

    for (let i = 1; i < (itemsQuantity + 1); i++) {
      // сначала для каждого map(key создать всю коллекцию этого типа
      let itemName = `${key}Item${i}`

      itemsCollection = {
        ...itemsCollection,
        [itemName]: {
          list: `${typesItems[key].imagesPath}/item_${i}/listItemPreview.png`,
          dots: [
            `${typesItems[key].imagesPath}/item_${i}/dot_1.png`,
            `${typesItems[key].imagesPath}/item_${i}/dot_2.png`,
            `${typesItems[key].imagesPath}/item_${i}/dot_3.png`
          ],
          modalPreviews: {
            slide1: `${typesItems[key].imagesPath}/item_${i}/slide_1.png`,
            slide2: `${typesItems[key].imagesPath}/item_${i}/slide_2.png`,
            slide3: `${typesItems[key].imagesPath}/item_${i}/slide_3.png`
          },
          introSliderPreview: `${typesItems[key].imagesPath}/item_${i}/introSlide.png`
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

//* EXPORT ============================
module.exports = getAllItems(typesItems)
