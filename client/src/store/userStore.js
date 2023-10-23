import { create } from 'zustand'
import localStorageService from '../service/localStorage.service'
import userService from '../service/user.service'

const userStore = create((set) => ({
  usersEntity: null,
  authedUser: null,
  localUser: null,
  authorizated: false,
  usersLoaded: false,

  //todo
  removeUser: (userId) => set(async (state) => {
    set((state) => ({ usersLoaded: false}))
    const { data } = await userService.deleteUser(userId)
    const updatedArray = state.usersEntity.filter(user => user._id !== userId)
    return { usersEntity: updatedArray }
  }),
  createUser: async (payload) => {
    const { data } = await userService.create(payload)
    localStorageService.setTokens(data)
    return data
  },
  loadUsersList: async () => {
    const { content } = await userService.get()
    set((state) => ({ usersEntity: content}))
    set((state) => ({ usersLoaded: true}))
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
  updAuthedUser: async (newUserData) => {
    try {
      const { content } = await userService.updateUser(newUserData)
      set((state) => ({ authedUser: content }))
    } catch (e) {
      console.log('e', e)
    }
  },
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

export default userStore
