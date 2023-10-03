const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  title: {type: String, required: true},
  price: {type: Number, required: true},
  rate: {type: Number, required: true},
  description: {type: String, required: true},
  introSlider: {type: Object, required: false},
  preview: {type: String, required: true},
  slider_dots: {type: Array, required: true},
  slider: {type: Array, required: true},
}, {
  timestamps: true
})

module.exports = model('Product', schema)
