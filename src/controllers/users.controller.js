const { tokenGenerate, tokenVerify } = require('../helpers/jwt')
const { passwordHash, passwordVerify } = require('../helpers/passwordhash')
const usersModel = require('../models/users.model')
const codeToken = require("generate-sms-verification-code")
const { passwordResetLink } = require('../helpers/nodemailer')
const Users = require('../models/users.model')


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

         res.json({
            status:200,
            "message":"Account created",
            "token":tokenGenerate(newUser.id)
         })

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
   
               const token = tokenGenerate(user.id)
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
         console.log(error)
         res.sendStatus(500)
      }
   },
   "PASSWORD_RESET":async(req,res) => {
      try {

         const { email } = req.body

         const user = await Users.findOne({
            where:{email:email}
         })


         if(user) {

            const status = passwordResetLink(email,codeToken(5,{type:'number'}))

            console.log(status)

            res.json({
               status:200,
               message:status
            })
         }else {
            res.json({
               status:200,
               message:"Bu email mavjud emas"
            })
         }

      } catch (error) {
         console.log(error)
         res.sendStatus(500)  
      }
   },
   "USERNAME_CHECKER":async(req,res) => {
      try {
         res.json("ok")
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}