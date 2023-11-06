import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config.json'
import localStorageService from './localStorage.service'

const httpAuth = axios.create({
  baseURL: config.apiEndPoint + 'auth/'
})

const authService = {
  register: async (payload) => {
    try {
      const url = 'signUp'
      const { data } = await httpAuth.post(url, payload)
      localStorageService.removeLocalUser()
      localStorageService.setTokens(data)
      toast.success("User has been created!")
      return data
    } catch (error) {
      const errorType = error.response.data.error.message
      console.log('err', error)
      if (errorType === "EMAIL_EXISTS") {
        toast.error("Email exists!")
      } else {
        toast.error("User not created..")
      }
    }
  },
  login: async ({ email, password }) => {
    const url = 'signInWithPassword'
    const { data } = await httpAuth.post(url, {
      email,
      password,
      returnSecureToken: true
    })
    localStorageService.setTokens(data)
    return data
  },
  refresh: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: localStorageService.getRefreshToken()
    })
    return data
  }
}

export default authService
