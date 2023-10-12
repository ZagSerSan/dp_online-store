const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {type: String},
	email: {type: String, required: true, unique: true},
	password: {type: String},
	image: {type: String},
	// rate: Number,
	sex: {type: String, enum: ['male', 'female', 'other']},
	bookmarks: {type: Schema.Types.Array},
	cart: {type: Schema.Types.Array}
}, {
  timestamps: true
})

module.exports = model('User', schema)
