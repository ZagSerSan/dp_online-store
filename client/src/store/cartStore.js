import { create } from 'zustand'
import { cartAnimation } from '../utils/cartAnimation'
import userService from '../service/user.service'

const initialCartItemData = {
  count: 1
}

const cartStore = create((set) => ({
  cartItemData: initialCartItemData,
  cartItemDataWasChanged: false,

  setCartItemDataIsChanged: (param) => set((state) => ({ cartWasChanged: param})),
  setCartItemData: (role, data) => set((state) => {
    if (role === 'closeModal') {
      set((state) => ({ cartItemDataWasChanged: false}))
      set((state) => ({ cartItemData: initialCartItemData}))
    } else if (role === 'increment' && state.cartItemData.count < 10) {
      set((state) => ({ cartItemDataWasChanged: true}))
      return { cartItemData: {...state.cartItemData, count: state.cartItemData.count + 1 }}
    } else if (role === 'decrement' && state.cartItemData.count > 0) {
      set((state) => ({ cartItemDataWasChanged: true}))
      return { cartItemData: {...state.cartItemData, count: state.cartItemData.count - 1 }}
    } else if (role === 'toggleOption') {
      set((state) => ({ cartItemDataWasChanged: true}))
      return {
        cartItemData: {
          ...state.cartItemData,
          [data.type]: data.value 
        }
      }
    }
    else if (role === 'setInitialOption') {
      const filteredOption = data.filter(option => option.selected === true)
      return {
        cartItemData: {
          ...state.cartItemData,
          ...initialCartItemData,
          [filteredOption[0].type]: filteredOption[0].value 
        }
      }
    } 
    console.log('last return')
    return { cartItemDataWasChanged: false }
  }),
  addToCart:  (e, authedUser, updAuthedUser, updLocalUserCart, item, isInCart ) => set(async (state) => {
    e.stopPropagation()
    cartAnimation(e.target, isInCart)

    // create new cart item for send to server
    let newCartItemData = {
      ...state.cartItemData,
      _id: item._id,
      name: item.name,
      type: item.type,
      price: `$${item.price}`,
      totalPrice: `$${item.price * state.cartItemData.count}`,
      image: item.preview
    }

    // if default options is was not changed
    if (!state.cartItemDataWasChanged) {
      const itemOptions = item.modalOptionTypes
      itemOptions.forEach(optionItem => {
        const { options } = optionItem
        const filteredOption = options.filter(item => item.selected === true)
        newCartItemData = {
          ...newCartItemData,
          [filteredOption[0].type]: filteredOption[0].value
        }
      })
    }

    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          cart: authedUser.cart.find(cartItem => cartItem._id === item._id)
            ? authedUser.cart.filter(cartItem => cartItem._id !== item._id)
            : [...authedUser.cart, newCartItemData]
        }
        const { content } = await userService.updateUser(newUserData)
        updAuthedUser(content)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserCart(newCartItemData)
    }
  }),

  //* bookmark
  toggleBookmark: async (e, id, authedUser, updAuthedUser, updLocalUserBookmarks) => {
    e.stopPropagation()
    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          bookmarks: authedUser.bookmarks.includes(id)
            ? authedUser.bookmarks.filter(item => item !== id)
            : [...authedUser.bookmarks, id]
        }
        const { content } = await userService.updateUser(newUserData)
        updAuthedUser(content)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserBookmarks(id)
    }
  }
}))

export default cartStore
