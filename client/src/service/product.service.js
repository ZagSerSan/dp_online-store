import httpService from './http.service'
const productEndpoint = 'product/'

const ProductService = {
  get: async () => {
    const { data } = await httpService.get(productEndpoint)
    return data
  },
  createProduct: async (payload) => {
      const url = 'createProduct'
      const { data } = await httpService.post(productEndpoint + url, payload)
      return data
  },
  // createProduct: async (payload) => {
  //   try {
  //     const url = 'createProduct'
  //     const { data } = await httpService.post(productEndpoint + url, payload)
  //     console.log('data :>> ', data)
  //     toast.success("Product has been created!")
  //     return data
  //   } catch (error) {
  //     const errorType = error.response.data.error.message
  //     console.log('err', error)
  //     if (errorType === "EMAIL_EXISTS") {
  //       toast.error("Email exists!")
  //     } else {
  //       toast.error("User not created..")
  //     }
  //   }
  // },
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
