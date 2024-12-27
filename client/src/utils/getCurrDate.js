export const getCurrDate = (typeOrTime) => {
  //? если передан тип, напрмиер day, то выводить текущий день
  //? если не передан, вывшзидить весть обьект текущей даты

  const currDate = new Date()

  const currDate_obj = {
    year: currDate.getFullYear(),
    month: currDate.getMonth() + 1,
    day: currDate.getDate(),
    hour: currDate.getHours(),
    minute: currDate.getMinutes()
  }

  //* новая логика:
  // если приходят ms уже установ времени как число (number), то из него сделать обьект даты
  // если приходит type как строка (string), то возвратить значение этого типа
  // во всех остальных возвр обьект текущей даты
  if (typeof typeOrTime === 'number') {
    const futureDate = new Date(typeOrTime)

    return {
      day: futureDate.getDate(),
      month: futureDate.getMonth() + 1, // Месяцы в JavaScript начинаются с 0
      year: futureDate.getFullYear(),
      hour: futureDate.getHours(),
      minute: futureDate.getMinutes(),
    }
    // return 'endTime'
  } else if (typeof typeOrTime === 'string') {
    return currDate_obj[typeOrTime]
  } 

  // if (type) {
  //   return currDate_obj[type]
  // } else {
  //   return currDate_obj
  // }
}
