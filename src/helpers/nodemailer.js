const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport");
// const { tokenGenerate } = require("./jwt");


var transporter = nodemailer.createTransport(smtpTransport({
   service: 'gmail',
   host: 'smtp.gmail.com',
   auth: {
     user: 'asror.shahobiddinov7@gmail.com',
     pass: 'bklrsobzrpjurosp'
   }
 }));
 

 



const passwordResetLink = (email,code) => {

   const mailOptions = {
      from:'asror.shahobiddinov7@gmail.com',
      to:email,
      subject:'Password reset code',
      html:`Your code for password reset <strong> ${code}</strong>`
   }

   let status = "ok"
   transporter.sendMail(mailOptions , (error, info) => {
      if(error) {
         status =  "error occured"
         return "error"
      }else {
         status =  "Code sent your email"

         console.log(info)
      }
   })

   return status;
} 

module.exports = {
   passwordResetLink
}