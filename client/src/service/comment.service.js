import httpService from './http.service'

const commentEndpoint = 'comment/'

const CommentService = {
  getComments: async (productId) => {
    const {data} = await httpService.get(commentEndpoint, {
      params: {
        orderBy: 'productId',
        equalTo: `${productId}`
      }
    })
    return data
  },
  createComment: async (payload) => {
    const {data} = await httpService.post(commentEndpoint, payload)
    return data
  },
  deleteComment: async (commentId) => {
    const {data} = await httpService.delete(commentEndpoint + commentId)
    return data
  }
}

export default CommentService
