import httpService from './http.service'
import localStorageService from './localStorage.service'

const userEndpoint = 'user/'

const userService = {
  get: async () => {
    const {data} = await httpService.get(userEndpoint)
    return data
  },
  getCurrentUser: async () => {
    const {data} = await httpService.get(userEndpoint + localStorageService.getUserId())
    return data
  },
  updateUser: async (updUserData) => {
    const { data } = await httpService.put(userEndpoint + updUserData._id, updUserData)
    return data
  },
  deleteUser: async (userId) => {
    const {data} = await httpService.delete(userEndpoint + userId)
    return data
  }
}

export default userService
