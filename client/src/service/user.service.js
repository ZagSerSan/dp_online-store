import httpService from './http.service'
import localStorageService from './localStorage.service'
const userEndpoint = 'user/'

const userService = {
  // получение всех пользователей
  get: async () => {
    const { data } = await httpService.get(userEndpoint)
    return data
  },
  // получение текущего (авториз) пользователя
  getCurrentUser: async () => {
    const url = userEndpoint + localStorageService.getUserId()
    const { data } = await httpService.get(url)
    return data
  },
  // создание польз
  createUser: async (payload) => {
    const url = userEndpoint + 'createUser'
    const { data } = await httpService.post(url, payload)
    return data
  },
  // обновление
  updateUser: async (updUserData) => {
    const url = userEndpoint + updUserData._id
    const { data } = await httpService.put(url, updUserData)
    return data
  },
  // удаление
  deleteUser: async (userId) => {
    const { data } = await httpService.delete(userEndpoint + userId)
    return data
  }
}

export default userService
