export const formatSelectedDate = (dateObj) => {
  // разделители
  const dateSeparator = '-'
  const timeSeparator = ':'
  const betweenSeparator = 'T'
  // для конечного значения
  let dateString = ''

  for (let i = 0; i < Object.values(dateObj).length; i++) {
    // отдельное получение значения и добавление нуля есил одноцифровое число
    let value = String(Object.values(dateObj)[i])
    value = String(value).length < 2 ? "0" + value : value
    
    if (i < 2) {
      value += dateSeparator
    } else if (i === 2 ) {
      value += betweenSeparator
    } else {
      i === 4
      ? value
      : value += timeSeparator 
    }

    dateString += value
  }

  return Date.parse(dateString)
}
