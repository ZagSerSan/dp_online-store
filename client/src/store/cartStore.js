import { create } from 'zustand'
import { cartAnimation } from '../utils/cartAnimation'
// import applyDiscount from '../utils/applyDiscount'

// начальное состояние продукта для корзины
const initialCartItemData = {
  count: 1,
  optionTypes: {}
}

const cartStore = create((set) => ({
  cartItemData: initialCartItemData,
  cartItemDataWasChanged: false,

  // функуция "стандартное состояние корзины было изменено"
  setCartItemDataIsChanged: (param) => set((state) => ({ cartWasChanged: param})),
  // редактирвание состояния корзины
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
          optionTypes: {
            ...state.cartItemData.optionTypes,
            [data.type]: data.value
          }
        }
      }
    }
    else if (role === 'setInitialOption') {
      const filteredOption = data.filter(option => option.selected === true)
      return {
        cartItemData: {
          ...state.cartItemData,
          ...initialCartItemData,
          optionTypes: {
            ...state.cartItemData.optionTypes,
            [filteredOption[0].type]: filteredOption[0].value 
          }
        }
      }
    } 
    return { cartItemDataWasChanged: false }
  }),
  // добавить в корзину
  addToCart:  (e, authedUser, updateUser, updLocalUserCart, item, isInCart ) => set(async (state) => {
    e.stopPropagation()
    cartAnimation(e.target, isInCart)

    // create new cart item for send to server
    let newCartItemData = {
      ...state.cartItemData,
      _id: item._id,
    }

    // if default options is was not changed
    if (!state.cartItemDataWasChanged) {
      const itemOptions = item.modalOptionTypes

      itemOptions.forEach(optionItem => {
        const { options } = optionItem
        // получаем только "выбранные по умолчанию"
        const filteredOption = options.filter(item => item.selected === true)
        newCartItemData = {
          ...newCartItemData,
          optionTypes: {
            ...newCartItemData.optionTypes,
            [filteredOption[0].type]: filteredOption[0].value
          }
        }
      })
    }

    //todo тут изменить логику на простое добавление без его замены - line 90
    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          cart: authedUser.cart.find(cartItem => cartItem._id === item._id)
            ? authedUser.cart.filter(cartItem => cartItem._id !== item._id)
            : [...authedUser.cart, newCartItemData]
        }
        updateUser(newUserData)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserCart(newCartItemData)
    }
  }),
  // переключать избранное
  toggleBookmark: async (e, id, authedUser, updateUser, updLocalUserBookmarks) => {
    e.stopPropagation()
    if (authedUser) {
      try {
        const newUserData = {
          ...authedUser,
          bookmarks: authedUser.bookmarks.includes(id)
            ? authedUser.bookmarks.filter(item => item !== id)
            : [...authedUser.bookmarks, id]
        }
        updateUser(newUserData)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserBookmarks(id)
    }
  }
}))

export default cartStore
