const express = require('express')
const Product = require('../models/Product')
const router = express.Router({mergeParams: true})

// /api/product
router.get('/', async (req, res) => {
  try {
    const list = await Product.find()
    res.status(200).send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.'
    })
  }
})

module.exports = router
