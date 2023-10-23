import { create } from 'zustand'
import localStorageService from '../service/localStorage.service'
import userService from '../service/user.service'
import authService from '../service/auth.service'

const userStore = create((set) => ({
  usersEntity: null,
  authedUser: null,
  localUser: null,
  authorizated: false,
  usersLoaded: false,

  removeUser: (userId) => set(async (state) => {
    try {
      const { data } = await userService.deleteUser(userId)
      const updatedArray = state.usersEntity.filter(user => user._id !== userId)
      set((state) => ({ usersLoaded: false}))
      return { usersEntity: updatedArray }
    } catch (e) {
      console.log('e', e)
    }
  }),
  createUser: async (payload) => {
    const role = 'create'
    await authService.register(payload, role)
    set((state) => ({ usersLoaded: false}))
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
  //todo
  updateUser: (newUserData) => set(async (state) => {
    try {
      const { content } = await userService.updateUser(newUserData)
      const newUsersArray = state.usersEntity.filter(
        user => user._id !== newUserData._id
      )
      newUsersArray.push(content)
      set((state) => ({ usersLoaded: false}))
      return { usersEntity: newUsersArray }
    } catch (e) {
      console.log('e', e)
    }
  }),
  // updAuthedUser: async (newUserData) => {
  //   try {
  //     const { content } = await userService.updateUser(newUserData)
      
  //     console.log('content :>> ', content)
  //     // set((state) => ({ authedUser: content }))
  //   } catch (e) {
  //     console.log('e', e)
  //   }
  // },
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
