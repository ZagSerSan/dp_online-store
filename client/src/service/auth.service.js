import axios from 'axios'
// import localStorageService from './localStorage.service'
// import userService from './users.service'
import config from '../config.json'
import localStorageService from './localStorage.service'

const httpAuth = axios.create({
  baseURL: config.apiEndPoint + 'auth/',
  // params: {
  //   key: process.env.REACT_APP_FIREBASE_KEY
  // }
})
// const userEndpoint = 'user/'

const authService = {
  register: async (payload, role = 'register') => {
    const url = 'signUp'
    const { data } = await httpAuth.post(url, payload)
    if (role === 'register') {
      localStorageService.setTokens(data)
    }
    return data
  },
  login: async ({ email, password }) => {
    // const url = 'accounts:signInWithPassword'
    const url = 'signInWithPassword'
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    })
    localStorageService.setTokens(data)
    return data
  },
  // refresh: async () => {
  //   const { data } = await httpAuth.post('token', {
  //     grant_type: 'refresh_token',
  //     refresh_token: localStorageService.getRefreshToken()
  //   })
  //   return data
  // },
}

export default authService
