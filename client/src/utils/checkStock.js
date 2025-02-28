
export const checkStock = (productsEntity, type) => {
  let filteredProductsByType = productsEntity.filter(item => item.type === type)

  return Boolean(filteredProductsByType.length)
}
