function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateUserData() {
  return {
    bookmarks: [],
    cart: [],
    image: `https://xsgames.co/randomusers/assets/avatars/male/${getRandomInt(0, 78)}.jpg`
  }
}

//todo
function generateProductData(newProductData) {
  const IMAGES_URL_API = `http://localhost:8080/images/products/${newProductData.type}/${newProductData._folderNum}/`

  // todo здесь нужно будет удалять файлы из объекта продукта после их сохранения

  const productImagesPath = {
    introSlider: {
      switched: false,
      slide: `${IMAGES_URL_API}introSlide.png`
    },
    preview: `${IMAGES_URL_API}listItemPreview.png`,
    slider_dots: [
      `${IMAGES_URL_API}dot_1.png`,
      `${IMAGES_URL_API}dot_2.png`,
      `${IMAGES_URL_API}dot_3.png`,
    ],
    slider: [
      {
        id: 'slider_1',
        preview: `${IMAGES_URL_API}slide_1.png`,
        title: 'Some title'
      },
      {
        id: 'slider_2',
        preview: `${IMAGES_URL_API}slide_2.png`,
        title: 'Some title'
      },
      {
        id: 'slider_3',
        preview: `${IMAGES_URL_API}slide_3.png`,
        title: 'Some title'
      }
    ]
  }

  delete newProductData.images
  delete newProductData._folderNum

  return {
    // тут принимать картинки
    // 1 сохранять из в папку
    // 2 генирировать пути как было сделано на клиенте
    // 3 добавлять в объект ниже

    name: 'Product Name',
    type: 'man',
    title: 'Some title',
    price: 24,
    rate: 0,
    description: 'Founded in 1989, Jack & Jones is a Danish brand that offers cool, relaxed designs that express a strong visual style through their diffusion lines, Jack & Jones intelligence and Jack & Jones vintage.',

    ...productImagesPath,
    ...newProductData,

    // потому что этот параметр был изменён на клиенте
    introSlider: {
      ...productImagesPath.introSlider,
      ...newProductData.introSlider
    },
  }
}

module.exports = {
  generateUserData,
  generateProductData
}
