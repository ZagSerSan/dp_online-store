const express = require('express')
const chalk = require('chalk')
const Product = require('../models/Product')
const router = express.Router({mergeParams: true})
// const auth = require('../middleware/auth.middleware')

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

//* обновлениe продукта по рейтингу
router.put('/:productId', async (req, res) => {
  try {
    const { productId } = req.params    
    // console.log('req.body', req.body)
    // console.log('productId :>> ', productId)
    // console.log('req.params', req.params)

    // if (productId === req.product._id) {
      //todo
      const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})
      res.send(updatedProduct)
    // } else {
    //   res.status(401).json({
    //     message: 'На сервере проихошла ошибка, попробуйте позже.',
    //     errors: errors.array()
    //   })
    // }

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
