const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    username: 'postgres',
    password: 'asrorbek797',
    port: 5432,
    database: 'ittime',
    host: '*******',
    dialect: 'postgres'
})

module.exports = sequelize
