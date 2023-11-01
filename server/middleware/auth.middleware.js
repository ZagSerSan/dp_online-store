const TokenSevise = require('../services/token.service')

module.exports = (req, res, next) => {
  // проверка доступности сервера
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // валидация отсутствия токена в req.headers
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      console.log('token :>> ', token)
      res.status(401).json({message: 'auth.middleware -> !token: Unauthorized'})
    }
    // валидация токенов
    const data = TokenSevise.validateAccess(token)
    if (!data) {
      console.log('data :>> ', data)
      return res.status(401).json({message: 'auth.middleware -> !data: Unauthorized'})
    }

    req.user = data
    next()
  } catch (e) {
    res.status(401).json({message: 'Unauthorized'})
  }
}
