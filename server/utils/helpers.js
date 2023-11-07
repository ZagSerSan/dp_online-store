function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// получение названия папки из имени продукта
function splitString(stringToSplit, separator, joinString) {
  let arrayOfStrings = stringToSplit.split(separator)
  return arrayOfStrings.join(joinString).toLowerCase()
}

function generateUserData() {
  return {
    bookmarks: [],
    cart: [],
    image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  }
}

function generateProductData(newProductData) {
  const folderName = splitString(newProductData.name, ' ', '_')

  const IMAGES_URL_API = `http://localhost:8080/images/products/${newProductData.type}/${folderName}`
  const filesPath = `./static/images/products/${newProductData.type}/${folderName}`

  const { preview, sliders, dots, intro } = newProductData.filesName

  const generateImagePath = (namesArray, imagesType) => {
    switch (imagesType) {
      case 'intro':
        return `${IMAGES_URL_API}/${intro[0]}`
      case 'preview':
        return `${IMAGES_URL_API}/${preview[0]}`
      case 'dots':
        return namesArray.map(fileName => (
          `${IMAGES_URL_API}/${fileName}`
        ))
      case 'sliders':
        return namesArray.map((fileName, index) => (
          {
            id: `slider_${index + 1}`,
            preview: `${IMAGES_URL_API}/${fileName}`,
            title: 'Some title..'
          }
        ))
      default:
        break;
    }
  }

  const productImagesPath = {
    filesPath: filesPath,
    introSlider: {
      switched: false,
      slide: generateImagePath(intro, 'intro'),
    },
    preview: generateImagePath(preview, 'preview'),
    slider_dots: generateImagePath(dots, 'dots'),
    slider: generateImagePath(sliders, 'sliders'),
  }

  return {
    name: 'Product Name',
    type: 'man',
    title: 'Some title',
    price: 24,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',

    ...newProductData,
    ...productImagesPath,

    // потому что этот параметр был изменён на клиенте
    introSlider: {
      ...productImagesPath.introSlider,
      ...newProductData.introSlider
    },
  }
}

module.exports = {
  generateUserData,
  generateProductData,
  splitString
}
