import { create } from 'zustand'
import { cartAnimation } from '../utils/cartAnimation'
import { generateCartItemKey } from '../utils/generateCartItemKey'
import userService from '../service/user.service'

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
    // определение уник ключа добавляемого продукта
    const newCartItemKey = generateCartItemKey(item._id, state.cartItemData.optionTypes)
    // create new cart item for send to server
    let newCartItemData = {
      ...state.cartItemData,
      // добавление уник key из выбранных опицй
      key: generateCartItemKey(item._id, state.cartItemData.optionTypes),
      _id: item._id
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

    if (authedUser) {
      try {
        // сравнение ключей нового с уже имеющимся в корзине
        const findedCartItem = authedUser.cart.find(cartItem => cartItem.key === newCartItemKey)

        let newCart
        // если уник ключи совпадают
        if (findedCartItem && (findedCartItem.key === newCartItemKey)) {
          // если кол-во совпадает
          if (findedCartItem.count === state.cartItemData.count) {
            // ничего не делать
            return
          } else {
            // отфильтровать корзину и изменить кол-во тек-го продукта (если key совпадают)
            newCart = authedUser.cart.map((item) =>
              item.key === newCartItemKey ? { ...item, count: newCartItemData.count } : item
            )
          }
        } else {
          newCart = [...authedUser.cart, newCartItemData]
        }

        const newUserData = {
          ...authedUser,
          cart: newCart
        }

        updateUser(newUserData)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserCart(newCartItemData)
    }
  }),
  // удалить из корзины
  removeFromCart: (e, item, role = '', authedUser, updateUser, updLocalUserCart ) => set(async (state) => {
    // cartAnimation(e.target, true)

    // если пользователь залогинен
    if (authedUser) {
      try {
        let newCart
        if (role === 'clear-all') {
          // обнуление корзины при её полной очистке
          newCart = []
        } else {
          // удалять один элемент посредствой фильтрации корзины от выбранного
          newCart = authedUser.cart.filter(cartItem => cartItem.key !== item.key)
        }
        const newUserData = {
          _id: authedUser._id,
          newCart
        }
        // обновление пользователя
        updateUser(newUserData)
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      if (role === 'clear-all') {
        updLocalUserCart(item, role)
      } else {
        updLocalUserCart(item)
      }
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
