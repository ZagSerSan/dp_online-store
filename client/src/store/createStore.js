import { create } from 'zustand'
import productService from '../service/product.service'

const useStore = create((set) => ({
  productsEntity: null,
  productsLoadingStatus: true,

  loadProductsList: async () => {
    const productsData = await productService.get()
    set((state) => ({ productsEntity: productsData}))
    set((state) => ({ productsLoadingStatus: false}))
  }
}))

export default useStore
