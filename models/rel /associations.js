//Victoria is responsible for this file!

module.exports = function(models) {
    models.Users.belongsToMany(models.Recipe, 
        {through: models.Recipe.UserId, 
        foreignKey: 'UserId'
    });
    models.Recipe.hasOne(models.Users, {
        through: models.Users.UserId,
        foreignKey: 'UserId'
    })
    
}