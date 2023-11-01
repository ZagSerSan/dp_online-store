import httpService from './http.service'
import localStorageService from './localStorage.service'

const userEndpoint = 'user/'

const userService = {
  get: async () => {
    const {data} = await httpService.get(userEndpoint)
    return data
  },
  getCurrentUser: async () => {
    const url = userEndpoint + localStorageService.getUserId()
    const accessToken = `Bearer ${localStorageService.getAccessToken()}`
    const {data} = await httpService.get(url,
      {
        headers: {
        "Authorization": accessToken
      }
    })
    return data
  },
  createUser: async (payload, role = 'register') => {
    try {
      const url = 'signUp'
      const { data } = await httpAuth.post(url, payload)
      if (role === 'register') {
        localStorageService.setTokens(data)
      }
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
  // : async (newUserData) => {
  //   const url = ''
  //   const accessToken = `Bearer ${localStorageService.getAccessToken()}`
  //   const { data } = await httpService.post(
  //     productEndpoint + url,
  //     newUserData,
  //     {headers: {"Authorization": accessToken}}
  //   )
  //   return data
  // },
  updateUser: async (updUserData) => {
    const accessToken = `Bearer ${localStorageService.getAccessToken()}`
    const { data } = await httpService.put(
      userEndpoint + updUserData._id,
      updUserData,
      {headers: {"Authorization": accessToken}}
    )
    return data
  },
  deleteUser: async (userId) => {
    const accessToken = `Bearer ${localStorageService.getAccessToken()}`
    const {data} = await httpService.delete(
      userEndpoint + userId,
      {headers: {"Authorization": accessToken}}
    )
    return data
  }
}

export default userService
