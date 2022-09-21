const { Router } = require('express')
const users = require('../controllers/users.controller')
const router = Router()



router
      .get('/users',users.GET)

module.exports = router