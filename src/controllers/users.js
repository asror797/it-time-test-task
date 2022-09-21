


module.exports = {
   GET:async(req,res) => {
      try {
         console.log(req.url)
         res.send('ok')
      } catch (error) {
         console.log('ok')
      }
   }
}