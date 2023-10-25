import { create } from 'zustand'
import localStorageService from '../service/localStorage.service'
import userService from '../service/user.service'
import authService from '../service/auth.service'
import { Navigate } from 'react-router-dom'
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
      }
      //!
      // const newUsersArray = state.usersEntity.filter(
      //   user => user._id !== newUserData._id
      // )
      // newUsersArray.push(content)
      set((state) => ({ usersLoaded: false}))
      toast.success("User has been updated!")
      // return { usersEntity: newUsersArray }
    } catch (error) {
      console.log('err', error)
      toast.error("User not updated.. see logs..")
    }
  }),
  removeUser: (userId) => set(async (state) => {
    try {
      const { data } = await userService.deleteUser(userId)
      const updatedArray = state.usersEntity.filter(user => user._id !== userId)
      set((state) => ({ usersLoaded: false}))
      toast.success("User has been removed!")
      return { usersEntity: updatedArray }
    } catch (e) {
      console.log('e', e)
      toast.error("User not updated.. see logs..")
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
