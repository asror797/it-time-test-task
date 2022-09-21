const bcrypt = require("bcrypt")

const passwordHash = password => {
   return bcrypt.hashSync(password,'password');
}

const passwordVerify = (password ,hash) => {
   return bcrypt.compareSync(password,hash)
}

module.exports= {
   passwordHash,
   passwordVerify
}