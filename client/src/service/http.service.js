import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'

// "apiEndPoint": "http://localhost:8080/api/"
const http = axios.create({
  baseURL: configFile.apiEndPoint
})

// перехват запроса
http.interceptors.request.use(
  async function (config) {
    const expiresData = localStorageService.getTokenExpirensData()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresData < Date.now()
    
    if (isExpired) {
      const data = await authService.refresh()
      localStorageService.setTokens(data)
    }
    const accessToken = localStorageService.getAccessToken()
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)

// перехват ответа сервера
http.interceptors.response.use(
  (res) => {
    res.data = { content: res.data }
    return res
  },
  function (error) {
    // условие для отлавливания ожидаемой ошибки, со стороны клиента
    const expectedErrors = 
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    // условие для отлавливания не ожидаемой ошибки
    // если ошибка не от клиента (нет подключения к серверу или он упал)
    if (!expectedErrors) {
      console.log('error :>> ', error)
      toast.error(error.message + '. http.service: 68')
    }
    return Promise.reject(error)
  }
)

// ------------------------

const httpService = {
  get: http.get,
  post: http.post,
  patch: http.patch,
  put: http.put,
  delete: http.delete
}

export default httpService
