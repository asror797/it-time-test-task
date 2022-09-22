const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    username: 'postgres',
    password: 'asrorbek797',
    port: 5432,
    database: 'ittime',
    host: 'database-asror.c19rfkgwlhv1.us-east-1.rds.amazonaws.com',
    dialect: 'postgres'
})

module.exports = sequelize
