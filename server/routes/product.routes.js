const express = require('express')
const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const Product = require('../models/Product')
const router = express.Router({mergeParams: true})
const { generateProductData, splitString } = require('../utils/helpers')

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

router.post('/createProductImages', async (req, res) => {
  try {
    const files = req.files
    const { productName, type, folderNum } = req.body

    const folderName = splitString(productName, ' ', '_')
    let path = `./static/images/products/${type}/${folderName}`
    await fs.mkdir(path)

    Object.values(files).forEach(file => {
      let dir = `./static/images/products/${type}/${folderName}/${file.name}`
      fs.writeFile(dir, file.data)
    })

    res.status(201).send(null)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.',
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

    await fs.rmdir(removedProduct.filesPath,
      { recursive:true }, 
      (err) => { 
        console.error(err); 
      }
    )
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
