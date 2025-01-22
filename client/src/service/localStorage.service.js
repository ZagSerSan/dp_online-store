const ID_TOKEN = 'idToken'
const REFRESH_TOKEN = 'refreshToken'
const EXPIRES_IN = 'expiresIn'
const LOCAL_ID = 'localId'

export function setTokens({userId, accessToken, refreshToken, expiresIn = 3600}) {
  const expiresDate = new Date().getTime() + (expiresIn * 1000)
  localStorage.setItem(ID_TOKEN, accessToken)
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
  localStorage.setItem(EXPIRES_IN, expiresDate)
  localStorage.setItem(LOCAL_ID, userId)
}
export function getAccessToken() {
  return localStorage.getItem(ID_TOKEN)
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN)
}
export function getTokenExpirensData() {
  return localStorage.getItem(EXPIRES_IN)
}
export function getUserId() {
  return localStorage.getItem(LOCAL_ID)
}
export function removeAuthData() {
  localStorage.removeItem(ID_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(EXPIRES_IN)
  localStorage.removeItem(LOCAL_ID)
}

export function setLocalUser() {
  let localUser = {
    cart: [],
    bookmarks: []
  }

  let cartContain = Boolean(localStorage.getItem('cart'))
  let bookmarksContain = Boolean(localStorage.getItem('bookmarks'))

  if (cartContain) {
    localUser.cart = JSON.parse(localStorage.getItem('cart'))
  } else {
    localStorage.setItem('cart', JSON.stringify([]))
  }

  if (bookmarksContain) {
    localUser.bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  } else {
    localStorage.setItem('bookmarks', JSON.stringify([]))
  }

  return localUser
}
export function removeLocalUser() {
  localStorage.removeItem('cart')
  localStorage.removeItem('bookmarks')
}

// обновить корзину на новую
export function setCart(newLocalCart) {
  if (newLocalCart) {
    localStorage.setItem('cart', JSON.stringify(newLocalCart))
    // для стейта localUser
    return newLocalCart
  }
}

// export function setCart(newCartItem, role) {
//   // есть ли сущность 'cart' в localStore
//   let isContain = Boolean(localStorage.getItem('cart'))
//   let cart = []

//   // если есть сущность cart в localStore
//   if (isContain) {
//     cart = JSON.parse(localStorage.getItem('cart'))

//     // добавляем или удаляем
//     const updatedCart = cart.find(item=> item._id === newCartItem._id)
//       ? cart.filter(item => item._id !== newCartItem._id)
//       : [...cart, newCartItem]

//     // ложим обратно в localStore
//     localStorage.setItem('cart', JSON.stringify(updatedCart))
//     // возвращаем в стор новую корзину
//     return updatedCart
//   } else {
//     // если нету сущности cart в localStore
//     cart.push(newCartItem)
//     localStorage.setItem('cart', JSON.stringify(cart))
//     // для стейта localUser
//     return cart
//   }
// }

export function clearCart() {
  let isContain = Boolean(localStorage.getItem('cart'))
  const cart = []
  // если есть сущность cart в localStore
  if (isContain) {
    localStorage.removeItem('cart')
    localStorage.setItem('cart', JSON.stringify(cart))
    return cart
  } else {
    // если нету сущности cart в localStore
    localStorage.setItem('cart', JSON.stringify(cart))
    return cart
  }
}
export function setBookmarks(id) {
  let isContain = Boolean(localStorage.getItem('bookmarks'))
  let bookmarks = []
  if (isContain) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    const updatedBookmarks = bookmarks.includes(id)
      ? bookmarks.filter(item => item !== id)
      : [...bookmarks, id]
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
    // для стейта localUser
    return updatedBookmarks
  } else {
    bookmarks.push(id)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    // для стейта localUser
    return bookmarks
  }
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpirensData,
  getUserId,
  removeAuthData,
  setBookmarks,
  setCart,
  clearCart,
  setLocalUser,
  removeLocalUser
}

export default localStorageService
