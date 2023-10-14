import httpService from './http.service'

const productEndpoint = 'product/'

const ProductService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  updateProductRate: async (commentData) => {
    // console.log('commentData :>> ', commentData)
    const { data } = await httpService.put(productEndpoint + commentData.productId, {rate: commentData.rate})
    return data
  }
}

export default ProductService
