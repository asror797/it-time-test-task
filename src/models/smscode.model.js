const { DataTypes } = require("sequelize")
const sequelize = require("./../config/sequelize")


const Code = sequelize.define('code',{
   id:{
      type:DataTypes.UUID,
      primaryKey:true,
      defaultValue: DataTypes.UUIDV4
   },
   email:{
      type:DataTypes.STRING,
      allowNull:false
   },
   code:{
      type:DataTypes.INTEGER,
      allowNull:false
   },
   isVerified:{
      type:DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull:false
   }
})

module.exports = Code