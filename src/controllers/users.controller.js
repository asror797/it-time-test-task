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
         const { fullname , username , age , phonenumber , email , password } = req.body
         
      } catch (error) {
         
      }
   }
}