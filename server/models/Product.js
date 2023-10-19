const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  title: {type: String, required: true},
  price: {type: Number, required: true},
  rate: {type: Number},
  description: {type: String, required: true},
  modalOptionTypes: {type: Array, required: true},
  introSlider: {type: Object},
  preview: {type: String, required: true},
  slider_dots: {type: Array},
  slider: {type: Array, required: true},
}, {
  timestamps: true
})

module.exports = model('Product', schema)
