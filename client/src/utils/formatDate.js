import moment from 'moment'

export const formatDate = (commentData, type) => {
  if (type === 'hours') {
    return moment(commentData).format('HH:mm')
  }
  if (type === 'year') {
    return moment(commentData).format('DD MMM YYYY')
  }
  if (type === 'year-adapt') {
    return moment(commentData).format('DD.MM.YYYY')
  }
  if (type === 'all-data-time') {
    return moment(commentData).format('DD.MM.YYYY HH:mm')
  }
}
