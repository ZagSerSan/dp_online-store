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
      const { items } = req.body
      const userId = req.user?._id || 'guest'
  
      const created = await Promise.all(
        items.map(async (item) => {
          const reserveKey = `${item._id}_${JSON.stringify(item.options)}`
        
          const { _id, ...cleanItem } = item // удаляем _id
        
          return await Reserve.create({
            productId: _id,
            count: cleanItem.count,
            options: cleanItem.options,
            reserveKey,
            userId,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
          })
        })
      )
  
      res.status(201).json(created)
    } catch (e) {
      console.error('reserve error', e)
      res.status(500).json({ message: 'Ошибка при создании резервации' })
    }
  })

module.exports = router
