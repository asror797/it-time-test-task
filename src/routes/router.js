const { Router } = require('express')
const users = require('../controllers/users.controller')
const router = Router()



router
      .get('/users',users.GET)
      .post('/auth/registir',users.CREATE_USER)
      .delete('/auth/delete',users.DELETE)
      .post('/auth/change-password',users.PASSWORD_REFRESH)
      .put('/auth/login',users.LOGIN)
      .put('/auth/forgot',users.PASSWORD_RESET)
      .put('/auth/verify',users.CODE_CHECKER)

module.exports = router