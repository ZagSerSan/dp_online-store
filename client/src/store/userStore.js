import { create } from 'zustand'
import localStorageService from '../service/localStorage.service'
import userService from '../service/user.service'
import { errorCatcher } from '../utils/errorCatcher'
import { toast } from 'react-toastify'

const userStore = create((set) => ({
  usersEntity: null,
  authedUser: null,
  localUser: null,
  authorizated: false,
  usersLoaded: false,

  updateUser: (newUserData) => set(async (state) => {
    try {
      const { content } = await userService.updateUser(newUserData)
      if (newUserData._id === state.authedUser._id) {
        set((state) => ({ authedUser: content }))
      } else {
        const newUsersArray = state.usersEntity.filter(
          user => user._id !== newUserData._id
        )
        newUsersArray.push(content)
        set((state) => ({ usersEntity: newUsersArray }))
        toast.success("User has been updated! 26")
      }
      set((state) => ({ usersLoaded: false}))
    } catch (error) {
      errorCatcher(error)
    }
  }),
  removeUser: (userId) => set(async (state) => {
    try {
      const { data } = await userService.deleteUser(userId)
      const updatedArray = state.usersEntity.filter(user => user._id !== userId)
      set((state) => ({ usersLoaded: false}))
      toast.success("User has been removed!")
      return { usersEntity: updatedArray }
    } catch (error) {
      console.log('err', error)
      const errorType = error.response?.data?.error?.message
      if (errorType === "EMAIL_EXISTS") {
        toast.error("Email exists!")
      } else {
        errorCatcher(error)
      }
    }
  }),
  createUser: async (payload) => {
    try {
      await userService.createUser(payload)
      set((state) => ({ usersLoaded: false}))
      toast.success("User has been created!")
    } catch (error) {
      errorCatcher(error)
    }
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
