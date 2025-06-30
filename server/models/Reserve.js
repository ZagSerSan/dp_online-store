const { Schema, model } = require('mongoose')

const schema = new Schema({
  // productId: { type: String, required: true },
  _id: { type: String, required: true },
  userId: { type: String, required: false }, // если пользователь не авторизован, можно использовать sessionId
  sessionId: { type: String, required: false },
  options: {
    color: String,
    size: String
    // можно добавить другие опции позже
  },
  reserveKey: { type: String, required: true }, // например: "productId_{"color":"black","size":"3ml"}"
  count: { type: Number, required: true, min: 1 },
  expiresAt: { type: Date, required: true },
  orderId: { type: String, required: false },
}, {
  timestamps: { createdAt: 'reservedAt' } // аналог reservedAt
})

module.exports = model('Reserve', schema)
