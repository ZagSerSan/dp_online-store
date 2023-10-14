const { Schema, model } = require('mongoose')

const schema = new Schema({
	// productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
	// userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	productId: {type: String, required: true},
	userId: {type: String, required: true},
  content: {type: String, required: true},
  name: {type: String},
  email: {type: String},
  rate: {type: String},
  // pageId - на чьей странице находится комментарий
  // userId - id того, кто оставил комментарий
}, {
  timestamps: {createdAt: 'created_at'}
})

module.exports = model('Comment', schema)
