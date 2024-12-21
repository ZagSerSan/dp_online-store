export const arrayFromNum = (num, nowDateValue) => {
  // вторым параметром (nowDateValue) принимается значение текущей даты для фильтрации
  let array = []

  for (let i = nowDateValue; i < num + 1; i++) {
    array.push(String(i))
  }
  return array
}
