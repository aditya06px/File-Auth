const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require('../config/db');

class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  isSeller : {
    type: DataTypes.BOOLEAN
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

module.exports = User;