import httpService from './http.service'
const reserveEndpoint = 'reserve/'

const ReserveService = {
  createReserve: async (items) => {
    // items: [{ productId, count, options }]
    const { data } = await httpService.post(reserveEndpoint, { items })
    return data
  }
}

export default ReserveService
