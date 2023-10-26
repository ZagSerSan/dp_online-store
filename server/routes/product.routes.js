const express = require('express')
const chalk = require('chalk')
const Product = require('../models/Product')
const { generateProductData } = require('../utils/helpers')
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

router.post('/createProduct', async (req, res) => {
  try {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     error: {
    //       message: 'INVALID_DATA',
    //       code: 400,
    //       errors: errors.array()
    //     }
    //   })
    // }

    const newProduct = await Product.create({
      ...generateProductData(req.body),
    })

    res.status(201).send(newProduct)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.',
    })
  }
})

//* обновлениe продукта по рейтингу
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params    
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})
    
    res.send(updatedProduct)
  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(401).json({message: 'Unauthorized'})
  }
})

router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params
    const removedProduct = await Product.findById(productId)
    await removedProduct.deleteOne()

    return res.send(null)
  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.'
    })
  }
})

module.exports = router
