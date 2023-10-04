import { create } from 'zustand'
import productService from '../service/product.service'
import userService from '../service/user.service'
import localStorageService from '../service/localStorage.service'

const useStore = create((set) => ({
  authedUser: null,
  localUser: null,
  authorizated: false,
  globalLoading: true,
  
  productsEntity: null,
  productsLoadingStatus: true,

  loadProductsList: async () => {
    const { content } = await productService.get()
    set((state) => ({ productsEntity: content}))
    set((state) => ({ productsLoadingStatus: false}))
  },
  updLocalUserCart: (id) => set((state) => {
    if (state.localUser?.cart) {
      const newLocalUserData = {
        ...state.localUser,
        cart: localStorageService.setCart(id)
      }
      return { localUser: newLocalUserData }
    } else {
      const newLocalUserData = state.localUser
        ? {
          ...state.localUser,
          cart: localStorageService.setCart(id)
        }
        : {
          cart: localStorageService.setCart(id)
        }
      return { localUser: newLocalUserData }
    }
  }),
  updLocalUserBookmarks: (id) => set((state) => {
    if (state.localUser?.bookmarks) {
      const newLocalUserData = {
        ...state.localUser,
        bookmarks: localStorageService.setBookmarks(id)
      }
      return { localUser: newLocalUserData }
    } else {
      const newLocalUserData = state.localUser
        ? {
          ...state.localUser,
          bookmarks: localStorageService.setBookmarks(id)
        }
        : {
          bookmarks: localStorageService.setBookmarks(id)
        }
      return { localUser: newLocalUserData }
    }
  }),
  updAuthedUser: (newUserData) => set((state) => ({ authedUser: newUserData })),
  setGlobalLoading: () => set((state) => ({ globalLoading: false})),
  setAuthedUser: async () => {
    const { content } = await userService.getCurrentUser()
    localStorageService.removeLocalUser()
    set((state) => ({ authedUser: content }))
    set((state) => ({ authorizated: true }))
  },
  logOut: () => {
    localStorageService.removeAuthData()
    set((state) => ({ authedUser: null }))
    set((state) => ({ authorizated: false }))
  }
  // setBookmarkForProduct: (newItemData) => set((state) => {
  //   const filteredEntities = state.productsEntity.filter(item => item._id !== newItemData._id)
  //   const newEntities = [...filteredEntities, newItemData]
  //   return { productsEntity: newEntities }
  // }),
}))

export default useStore
