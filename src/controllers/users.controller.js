const { passwordHash } = require('../helpers/passwordhash')
const usersModel = require('../models/users.model')


module.exports = {
   GET:async(req,res) => {
      try {
         const users = await usersModel.findAll()
         res.send(users)
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   CREATE_USER:async(req,res) => {
      try {
         const { 
                  fullname,
                  username,
                  age,
                  phonenumber, 
                  email, 
                  password 
               } = req.body

         const hashedPassword = passwordHash(password)

         const newUser = await usersModel.create({
            fullname:fullname,
            username:username,
            age:age,
            phonenumber:phonenumber,
            email:email,
            password:hashedPassword
         })

         res.json(newUser)

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   LOGIN:async(req,res) => {
      try {
         
      } catch (error) {
         
      }
   }
}