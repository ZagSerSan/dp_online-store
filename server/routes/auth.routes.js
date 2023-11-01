const express = require('express')
const router = express.Router({mergeParams: true})
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const User = require('../models/User')
const TokenService = require('../services/token.service')
// const auth = require('../middleware/auth.middleware')
const { check, validationResult } = require('express-validator')
const { generateUserData } = require('../utils/helpers')

router.post('/signUp', [
  // правила валидации
  check('email', 'Некорректный email').isEmail(),
  check('password', 'Минимальная длина пароля 8 символов').isLength(8),
  async (req, res) => {
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
  }
])

router.post('/signInWithPassword', [
  check('email', 'Email некорректный').normalizeEmail().isEmail(),
  check('password', 'Пароль отсутствует').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req) // 1
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array()
          }
        })
      }
      // проверка наличия пользователя в бд
      const { email, password } = req.body
      const existUser = await User.findOne({ email }) // 2
      if (!existUser) {
        return res.status(400).send({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400
          }
        })
      }
      // сравнение введённого пароля и его пароля в базе
      const isPasswordEqual = await bcrypt.compare(password, existUser.password)
      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400
          }
        })
      }
      // получение токенов для отправки клиенту
      const tokens = TokenService.generate({ _id: existUser._id })
      // обновляем токены в базе данных
      await TokenService.save(existUser._id, tokens.refreshToken)
      // send responce to client
      res.status(200).send({ ...tokens, userId: existUser._id })
    } catch (e) {
      console.log(e)
      res.status(500).json({
        message: 'На сервере проихошла ошибка, попробуйте позже.',
        errors: errors.array()
      })
    }
  }
])

// функция проверки наличия и совпадения токенов
function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString()
}

// обновление refresh tokens
router.post('/token', async (req, res) => {
  try {
    // получаем токен из request`a и пользователя из bd по этому токену
    const { refresh_token: refreshToken } = req.body
    const data = TokenService.validateRefresh(refreshToken)
    // получаем токен из базы
    const dbToken = await TokenService.findToken(refreshToken)
    // сравниваем токены юсера
    if (isTokenInvalid(data, dbToken)) {
      res.status(401).json({message: 'Unauthorized'})
    }
    // получение токенов для отправки клиенту
    const tokens = await TokenService.generate({ _id: data._id })
    // обновляем токены в базе данных
    await TokenService.save(data._id, tokens.refreshToken)

    res.status(200).send({ ...tokens, userId: data._id })
  } catch (e) {
    console.log(chalk.red('error'), e)
    res.status(500).json({
      message: 'На сервере проихошла ошибка, попробуйте позже.',
      // errors: errors.array()
    })
  }
})

module.exports = router
