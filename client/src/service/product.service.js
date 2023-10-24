import httpService from './http.service'
const productEndpoint = 'product/'

const ProductService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  updateProduct: async (productData) => {
    const { data } = await httpService.put(productEndpoint + productData._id, productData)
    return data
  },
  updateProductRate: async (commentData) => {
    const { data } = await httpService.put(productEndpoint + commentData.productId, {rate: commentData.rate})
    return data
  },
  deleteProduct: async (productId) => {
    const {data} = await httpService.delete(productEndpoint + productId)
    return data
  }
}

export default ProductService
