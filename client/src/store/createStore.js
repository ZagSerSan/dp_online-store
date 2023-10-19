import { create } from 'zustand'
import ProductService from '../service/product.service'

const useStore = create((set) => ({
  globalLoading: true,
  
  productsEntity: null,
  productsLoadingStatus: true,

  loadProductsList: async () => {
    const { content } = await ProductService.get()
    set((state) => ({ productsEntity: content}))
    set((state) => ({ productsLoadingStatus: false}))
  },
  setGlobalLoading: () => set((state) => ({ globalLoading: false})),
}))

export default useStore
