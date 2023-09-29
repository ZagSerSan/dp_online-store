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

//* больше нету обновления продукта по избранным
// router.put('/:productId', async (req, res) => {
//   try {
//     const { productId } = req.params    
//     console.log('req.body', req.body)

//     // if (productId === req.product._id) {
//       const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})
//       res.send(updatedProduct)
//     // } else {
//     //   res.status(401).json({
//     //     message: 'На сервере проихошла ошибка, попробуйте позже.',
//     //     errors: errors.array()
//     //   })
//     // }

//   } catch (e) {
//     console.log(chalk.red('error'), e)
//     res.status(401).json({message: 'Unauthorized'})
//   }
// })

module.exports = router
