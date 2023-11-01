import { create } from 'zustand'
import ProductService from '../service/product.service'
import { errorCatcher } from '../utils/errorCatcher'

const useStore = create((set) => ({
  productsEntity: null,
  productsLoadingStatus: true,
  globalLoading: true,

  createNewProduct: (newProductData) => set(async (state) => {
    try {
      const { content } = await ProductService.createProduct(newProductData)
      set((state) => ({ productsEntity: [...state.productsEntity, content] }))
      set((state) => ({ usersLoaded: false }))
      toast.success("Product has been created!")
    } catch (error) {
      errorCatcher(error)
    }
  }),
  updateProduct: (newProductData) => set(async (state) => {
    try {
      const { content } = await ProductService.updateProduct(newProductData)
      const newProductsArray = state.productsEntity.filter(
        product => product._id !== newProductData._id
      )
      newProductsArray.push(content)
      set((state) => ({ usersLoaded: false }))
      set((state) => ({ productsEntity: newProductsArray }))
      toast.success("Product has been updated!")
    } catch (error) {
      errorCatcher(error)
    }
  }),
  removeProduct: (productId) => set(async (state) => {
    try {
      const { data } = await ProductService.deleteProduct(productId)
      const updatedArray = state.productsEntity.filter(product => product._id !== productId)
      set((state) => ({ productsEntity: updatedArray}))
      toast.success("User has been removed!")
    } catch (error) {
      errorCatcher(error)
    }
  }),
  loadProductsList: async () => {
    const { content } = await ProductService.get()
    set((state) => ({ productsEntity: content}))
    set((state) => ({ productsLoadingStatus: false}))
  },
  setGlobalLoading: () => set((state) => ({ globalLoading: false})),
}))

export default useStore
