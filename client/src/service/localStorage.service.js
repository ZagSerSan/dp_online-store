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

// todo
export function removeLocalUser() {
  localStorage.removeItem('cart')
  localStorage.removeItem('bookmarks')
}
export function setCart(id) {
  let isContain = Boolean(localStorage.getItem('cart'))
  let cart = []
  if (isContain) {
    cart = JSON.parse(localStorage.getItem('cart'))
    const updatedCart = cart.includes(id)
      ? cart.filter(item => item !== id)
      : [...cart, id]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    // для стейта localUser
    return updatedCart
  } else {
    cart.push(id)
    localStorage.setItem('cart', JSON.stringify(cart))
    // для стейта localUser
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
  removeLocalUser
}

export default localStorageService
