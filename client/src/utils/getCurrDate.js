export const getCurrDate = (typeOrTime) => {
  //* новая логика:

  const currDate = new Date()

  const currDate_obj = {
    year: currDate.getFullYear(),
    month: currDate.getMonth() + 1,
    day: currDate.getDate(),
    hour: currDate.getHours(),
    minute: currDate.getMinutes()
  }

  // если приходят ms как число (number), то из него сделать обьект даты
  if (typeof typeOrTime === 'number') {
    const futureDate = new Date(typeOrTime)
    return {
      day: futureDate.getDate(),
      month: futureDate.getMonth() + 1, // Месяцы в JavaScript начинаются с 0
      year: futureDate.getFullYear(),
      hour: futureDate.getHours(),
      minute: futureDate.getMinutes(),
    }
  // если приходит type как строка (string), то возвратить значение этого типа
  } else if (typeof typeOrTime === 'string') {
    return currDate_obj[typeOrTime]
  // во всех остальных возвр обьект текущей даты
  } else {
    return currDate_obj
  }
}
