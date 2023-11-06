const express = require('express')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')
const router = express.Router({mergeParams: true})
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const TokenService = require('../services/token.service')
const { check, validationResult } = require('express-validator')
const { generateUserData } = require('../utils/helpers')

// получение всех пользователей 
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
// получение текущего пользователя
router.get('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params    

    if (userId === req.user._id) {
      const authedUser = await User.findById(userId)
      res.send(authedUser)
    } else {
      res.status(401).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
        errors: errors.array()
      })
    }

  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(401).json({message: 'Unauthorized'})
  }
})
// создание пользователя 
router.post('/createUser', [
  // правила валидации
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 8 символов').isLength(8),
  auth,
  async (req, res) => {
    const authedUser = await User.findById(req.user._id)
    // проверка, является ли данный пользователь админом
    if (authedUser.admin) {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({
            error: {
              message: 'INVALID_DATA',
              code: 400,
              errors: errors.array()
            }
          })
        }
        // проверка наличия такого юсера в базе
        const { email, password } = req.body
        const existUser = await User.findOne({ email })
        if (existUser) {
          return res.status(400).json({
            error: {
              message: 'EMAIL_EXISTS',
              code: 400
            }
          })
        }
        // шифровка пароля для нового юсера
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
          ...generateUserData(),
          ...req.body,
          password: hashedPassword
        })
        // получение токенов для отправки клиенту
        const tokens = TokenService.generate({ _id: newUser._id })
        // обновляем токены в базе данных
        await TokenService.save(newUser._id, tokens.refreshToken)
        // send responce to client
        res.status(201).send({...tokens, userId: newUser._id})
      } catch (e) {
        console.log(e)
        res.status(500).json({
          message: 'На сервере проихошла ошибка, попробуйте позже.',
        })
      }
    // если не является админом:
    } else {
      res.status(401).json({
        message: 'Отказано в доступе.',
      })
    }
  }
])
// обновление пользователя
router.put('/:userId', auth, async (req, res) => {
  const { userId } = req.params
  const authedUser = await User.findById(req.user._id)
  // проверка, является ли данный пользователь админом
  if (authedUser?.admin  || userId === req.user._id) {
    try {
      const { userId } = req.params    
      if (req.body.password && req.body.password === req.body.passwordConfirm) {
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        const updatedUser = await User.findByIdAndUpdate(userId, {password: hashedPassword}, {new: true})
        res.send(updatedUser)
      } else {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
        res.send(updatedUser)
      }
    } catch (e) {
      console.log(chalk.red('error'), e)
      res.status(401).json({message: "It's server error, try again.."})
    }
  // если не является админом:
  } else {
    res.status(401).json({
      message: 'Отказано в доступе.',
    })
  }
})
// удаление пользователя
router.delete('/:userId', auth, async (req, res) => {
  const { userId } = req.params
  const authedUser = await User.findById(req.user._id)
  // проверка, является ли данный пользователь админом
  if (authedUser?.admin || userId === req.user._id) {
    try {
      const removedUser = await User.findById(userId)

      await removedUser.deleteOne()
      await TokenService.delete(removedUser._id)

      return res.send(null)
    } catch (e) {
      console.log(chalk.red('error'), e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.'
      })
    }
  // если не является админом:
  } else {
    res.status(401).json({
      message: 'Отказано в доступе.',
    })
  }
})

module.exports = router
