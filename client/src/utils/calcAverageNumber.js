export const calcAverageNumber = (array) => {
  if (array) {
    let num = 0
    for (let i = 0; i < array.length; i++) {
      num = num + Number(array[i].rate) / array.length
    }
    return Number(num.toFixed())
  } else {
    return 0
  }
}
