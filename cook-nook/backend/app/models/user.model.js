const mongoose = require('mongoose'); 

const UserSchema = mongoose.Schema({
    userId: Number, 
    username: String, 
    password: String, 
    email: String, 
    Recipes: [{
        recipeId: Number, 
        title: String, 
        description: number, //determined by radio selection in front-end
        timeToMake: String,
        Ingredients: String, 
        toolsNeeded: String, 
        instructions: [{
            id: number, 
            name: String,
            content: String
        }]
    }]
})

module.exports = mongoose.model('User', UserSchema);
