const express = require('express')
const app = express()
const router = require('./routes/router')
require('./models/users.model')
const sequelize = require('./config/sequelize')

app.use(express.json())
sequelize   
    .authenticate()
    .then(() => console.log('Connected'))
    .catch((err) => console.error(err))
sequelize.sync().then(() => console.log("OK"))


app.get('/',(req,res) => {
   res.send('ok')
})

app.use(router)
app.listen(9000,() => {
   console.log('Server is ready at 5000 port ')
})