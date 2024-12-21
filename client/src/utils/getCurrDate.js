export const getCurrDate = (type) => {
  // если передан тип, напрмиер day, то выводить текущий день
  // если не передан, вывшзидить весть обьект текущей даты

  const currDate = new Date()

  const currDate_obj = {
    year: currDate.getFullYear(),
    month: currDate.getMonth() + 1,
    day: currDate.getDate(),
    hours: currDate.getHours(),
    minutes: currDate.getMinutes()
  }

  if (type) {
    return currDate_obj[type]
  } else {
    return currDate_obj
  }
}
