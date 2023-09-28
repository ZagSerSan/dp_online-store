import httpService from './http.service'

const productEndpoint = 'product/'

const productService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  toggleBookmark: async (updProductData) => {
    // console.log('updProductData :>> ', updProductData)
    // console.log('updProductData._id :>> ', updProductData._id)
    const { data } = await httpService.put(productEndpoint + updProductData._id, updProductData)
    return data
  }
}

export default productService
