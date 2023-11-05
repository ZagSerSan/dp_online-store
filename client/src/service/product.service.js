import httpService from './http.service'
import localStorageService from './localStorage.service'
const productEndpoint = 'product/'

const ProductService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  createProductImages: async (files, body) => {
    const url = productEndpoint + 'createProductImages'
    const { data } = await httpService.post(
      url,
      { ...body, ...files},
      {headers: {"Content-Type": "multipart/form-data"}}
    )
    return data
  },
  createProduct: async (body) => {
    const url = productEndpoint + 'createProduct'
    const { data } = await httpService.post(url, body)
    return data
  },
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
    // обновление файлов продукта
    } else if (role === 'images') {
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
      const { data } = await httpService.put(
        url,
        productData,
        {headers: {"options": "options"}}
      )
      return data
    } else {
      const { data } = await httpService.put(url, productData)
      return data
    }
  },
  deleteProduct: async (productId) => {
    const {data} = await httpService.delete(productEndpoint + productId)
    return data
  }
}

export default ProductService
