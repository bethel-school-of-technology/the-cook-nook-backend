'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: DataTypes.INTEGER,
    UserId: {
      primaryKey: true,
      type:DataTypes.INTEGER
    },
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    time: DataTypes.STRING,
    ing: DataTypes.STRING,
    toolsNeeded: DataTypes.STRING,
    instructs: DataTypes.STRING
  }, {});

  Recipe.associate = function(models) {
    // associations can be defined here
  };
  return Recipe;
};