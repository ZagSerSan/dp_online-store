import { create } from 'zustand'
import CommentService from '../service/comment.service'

const commentStore = create((set) => ({
  commentsEntity: null,
  commentsIsLoaded: false,

  setCommentsIsLoaded: (param) => set((state) => ({ commentsIsLoaded: param })),
  loadCommentsList: async (productId) => {
    const { content } = await CommentService.getComments(productId)
    set((state) => ({ commentsEntity: content}))
    set((state) => ({ commentsIsLoaded: true }))
  },
  addComment: async (commentData) => {
    const { content } = await CommentService.createComment(commentData)
    set((state) => ({ commentsEntity: [...state.commentsEntity, content] }))
    set((state) => ({ commentsIsLoaded: false }))
  },
  deleteComment: async (commentId) => {
    const { content } = await CommentService.deleteComment(commentId)
    set((state) => {
      const newState = state.commentsEntity.filter(comment => comment._id !== commentId)
      return { commentsEntity: newState }
    })
    set((state) => ({ commentsIsLoaded: false }))
  },
}))

export default commentStore
