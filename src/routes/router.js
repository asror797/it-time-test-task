const { Router } = require('express')
const users = require('../controllers/users.controller')
const router = Router()



router
      .get('/users',users.GET)
      .post('/auth/registir',users.CREATE_USER)
      .put('/auth/login',users.LOGIN)
      .put('/auth/forgot',users.PASSWORD_RESET)

module.exports = router