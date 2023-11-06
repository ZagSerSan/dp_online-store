import { calcAverageNumber } from "./calcAverageNumber"

export const getAverageRatingObj = (commentsEntity, commentId, newComment) => {
  const newArray = []
  commentsEntity.forEach(comment => {
    newArray.push({ rate: comment.rate })
  })
  if (newComment) {
    newArray.push({ rate: newComment.rate })
  }

  return {
    _id: commentId,
    rate: calcAverageNumber(newArray)
  }
}
