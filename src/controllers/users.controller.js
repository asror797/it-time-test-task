const { tokenGenerate, tokenVerify } = require('../helpers/jwt')
const { passwordHash, passwordVerify } = require('../helpers/passwordhash')
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
         const {
            email,
            password
         } = req.body

         const user = await usersModel.findOne({
            where:{email:email}
         })

         if(user) {
            const isCorrect = passwordVerify(password,user.password)
            if(isCorrect) {
   
               const token = tokenGenerate(email)
               res.json({
                  status:200,
                  message:"You are logged",
                  token:token
               })
            }else {
               res.json({
                  status:200,
                  message:"wrong password"
               })
            }

         }else {
            res.json({
               status:200,
               message:"email doesn't exit"
            })
         }

      } catch (error) {
         console.log(user)
         res.sendStatus(500)
      }
   }
}