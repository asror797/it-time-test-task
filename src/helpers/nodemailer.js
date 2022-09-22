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
 

 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email sent: ' + info.response);
   }
 });



const passwordResetLink = (email,code) => {

   const mailOptions = {
      from:'asror.shahobiddinov7@gmail.com',
      to:email,
      subject:'Password reset code',
      text:`Your code for password reset <strong> ${code}</strong>`
   }
   transporter.sendMail(mailOptions , (error, info) => {
      if(error) {
         console.log(error)
      }else {
         console.log(info)
         return "ok"
      }
   })
} 

module.exports = {
   passwordResetLink
}