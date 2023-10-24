import moment from 'moment'

export const formatDate = (commentData, type) => {
  if (type === 'hours') {
    return moment(commentData).format('HH:mm')
  }
  if (type === 'year') {
    return moment(commentData).format('DD MMM YYYY')
  } 
}
