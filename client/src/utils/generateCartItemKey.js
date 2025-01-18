// Получения уникального ид (+ сортировка опций для надёжности)
export const generateCartItemKey = (productId, options) => {
  const sortedOptions = Object.keys(options)
    .sort()
    .reduce((acc, key) => {
      acc[key] = options[key]
      return acc
    }, {})

  return `${productId}_${JSON.stringify(sortedOptions)}`
}
