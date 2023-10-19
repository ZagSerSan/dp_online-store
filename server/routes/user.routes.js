const express = require('express')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')
const router = express.Router({mergeParams: true})
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')

// было router.//!patch(...
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params    
    // console.log('userId :>> ', userId)
    // if (userId === req.user._id) {
    // console.log('req.body :>> ', req.body.password)
    //todo 
    if (req.body.password && req.body.password === req.body.passwordConfirm) {
      const hashedPassword = await bcrypt.hash(req.body.password, 12)
      const updatedUser = await User.findByIdAndUpdate(userId, {password: hashedPassword}, {new: true})
      res.send(updatedUser)
    } else {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
      res.send(updatedUser)
    }
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
// + "auth" middleware 
router.get('/', async (req, res) => {
  try {
    const list = await User.find() 
    res.send(list)
  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.',
      errors: errors.array()
    })
  }
})
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params    

    // if (userId === req.user._id) {
      const authedUser = await User.findById(userId)
      res.send(authedUser)
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


module.exports = router
