const jwt = require('jsonwebtoken')

const tokenGenerate = email => {
   return jwt.sign(email,'secretkey')
}

const tokenVerify = hash => {
   return jwt.verify(hash,'secretkey')
}


const tokenGenerateP = id => {
   return jwt.sign(id,'secretkeyforcode')
}

const tokenVerifyP = hash => {
   return jwt.verify(hash,'secretkeyforcode')
}

module.exports = {
   tokenGenerate,
   tokenVerify,
   tokenGenerateP,
   tokenVerifyP
}