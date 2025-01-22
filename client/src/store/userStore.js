import { create } from 'zustand'
import { toast } from 'react-toastify'
import { errorCatcher } from '../utils/errorCatcher'
import localStorageService from '../service/localStorage.service'
import userService from '../service/user.service'

const userStore = create((set) => ({
  usersEntity: null,
  authedUser: null,
  localUser: null,
  authorizated: false,
  usersLoaded: false,

  // обновление пользователя
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
  // удаление
  removeUser: (userId) => set(async (state) => {
    try {
      const { data } = await userService.deleteUser(userId)
      const updatedArray = state.usersEntity.filter(user => user._id !== userId)
      set((state) => ({ usersLoaded: false}))
      toast.success("User has been removed!")
      return { usersEntity: updatedArray }
    } catch (error) {
      console.log('err', error)
    }
  }),
  // создание
  createUser: async (payload) => {
    try {
      await userService.createUser(payload)
      set((state) => ({ usersLoaded: false}))
      toast.success("User has been created!")
    } catch (error) {
      console.log('error :>> ', error)
      const errorType = error.response?.data?.error?.message
      if (errorType === "EMAIL_EXISTS") {
        toast.error("Email exists!")
      } else {
        errorCatcher(error)
      }
    }
  },
  // загрузка списка пользователей
  loadUsersList: async () => {
    const { content } = await userService.get()
    set((state) => ({ usersEntity: content}))
    set((state) => ({ usersLoaded: true}))
  },
  // обновление не авторизов пользователя (корзины)
  // updLocalUserCart: (cartItem, role) => set((state) => {
  updLocalUserCart: (newLocalCart, role) => set((state) => {
    if (role === 'clear-all') {
      localStorageService.clearCart()
      const newLocalUserData = {
        ...state.localUser,
        cart: []
      }
      return { localUser: newLocalUserData }
    } else {
      // обновление корзины в localStore
      localStorageService.setCart(newLocalCart)
      // обновление localUser в store
      const newLocalUserData = {
        ...state.localUser,
        // cart: localStorageService.setCart(cartItem, role)
        cart: newLocalCart
        
      }
      return { localUser: newLocalUserData }
    }
  }),
  // обновление не авторизов пользователя (избранное)
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
  // загрузка и установка авторизованного польз 
  setAuthedUser: async () => {
    set((state) => ({ localUser: null }))
    const { content } = await userService.getCurrentUser()
    localStorageService.removeLocalUser()
    set((state) => ({ authedUser: content }))
    set((state) => ({ authorizated: true }))
    set((state) => ({ usersLoaded: false }))
  },
  // загрузка и установка НЕ авторизованного польз 
  setLocalUser: async () => {
    const localUser = localStorageService.setLocalUser()
    set((state) => ({ localUser }))
  },
  logOut: () => {
    localStorageService.removeAuthData()
    set((state) => ({ authedUser: null }))
    set((state) => ({ authorizated: false }))
    const localUser = localStorageService.setLocalUser()
    set((state) => ({ localUser }))
  }
}))

export default userStore
