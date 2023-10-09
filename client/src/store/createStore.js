import { create } from 'zustand'
import productService from '../service/product.service'
import userService from '../service/user.service'
import localStorageService from '../service/localStorage.service'

//todo
const initialCartData = {
  count: 1,
  size: '',
  color: ''
}

const useStore = create((set) => ({
  authedUser: null,
  localUser: null,
  authorizated: false,
  globalLoading: true,
  
  productsEntity: null,
  productsLoadingStatus: true,

  //todo cart state
  cartItemData: initialCartData,
  cartItemDataWasChanged: false,
  setCartItemDataIsChanged: (param) => set((state) => ({ cartWasChanged: param})),
  setCartItemData: (role, data) => set((state) => {
    if (role === 'closeModal') {
      console.log('closeModal')
      set((state) => ({ cartItemDataWasChanged: false}))
    } else if (role === 'increment' && state.cartItemData.count < 10) {
      set((state) => ({ cartItemDataWasChanged: true}))
      return { cartItemData: {...state.cartItemData, count: state.cartItemData.count + 1 }}
    } else if (role === 'decrement' && state.cartItemData.count > 0) {
      set((state) => ({ cartItemDataWasChanged: true}))
      return { cartItemData: {...state.cartItemData, count: state.cartItemData.count - 1 }}
    } else if (role === 'option') {
      console.log('option', data)
      if (state.cartItemDataWasChanged) {
        return {
          cartItemData: {
            ...state.cartItemData,
            [data.type]: data.value 
          }
        }
      } else {
        return {
          cartItemData: {
            ...state.cartItemData,
            count: 1,
            [data.type]: data.value 
          }
        }
      }
    }
    return { cartItemData: state.cartItemData}
  }),

  loadProductsList: async () => {
    const { content } = await productService.get()
    set((state) => ({ productsEntity: content}))
    set((state) => ({ productsLoadingStatus: false}))
  },
  updLocalUserCart: (cartItem) => set((state) => {
    if (state.localUser?.cart) {
      const newLocalUserData = {
        ...state.localUser,
        cart: localStorageService.setCart(cartItem)
      }
      return { localUser: newLocalUserData }
    } else {
      const newLocalUserData = state.localUser
        ? {
          ...state.localUser,
          cart: localStorageService.setCart(cartItem)
        }
        : {
          cart: localStorageService.setCart(cartItem)
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
}))

export default useStore
