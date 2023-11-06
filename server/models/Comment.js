const { Schema, model } = require('mongoose')

const schema = new Schema({
	productId: {type: String, required: true},
	userId: {type: String, required: true},
  content: {type: String, required: true},
  name: {type: String},
  email: {type: String},
  rate: {type: String},
}, {
  timestamps: {createdAt: 'created_at'}
})

module.exports = model('Comment', schema)
