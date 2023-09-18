const express = require('express')
const auth = require('../middleware/auth.middleware')
const chalk = require('chalk')
const Comment = require('../models/Comment')
const router = express.Router({mergeParams: true})

// /api/comment
router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const {orderBy, equalTo} = req.query
      const list = await Comment.find({ [orderBy]: equalTo })  
      res.send(list)
    } catch (e) {
      console.log(chalk.red('error'), e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
        errors: errors.array()
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id
      })
      res.status(201).send(newComment)
    } catch (e) {
      console.log(chalk.red('error'), e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
        // errors: errors.array()
      })
    }
  })

router.delete('/:commentId', auth, async (req, res) => {
  try {
    const { commentId } = req.params
    const removedComment = await Comment.findById(commentId)

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.deleteOne()
      return res.send(null)
    } else {
      return res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.'
      // errors: errors.array()
    })
  }
})

module.exports = router
