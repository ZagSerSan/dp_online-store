const Product = require('../models/Product')
const Reserve = require('../models/Reserve')

const getAvailableStock = async (productId, options) => {
  const product = await Product.findById(productId)
  if (!product) return null

  const reserveKey = `${productId}_${JSON.stringify(options)}`

  const activeReserves = await Reserve.aggregate([
    {
      $match: {
        reserveKey,
        expiresAt: { $gt: new Date() }
      }
    },
    {
      $group: {
        _id: null,
        totalReserved: { $sum: '$count' }
      }
    }
  ])

  const reserved = activeReserves[0]?.totalReserved || 0
  return product.stock - reserved
}

module.exports = { getAvailableStock }
