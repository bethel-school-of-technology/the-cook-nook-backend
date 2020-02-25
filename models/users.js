const bcrypt = require('bcryptjs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    UserId: {
      primaryKey: true,
      autoincrement: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  
  Users.prototype.comparePassword = function (plainTextPassword) {
    let user = this; 
    return bcrypt.compareSync(plainTextPassword, user.password)
  };
  
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};