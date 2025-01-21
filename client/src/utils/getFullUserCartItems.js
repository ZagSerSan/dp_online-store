// Сопоставляем данные из корзины с актуальными данными о продуктах
export const getFullUserCartItems = (productsEntity, cartItems) => {
  const updatedCart = cartItems.map(item => {
    const productData = productsEntity.find(product => product._id === item._id)
    return {
      ...item,
      ...productData // Обновляем информацию о продукте
    }
  })

  return updatedCart
}
