const jwt = require('jsonwebtoken')

const tokenGenerate = email => {
   return jwt.sign(email,'secretkey')
}

const tokenVerify = hash => {
   return jwt.verify(hash,'secretkey')
}

module.exports = {
   tokenGenerate,
   tokenVerify
}