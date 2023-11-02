const express = require('express')
const auth = require('../middleware/auth.middleware')
const chalk = require('chalk')
const Comment = require('../models/Comment')
const User = require('../models/User')
const router = express.Router({mergeParams: true})

// /api/comment
router
  .route('/')
  .get(async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query
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
  .post(async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body
      })
      res.status(201).send(newComment)
    } catch (e) {
      console.log(chalk.red('error'), e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
      })
    }
  })

router.delete('/:commentId', auth, async (req, res) => {
  try {
    const { commentId } = req.params
    const removedComment = await Comment.findById(commentId)
    const authedUser = await User.findById(req.user._id)

    if (removedComment.userId.toString() === req.user._id || authedUser.admin) {
      await removedComment.deleteOne()
      return res.send(null)
    } else {
      return res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.'
    })
  }
})

module.exports = router
