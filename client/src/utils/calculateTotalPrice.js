import applyDiscount from "./applyDiscount"

export const calculateTotalPrice = (products) => {
  let sum = 0
  for (let i = 0; i < products.length; i++) {
    sum += applyDiscount(products[i].price, products[i].discount) * products[i].count
  }
  return sum
}
