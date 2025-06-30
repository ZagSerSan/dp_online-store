const express = require('express')
const chalk = require('chalk')
const Reserve = require('../models/Reserve')
const Product = require('../models/Product')
const auth = require('../middleware/auth.middleware')

const router = express.Router({ mergeParams: true })

// /api/reserve
router
  .route('/')
  .post(auth, async (req, res) => {
    try {
      const { items } = req.body // [{ _id, count }]
      const userId = req.user?._id || 'guest'

      const now = new Date()
      const expiresAt = new Date(now.getTime() + 15 * 60 * 1000) // 15 минут
      const createdReserves = []

      for (const item of items) {
        const product = await Product.findById(item._id)
        console.log('item.key :>> ', item.key);

        if (!product) {
          return res.status(404).json({ message: `Товар не найден: ${item._id}` })
        }

        if (product.stock < item.count) {
          return res.status(400).json({ message: `Недостаточно товара: ${product.name}` })
        }

        const reserve = await Reserve.create({
          _id: item.key,
          // _id: item._id,
          // key: item.key,
          userId,
          count: item.count,
          expiresAt
        })

        createdReserves.push(reserve)
      }

      res.status(201).json({
        message: 'Резервы созданы',
        expiresAt,
        reserves: createdReserves
      })

    } catch (e) {
      console.log(chalk.red('reserve error'), e)
      res.status(500).json({
        message: 'На сервере произошла ошибка при резервировании',
      })
    }
  })

module.exports = router
