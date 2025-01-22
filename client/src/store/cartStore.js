import { create } from 'zustand'
import { cartAnimation } from '../utils/cartAnimation'
import { generateCartItemKey } from '../utils/generateCartItemKey'

// начальное состояние продукта для корзины
const initialCartItemData = {
  key: '',
  count: 1,
  options: {}
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
          options: {
            ...state.cartItemData.options,
            [data.type]: data.value
          }
        }
      }
    }
    else if (role === 'setInitialOption') {
      const filteredOption = data.filter(option => option.selected === true)
      return {
        cartItemData: {
          // ...state.cartItemData,
          ...initialCartItemData,
          options: {
            ...state.cartItemData.options,
            [filteredOption[0].type]: filteredOption[0].value 
          }
        }
      }
    } 
    return { cartItemDataWasChanged: false }
  }),
  // добавить в корзину
  addToCart:  (e, authedUser, localUser, updateUser, updLocalUserCart, item, isInCart ) => set(async (state) => {
    e.stopPropagation()
    // cartAnimation(e.target, isInCart)

    // для выбранных по умолчанию опций
    let selectedOptions = {}

    // if default options is was not changed
    if (!state.cartItemDataWasChanged) {
      console.log('if')
      
      // установить опции продукта по умолч при быстрой покупке из списка продуктов
      const itemOptions = item.modalOptionTypes
      // для выбранных по умолчанию опций

      itemOptions.forEach(optionItem => {
        const { options } = optionItem
        // получаем только "выбранные по умолчанию"
        const filteredOption = options.filter(item => item.selected === true)
        // обновляем обект выбранных
        selectedOptions = {
          ...selectedOptions,
          [filteredOption[0].type]: filteredOption[0].value
        }
      })
    }

    // console.log('selectedOptions :>> ', selectedOptions)
    // console.log('Changed', state.cartItemDataWasChanged)
    console.log('cartItemData', state.cartItemData)
    
    // сбрасывать оции в модальном окне (или )
    
    // create new cart item for send to server
    let newCartItemData = {
      ...state.cartItemData,
      options: Object.keys(selectedOptions).length === 0
        ? state.cartItemData.options
        : selectedOptions,
      // options: Object.keys(state.cartItemData.options).length === 0
      //   ? selectedOptions
      //   : state.cartItemData.options,
      // добавление уник key из выбранных опицй
      key: generateCartItemKey(
        item._id,
        Object.keys(selectedOptions).length === 0
          ? state.cartItemData.options
          : selectedOptions,
      ),
      _id: item._id
    }

    console.log('newCartItemData :>> ', newCartItemData)

    const newCartItemKey = newCartItemData.key

    const getUpdatedCart = (user, role) => {
      let newUserData
      let newCart
  
      // сравнение ключей нового с уже имеющимся в корзине
      const findedCartItem = user.cart.find(cartItem => cartItem.key === newCartItemKey)

      // если уник ключи совпадают
      if (findedCartItem && (findedCartItem.key === newCartItemKey)) {
        // если кол-во совпадает
        if (findedCartItem.count === state.cartItemData.count) {
          // ничего не делать
          newCart = user.cart
          // return
        } else {
          // отфильтровать корзину и изменить кол-во тек-го продукта (если key совпадают)
          newCart = user.cart.map((item) =>
            item.key === newCartItemKey ? { ...item, count: newCartItemData.count } : item
          )
        }
      } else {
        newCart = [...user.cart, newCartItemData]
      }

      newUserData = {
        ...user,
        cart: newCart
      }

      // todo менять деф (выбран по умолч) опции на странице из изменения после доб в корзину

      // set((state) => ({
      //   cartItemData: {
      //     ...state.cartItemData,
      //     count: 1,
      //     options: selectedOptions
      //     // options: Object.keys(selectedOptions).length === 0
      //     //   ? state.cartItemData.options
      //     //   : selectedOptions,
      //   }
      // }))

      if (role === 'authedUser') {
        return newUserData
      } else if (role === 'localUser') {
        return newCart
      }
    }

    // если авторизован и не авторизован (else)
    if (authedUser) {
      try {
        updateUser(getUpdatedCart(authedUser, 'authedUser'))
      } catch (e) {
        console.log('e :>> ', e)
      }
    } else {
      updLocalUserCart(getUpdatedCart(localUser, 'localUser'))

      //! отладка
      // Boolean(getUpdatedCart(localUser, 'localUser'))
      // ? updLocalUserCart(getUpdatedCart(localUser, 'localUser'))
      // : console.log(`${Boolean(getUpdatedCart(localUser, 'localUser'))}`)
    }

    set((state) => ({ cartItemDataWasChanged: false}))
    set((state) => ({ cartItemData: {...state.cartItemData, count: 1} }))
  }),
  // удалить из корзины
  removeFromCart: (e, item, authedUser, updateUser, updLocalUserCart, role = '') => set(async (state) => {
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
          cart: newCart
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
