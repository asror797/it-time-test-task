const { DataTypes } = require("sequelize")
const sequelize = require("./../config/sequelize")


const Users = sequelize.define('users',{
   id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4
   },
   fullname:{
      type:DataTypes.STRING,
      allowNull:false
   },
   username:{
      type:DataTypes.STRING(16),
      allowNull:false,
      unique:true
   },
   email:{
      type:DataTypes.STRING,
      allowNull:false
   },
   phonenumber:{
      type:DataTypes.STRING,
      allowNull:false
   },
   password:{
      type:DataTypes.STRING,
      allowNull:false
   },
   isVerified:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
   }
})

module.exports = Users