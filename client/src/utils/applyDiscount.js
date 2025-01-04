export default function applyDiscount(productPrice, discount) {
  const currentTime = Date.now()

  // Проверяем, активна ли скидка
  if (!discount || currentTime > discount.endTime) {
    return productPrice // Скидка не применяется
  }

  // Обрабатываем разные типы скидок
  switch (discount.type) {
    case "percentage":
      return productPrice * (1 - discount.value / 100) // Снижение на % скидки

    case "fixed":
      return Math.max(0, productPrice - discount.value) // Фиксированная сумма скидки

    case "shipping":
      //? return productPrice // Стоимость товара не меняется, но логика доставки меняется
      // минус доставка: пока как фиксированная (-$15), но позже можно модифицировать
      return Math.max(0, productPrice - discount.value)

    default:
      return productPrice // Если тип не распознан, оставляем цену без изменений
  }
}
