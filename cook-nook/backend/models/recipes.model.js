const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const recipeSchema = new Schema({
    username: {
        type: String, 
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    timeToMake: Number, 
    ingredients: String, 
    instructions: String //I'm not sure if this is correct. I'm still researching the view items, step-by-step feature
});

const Recipe = mongoose.model('Recipe', recipeSchema); 

module.exports = Recipe;