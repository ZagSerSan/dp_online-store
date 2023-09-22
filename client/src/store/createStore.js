import { create } from 'zustand'
import productService from '../service/product.service'
import userService from '../service/user.service'
import localStorageService from '../service/localStorage.service'

const useStore = create((set) => ({
  authedUser: null,
  authorizated: false,
  
  productsEntity: null,
  productsLoadingStatus: true,

  loadProductsList: async () => {
    const { content } = await productService.get()
    set((state) => ({ productsEntity: content}))
    set((state) => ({ productsLoadingStatus: false}))
  },
  setAuthedUser: async () => {
    const { content } = await userService.getCurrentUser()
    set((state) => ({ authedUser: content }))
    set((state) => ({ authorizated: true }))
  },
  logOut: () => {
    localStorageService.removeAuthData()
    set((state) => ({ authedUser: null }))
    set((state) => ({ authorizated: false }))
  }
}))

export default useStore
