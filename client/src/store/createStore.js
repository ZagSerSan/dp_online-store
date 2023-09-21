import { create } from 'zustand'
import productService from '../service/product.service'

const useStore = create((set) => ({
  authedUser: null,
  productsEntity: null,
  productsLoadingStatus: true,

  loadProductsList: async () => {
    const { content } = await productService.get()
    set((state) => ({ productsEntity: content}))
    set((state) => ({ productsLoadingStatus: false}))
  },
  setAuthedUser: (user) => {
    set((state) => ({ authedUser: user}))
  }
}))

export default useStore
