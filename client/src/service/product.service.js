import httpService from './http.service'
import localStorageService from './localStorage.service'
const productEndpoint = 'product/'

const ProductService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  createProductImages: async (files, body) => {
    const url = 'createProductImages'
    const accessToken = `Bearer ${localStorageService.getAccessToken()}`
    const { data } = await httpService.post(
      productEndpoint + url,
      { ...body, ...files},
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": accessToken
        },
      }
    )
    return data
  },
  createProduct: async (body) => {
    const url = 'createProduct'
    const accessToken = `Bearer ${localStorageService.getAccessToken()}`
    const { data } = await httpService.post(
      productEndpoint + url,
      body,
      {headers: {"Authorization": accessToken}}
    )
    return data
  },
  updateProduct: async (productData) => {
    const accessToken = `Bearer ${localStorageService.getAccessToken()}`
    const { data } = await httpService.put(
      productEndpoint + productData._id,
      productData,
      {headers: {"Authorization": accessToken}}
    )
    return data
  },
  updateProductRate: async (commentData) => {
    const { data } = await httpService.put(productEndpoint + commentData.productId, {rate: commentData.rate})
    return data
  },
  deleteProduct: async (productId) => {
    const accessToken = `Bearer ${localStorageService.getAccessToken()}`
    const {data} = await httpService.delete(
      productEndpoint + productId,
      {headers: {"Authorization": accessToken}}
    )
    return data
  }
}

export default ProductService
