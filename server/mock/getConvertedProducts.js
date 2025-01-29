const configFile = require('../config/default.json')
const apiServerUrl = configFile.apiEndPoint
const mainFilesDir = `${apiServerUrl}images/products/`

const getConvertedProducts = (initialProducts) => {
  /* Новый метод:
    1 - преобразование в старую структуру (массив во всеми продуктами подряд)
    2 - добавления путей файлов к каждому продукту
  */

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
  const splitString = function (stringToSplit, separator, joinString) {
    let arrayOfStrings = stringToSplit.split(separator)
    return arrayOfStrings.join(joinString).toLowerCase()
  }

  // step 1: convertToOldStructure, step 2: .map(update)
  const products = convertToOldStructure(initialProducts).map(product => {
    const staticFolderName = `./static/images/products/${product.type}/${splitString(product.name, ' ', '_')}` 
    const serverFolderName = `${mainFilesDir}${product.type}/${splitString(product.name, ' ', '_')}/`

    let filesPaths  = {
      filesName: {
        preview: ['listItemPreview.png'],
        sliders: ['slide_1.png', 'slide_2.png', 'slide_3.png'],
        dots: ['dot_1.png', 'dot_2.png', 'dot_3.png'],
      },
      filesPath: staticFolderName,
      introSlider: {
        switched: false,
        slide: `${serverFolderName}introSlide.png`,
      },
      preview: `${serverFolderName}listItemPreview.png`,
      slider_dots: [
        `${serverFolderName}dot_1.png`,
        `${serverFolderName}dot_2.png`,
        `${serverFolderName}dot_3.png`
      ],
      slider: [
        {
          id: `slider_1`,
          preview: `${serverFolderName}slide_1.png`,
          title: 'Some title'
        },
        {
          id: 'slider_2',
          preview: `${serverFolderName}slide_2.png`,
          title: 'Some title'
        },
        {
          id: 'slider_3',
          preview: `${serverFolderName}slide_3.png`,
          title: 'Some title'
        }
      ]
    }

    return {
      ...product,
      ...filesPaths
    }
  })

  return products
}

module.exports = {
  getConvertedProducts
}
