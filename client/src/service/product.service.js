import httpService from './http.service'
// import localStorageService from './localStorage.service'
const productEndpoint = 'product/'

const ProductService = {
  // получение всех продуктов
  get: async () => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  // создание сущности продукта на сервере
  createProduct: async (body) => {
    const url = productEndpoint + 'createProduct'
    const { data } = await httpService.post(url, body)
    return data
  },
  // создание файлов продукта на сервере
  createProductImages: async (files, body) => {
    const url = productEndpoint + 'createProductImages'
    const { data } = await httpService.post(
      url,
      { ...body, ...files},
      {headers: {"Content-Type": "multipart/form-data"}}
    )
    return data
  },
  // обновление продукта в зависимости от типа изменений
  updateProduct: async (productData, role) => {
    const url = productEndpoint + productData._id
    // обновление только рейтинга
    if (role === 'edit-rate') {
      const { data } = await httpService.put(
        url,
        productData,
        {headers: {"accessrole": role}}
      )
      return data
    } else if (role === 'images') {
      // обновление файлов продукта
      const { data } = await httpService.put(
        url,
        { _id: productData._id, ...productData.info},
        {headers: {"images": "data"}}
      )
      await httpService.put(
        url,
        { _id: productData._id, ...productData.files},
        {headers: {
          "Content-Type": "multipart/form-data",
          "images": "files"
        }}
      )
      return data
    } else if (role === 'options') {
      // обновление опшинов продукта
      const { data } = await httpService.put(
        url,
        productData,
        {headers: {"options": "options"}}
      )
      return data
    } else {
      // всего остального
      const { data } = await httpService.put(url, productData)
      return data
    }
  },
  // удаление продукта
  deleteProduct: async (productId) => {
    const {data} = await httpService.delete(productEndpoint + productId)
    return data
  }
}

export default ProductService
