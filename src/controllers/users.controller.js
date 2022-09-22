const { tokenGenerate, tokenGenerateP, tokenVerifyP, tokenVerify } = require('../helpers/jwt')
const { passwordHash, passwordVerify } = require('../helpers/passwordhash')
const usersModel = require('../models/users.model')
const codeToken = require("generate-sms-verification-code")
const { passwordResetLink } = require('../helpers/nodemailer')
const Users = require('../models/users.model')
const Code = require('./../models/smscode.model')


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
            message:"Account created",
            token:tokenGenerate(newUser.id)
         })

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   DELETE:async(req,res) => {
      try {
        const { token ,  password } = req.body
         
         const userID = tokenVerify(token)
         const user = await usersModel.findOne({
            where:{id:userID}
         })

         if(user) {
            const isCorrect = passwordVerify(password , user.password)
            if(isCorrect) {
               const deletedUser = await usersModel.destroy({
                  where:{id:userID}
               })
   
   
               res.json({
                  status:200,
                  message:`deleted ${deletedUser}`
               })
            }else {
               res.send("Error")
            }

         }else {
            res.json({
               message:"Bu foydalanuvchi mavjud emas"
            })
         }


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
               message:"Bu email bilan ro'yxatdan o'tilmagan"
            })
         }

      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   PASSWORD_RESET:async(req,res) => {
      try {

         const { email } = req.body

         const user = await Users.findOne({
            where:{email:email}
         })


         if(user) {
            const generatedCode = codeToken(6,{type:'number'})
            const status = passwordResetLink(email,generatedCode)

            console.log(status)
            const {dataValues} = await Code.create({
               email:email,
               code:generatedCode
            })

            res.json({
               status:200,
               message:`${dataValues.email} emailga  tasdiqlash kodi yuborildi`
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
   PASSWORD_REFRESH:async(req,res) => {
      try {
         const { token , newPassword } = req.body

         const email = tokenVerifyP(token)

         if(email) {
            const user = await usersModel.update({
               password:passwordHash(newPassword)
            },
            {
               where:{
                  email:email
               }
            })

            const updatedUser = await usersModel.findOne({
               where:{email:email}
            })
   
            res.json({
               status:200,
               message:"password changed",
               token:tokenGenerate(updatedUser.id)
            })

         }else {
            res.json({
               status:200,
               message:"error occured"
            })
         }


      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   CODE_CHECKER:async(req,res) => {
      try {
         const { code, email } = req.body

         const verifiedCode = await Code.findOne({
            where:{
               email:email,
               code:code,
               isVerified:false
            }
         })

         if(verifiedCode) {
            const updateStatus = await Code.update({
               isVerified:true,
            },
            {
               where:{
                  email:email
               }
            })


            res.json({
               status:200,
               message:"Code verifyed",
               token:tokenGenerateP(email)
            })
         }else {
            res.json({
               status:200,
               message:"email hato"
            })
         }
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   },
   USERNAME_CHECKER:async(req,res) => {
      try {
         const { username } = req.body

         const isEmpty = await usersModel.findOne({
            where: {
               username:username
            }
         })


         console.log(isEmpty)

         if(isEmpty) {
            res.json({
               status:200,
               message:"bu foydalanuvchi mavjud"
            })
         }else {
            res.json({
               status:200,
               message:"bosh"
            })
         }
      } catch (error) {
         console.log(error)
         res.sendStatus(500)
      }
   }
}